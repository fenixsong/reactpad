import * as React from 'react';
import MHandler from './MHandler';
import {rhythmInit} from './Utils/rhythm';

export default class MCore extends React.Component<any, any> {
    constructor( props: object ) {
        super(props);
        this.state = {
                       midiInit: this.props.midiSet,
                       midiAccess: this.props.defaultMidiAccess,
                       inputs: null,
                       outputs: null,
                       outUSB: null,
                       outMIDI: null,
                     };
        this.handleInputSetup = this.handleInputSetup.bind(this);
        this.handleOutputSetup = this.handleOutputSetup.bind(this);
    }

    componentDidMount() {
      const req = 'requestMIDIAccess';

      if (navigator[req]) {
          navigator[req]({
              sysex: true // this defaults to 'false' and we won't be covering sysex in this article.
          }).then(
                this.onMIDISuccess.bind(this),
                this.onMIDIFailure.bind(this)
          );
      } else {
          alert('No MIDI support in your browser.');
      }
    }

    // midi functions
    public onMIDISuccess(midiAccess: any) {
        // when we get a succesful response, run this code
        console.log('MIDI Access Object', midiAccess);
        this.setState({midiInit: "MidiSuccess",
                        midiAccess: midiAccess});
        //rhythmInit(this.state.outputs);
        //let midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status
    }

    public onMIDIFailure(e: string) {
        // when we get a failed response, run this code
        console.log("No access to MIDI devices or no browser support for WebMIDI API. Please use WebMIDIAPIShim " + e);
        this.setState({midiInit: "MidiFailure"});
    }

    public handleInputSetup(ins: any): void {
      this.setState({inputs: ins});
      console.log("checking state after inputs: ", this.state.inputs);
    }

    public handleOutputSetup(outs: any): void {
      let outUSB = null;
      let outMIDI = null;
      outs.forEach( function(output: any, v: any) {
        // this is the USB controlled: output.name = "Launchpad Pro Standalone Port"
        //  this is the MIDI DIN out:  output.name = "Launchpad Pro MIDI Port"
        if (output.name === "Launchpad Pro Standalone Port") {
          outUSB = output;
        } else if (output.name === "Launchpad Pro MIDI Port") {
          outMIDI = output;
        }
      });

      this.setState({outputs: outs, outUSB: outUSB, outMIDI: outMIDI});
      console.log("checking state after outputs: ", this.state.outputs);
    }

    public render() {
        return (
          <div>
            <MHandler
                 midi={this.state.midiInit}
                 midiAccess={this.state.midiAccess}
                 inputs={this.state.inputs}
                 outputs={this.state.outputs}
                 outUSB={this.state.outUSB}
                 outMIDI={this.state.outMIDI}
                 handleInput={this.handleInputSetup}
                 handleOutput={this.handleOutputSetup}
            />
          </div>
        );
    }
}
