/// <reference path="../../interfaces.d.ts" />
import * as React from 'react';
import './index.css';
import {lppRgbGrid, lppClear, lppFlashPads, lppLedColumn, lppLedPads, lppPulsePads} from '../Utils/launchpadpro';
import {midiCC, midiClock, midiNoteOn } from '../Utils/music';
import {vInstrumentDraw} from '../VInstrument/vInstrumentTools';

export default class Tap extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { tapBegin: null,
                       qtrNoteMs: null,
                       isRecording: false,
                       intervalId: null,
                     };
        this.tapClick = this.tapClick.bind(this);
        this.tapComplete = this.tapComplete.bind(this);
        this.clearClick = this.clearClick.bind(this);
        this.recordClick = this.recordClick.bind(this);
        this.sendLights = this.sendLights.bind(this);
        this.midiClockTimer = this.midiClockTimer.bind(this);
        this.ccDelayNote = this.ccDelayNote.bind(this);
        this.delayNote = this.delayNote.bind(this);
    }

    componentDidUpdate(prevProps: any, prevState: any) {
      if ( this.state.qtrNoteMs !== null && prevState.qtrNoteMs === null ) {
        // set up timer
        let intervalIdTemp: object = setInterval(
          () => { this.midiClockTimer(); },
          Math.floor(this.state.qtrNoteMs / 24)
        );
        this.setState({ intervalId: intervalIdTemp});
      } else if ( this.state.qtrNoteMs === null && prevState.qtrNoteMs !== null ) {
        // tear down timer
        clearInterval(this.state.intervalId);
        this.setState({ intervalId: null});
      }
    }

    public midiClockTimer() {
      let output = this.props.outMIDI;
      if ( output !== null ) {
        midiClock(output);
      }
      //console.log("HeartBeat!", Math.floor(this.state.qtrNoteMs / 24));
    }

    public tapClick(e: any) {
      e.preventDefault();
      this.setState({tapBegin: Date.now()});
      console.log('The Tap Begun.', this.state.tapBegin);
    }

    public tapComplete(e: any) {
      e.preventDefault();
      let tapEnd = Date.now();
      let qtrNoteMs = tapEnd - this.state.tapBegin;
      console.log('The Tap Ended. Start was: ', this.state.tapBegin, ' End is: ', tapEnd,
                  ' and difference is: ', qtrNoteMs);

      // now that we have the min and max BPM (built to protect against super fast or slow click-holds)
      // limit the range of qtrNoteMs
      if ( qtrNoteMs > (60000 / this.props.minBpm) ) {
        qtrNoteMs = 60000 / this.props.minBpm;
      }
      if ( qtrNoteMs < (60000 / this.props.maxBpm) ) {
        qtrNoteMs = 60000 / this.props.maxBpm;
      }
      this.setState({qtrNoteMs: qtrNoteMs, tapBegin: null});

      // midiclock_ms = lp_tempo_quarternote_ms / 24;

      // and this nugget 60,000 / BPM = one beat in milliseconds
      // so....   qtrNoteMs * BPM = 60000
      // so ....  BPM = 60000 / qtrNoteMs
    }

    public clearClick(e: any) {
      e.preventDefault();
      this.setState({tapBegin: null, qtrNoteMs: null, isRecording: false});
    }

    public recordClick(e: any) {
      e.preventDefault();
      this.setState({isRecording: !this.state.isRecording});
    }

    public ccDelayNote(e: any) {
      e.preventDefault();
      let output = this.props.outMIDI;
      if (output !== null) {
        let randSample = Math.floor(Math.random() * 64);
        midiCC(output, 13, 19, randSample);
        //then delay 10 ms and hit note...36
        midiNoteOn(output, 0, 36, 120);
        //setTimeout(this.delayNote, 100);
        console.log("CC sent");
      }
    }

    public delayNote() {
      let output = this.props.outMIDI;
      if (output !== null) {

        console.log("Note delayed but sent");
      }
    }

    public sendLights(e: any) {
      e.preventDefault();
      console.log("Fire off SYSEX for lights and maybe more");

      let output = this.props.outUSB;
      let outmidi = this.props.outMIDI;
      // this.props.outputs.forEach( function(output: any, v: any) {
      //   // this is the USB controlled: output.name = "Launchpad Pro Standalone Port"
      //   //  this is the MIDI DIN out:  output.name = "Launchpad Pro MIDI Port"
      //   if (output.name === "Launchpad Pro Standalone Port") {
      if (output !== null) {
          //temp Channel 14 silence..
        midiCC(outmidi, 14, 7, 0);
        vInstrumentDraw(this.props.vInstrument, output);
      }
    }

    public render() {
        const qNote = this.state.qtrNoteMs;

        return (
            <div className="tapArea">
                <button className="tapButton" onMouseDown={this.tapClick} onMouseUp={this.tapComplete}>TAP</button>
                {qNote &&
                  <button className="tapButton" onClick={this.clearClick}>CLEAR</button>
                }
                <div>
                  TEMPO: {qNote ? ( 60000 / this.state.qtrNoteMs ) : "not set"}
                </div>
                {qNote &&
                  <div>
                    <button className={this.state.isRecording ? 'tapButton recording' : 'tapButton'} onClick={this.recordClick}>O</button>
                    <button className='tapButton' onClick={this.sendLights}> * </button>
                    <button className='tapButton' onClick={this.ccDelayNote}> CC+Nt </button>
                  </div>
                }
            </div>
        );
    }
}
