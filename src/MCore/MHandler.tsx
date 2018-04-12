/// <reference path="../interfaces.d.ts" />
import * as React from 'react';
import Tap from './Tap';
import MSettings from './MSettings';
import VInstrument from './VInstrument';
import {midiNoteOn, midiNoteOff, midiCC} from './Utils/music';
import {vInstrumentHandler, vInstrumentDraw} from './VInstrument/vInstrumentTools';

export default class MHandler extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {minBpm: 30,
                      maxBpm: 200,
                      outputs: this.props.outputs,
                      vInstrument: "default",
                    };
        this.handleMinBpm = this.handleMinBpm.bind(this);
        this.handleMaxBpm = this.handleMaxBpm.bind(this);
        this.midiInputEvent = this.midiInputEvent.bind(this);
        this.selectVInstrument = this.selectVInstrument.bind(this);
    }

    componentDidUpdate(prevProps: any, prevState: any) {
      if ( this.props.midi === "MidiSuccess" && prevProps.midi === "Uninitialized" ) {
        console.log("Went from Uninitialized to MidiSuccess");

        let outputs = this.props.midiAccess.outputs;
        console.log("Number of outputs: ", outputs.size);
        outputs.forEach( function ( port: any, key: any ) {
            console.log("Port: ", port, " Key ", key );
        });
        this.setState({outputs: outputs});
        this.props.handleOutput(outputs);

        let inputs = this.props.midiAccess.inputs.values();
        // loop over all available inputs and listen for any MIDI input
        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            // each time there is a midi message call the onMIDIMessage function

            //input.value.onmidimessage = onMIDIMessage;
            let thisMidi = this.props.outMIDI;
            input.value.onmidimessage = this.midiInputEvent;
        }
        this.props.handleInput(inputs);

        //turn channel 1 volume to 0 for now.
      }
    }

    public midiInputEvent(event: any): void {
        let data = event.data,
         cmd = data[0] >> 4,
         channel = data[0] & 0xf,
         type = data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
         note = data[1],
         velocity = data[2];

        let output = this.props.outMIDI;
        vInstrumentHandler(this.state.vInstrument, output, channel, type, note, velocity);
         // !!! Warning! vInstrument may not get updated each time changed in this way!
        console.log('data', data, 'cmd', cmd, 'channel', channel);
        //logger(keyData, 'key data', data);
    }

    public selectVInstrument(event: any): void {
      this.setState({vInstrument: event.target.value});
      let output = this.props.outUSB;
      let outmidi = this.props.outMIDI;

      if (output !== null) {
          //temp Channel 1 silence..
        midiCC(outmidi, 14, 7, 0);
        vInstrumentDraw(event.target.value, output);  // state.vInstrument isn't updated yet!
      }
    }

    public handleMinBpm(event: any): void {
      this.setState({minBpm: event.target.value});
    }

    public handleMaxBpm(event: any): void {
      this.setState({maxBpm: event.target.value});
    }

    public render() {
        return (
            <div>
                <hr/>
                MIDI: {this.props.midi}
                <MSettings
                      minBpm={this.state.minBpm}
                      maxBpm={this.state.maxBpm}
                      handleMinBpm={this.handleMinBpm}
                      handleMaxBpm={this.handleMaxBpm}
                />
                <Tap
                      minBpm={this.state.minBpm}
                      maxBpm={this.state.maxBpm}
                      outputs={this.state.outputs}
                      outUSB={this.props.outUSB}
                      outMIDI={this.props.outMIDI}
                      vInstrument={this.state.vInstrument}
                />
                <VInstrument
                      selectVInstrument={this.selectVInstrument}
                />
            </div>
        );
    }
}
