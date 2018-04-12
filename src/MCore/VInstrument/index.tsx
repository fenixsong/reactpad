import * as React from 'react';

export default class VInstrument extends React.Component<any, any> {
    public render() {
        return (
            <div>
                vInstrument samples<br/>
                <button className="tapButton" onClick={this.props.selectVInstrument} value="default">Stack</button>
                <button className="tapButton" onClick={this.props.selectVInstrument} value="Funk">Layers</button>
            </div>
        );
    }
}
