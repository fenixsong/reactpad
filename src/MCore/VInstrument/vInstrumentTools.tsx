import {midiNoteOn, midiNoteOff, midiCC, convertNote, customNote, midiAftertouch} from '../Utils/music';
import {lppRgbGrid, lppClear, lppFlashPads, lppLedColumn, lppLedPads, lppPulsePads} from '../Utils/launchpadpro';

export function vInstrumentHandler(vInstrument: string, output: any, channel: number, type: number, note: number, velocity: number) {
  //output.send( [144 + midiChannel, note, velocity] );
  switch (type) {
      case 144: // noteOn message
           console.log("NOTE!ON");
           switch (vInstrument) {
              case "default":
                 if (note > 0 ) {
                     let modnote: number = convertNote(note)+24;
                     if ( modnote > 127 ) {modnote = 127;}
                     midiNoteOn(output, 0, modnote, velocity);
                     midiNoteOn(output, 1, modnote, velocity);
                     midiNoteOn(output, 2, modnote, velocity);
                 }
                 break;
             case "Funk":
                console.log("FUNK NOTE");
                if (note > 0 ) {
                  let modnote: any = customNote(note);
                  midiNoteOn(output, modnote.channel, modnote.note, velocity);
                }
                break;
             default:
                console.log("OTHER NOTES");
                break;
           }
           break;
      case 128: // noteOff message
          //noteOff(note, velocity);
          console.log("NOTE OFF!!!!");
          break;
      case 208: //aftertouch
          midiAftertouch(output, 0, note);
          midiAftertouch(output, 1, note);
          midiAftertouch(output, 2, note);
          break;
      default:

          break;
  }
}

export function vInstrumentDraw(vInstrument: string, output: any) {
  switch(vInstrument) {
      case "default":
        lppClear(output);
        lppLedPads(output, [11,33,18,33,27,33,36,33,45,33,54,33,63,33,72,33,81,33,88,33]);
        lppLedPads(output, [14,8,23,8,32,8,41,8,48,8,57,8,66,8,75,8,84,8]);
        lppFlashPads(output, [10,20]);
        console.log("Draw Instrument Default");
        break;
      case "Funk":
        lppClear(output);
        lppLedPads(output, [11,4,12,4,13,4,14,4,15,4,16,4,17,4,18,4]);
        lppLedPads(output, [21,12,22,12,23,12,24,12,25,12,26,12,27,12,28,12]);
        lppLedPads(output, [31,20,32,20,33,20,34,20,35,20,36,20,37,20,38,20]);
        lppLedPads(output, [41,28,42,28,43,28,44,28,45,28,46,28,47,28,48,28]);
        lppLedPads(output, [51,36,52,36,53,36,54,36,55,36,56,36,57,36,58,36]);
        lppLedPads(output, [61,44,62,44,63,44,64,44,65,44,66,44,67,44,68,44]);
        lppLedPads(output, [71,52,72,52,73,52,74,52,75,52,76,52,77,52,78,52]);
        lppLedPads(output, [81,60,82,60,83,60,84,60,85,60,86,60,87,60,88,60]);
        console.log("Draw Instrument FUNK");
        break;
      default:
        lppClear(output);
        lppLedPads(output, [11,5,12,6,13,14,14,50]);
        console.log("Draw Instrument OTHER");
        break;
  }
}
