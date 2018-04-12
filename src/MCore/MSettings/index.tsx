/// <reference path="../../interfaces.d.ts" />
import * as React from 'react';
import './index.css';

export default class MSettings extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { isOpen: false,
                       isOpenInfo: false,
                       minBpm: this.props.minBpm,
                       maxBpm: this.props.maxBpm,
                     };
        this.toggleOpen = this.toggleOpen.bind(this);
        this.toggleInfo = this.toggleInfo.bind(this);
    }

    public toggleOpen(e: any) {
      e.preventDefault();
      this.setState({isOpen: !this.state.isOpen, isOpenInfo: false});
    }
    public toggleInfo(e: any) {
      e.preventDefault();
      this.setState({isOpenInfo: !this.state.isOpenInfo, isOpen: false});
    }

    public render() {
        return (
            <div>
                &nbsp;&nbsp;&nbsp;<button onClick={this.toggleOpen}>Settings</button>&nbsp;
                <button onClick={this.toggleInfo}>Info</button>
                {this.state.isOpen &&
                  <div className="msettings-overlay"><button onClick={this.toggleOpen}>X</button>
                    <br/><br/>SETTINGS Screen
                    <br/><br/>
                    Min BPM:
                    <input
                        type="number"
                        value={this.props.minBpm}
                        onChange={e => this.props.handleMinBpm(e)}
                    />
                    <br/><br/>
                    Max BPM:
                    <input
                        type="number"
                        value={this.props.maxBpm}
                        onChange={e => this.props.handleMaxBpm(e)}
                    />
                  </div>
                }
                {this.state.isOpenInfo &&
                  <div className="msettings-overlay"><button onClick={this.toggleInfo}>X</button>
                    <h3>Info Screen</h3>
                    <p>Please Note: No custom firmware needed! Use Factory provided firmware. :)<br/>
                    Just hold <em>Setup</em> and the Orange button on top row = Programmer Mode</p>
                    <p>This demo's best with a multi-timbral synth with midi channels 1 thru 8 set to
                    melodic instruments or percussion. Sky is the limit!</p>
                    <p>The TAP tempo is an innovative approach: A 1 click Tap Tempo! Hold down to start,
                    release to define a quarternote. A quicker workflow!</p>
                    <p>On launchpad, set midi channel to 15 (or anything above 8) for better results.
                    Otherwise midi channel 1 will get garbage notes from the default firmware<br/>
                    Hold <em>Setup</em> and hit one of the BOTTOM RIGHT Blue Buttons</p>
                  </div>
                }
            </div>
        );
    }
}
