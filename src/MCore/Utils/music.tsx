export const diatonicFundemental: any = [
  0,2,4,5,7,9,11,
  12,14,16,17,19,21,23,
  24,26,28,29,31,33,35,
  36,38,40,41,43,45,47,
  48,50,52,53,55,57,59,
  60,62,64,65,67,69,71,
  72,74,76,77,79,81,83,
  84,86,88,89,91,93,95,
  96,98,100,101,103,105,107,
  108,110,112,113,115,117,119,
  120,122,124,125,127,129,131
];

// Launchpad Pro Stuff, but used mainly here.
// This and convGridto64() help match an array[64] easy to map to the assumed 8x8 grid
export function conv64toGrid( orig64: number ): number { //a new test, i think this is valid
  // Example Use: Give me 0 - 63 and return pad# to meet that. ie: 11,12,18,21,22,28,,,,88
    let row8: number = (Math.floor(orig64 / 8) + 1) * 10;
    let col8: number = (orig64 % 8) + 1;
    if ( (row8 >= 10) && (row8 < 90) && (col8 >= 1) && (col8 < 9) ) {
      return row8 + col8;
    } else {
      return -1;   // will catch this as bad on other side. ...or ignored as pad 99 is nothing
    }
}

// Launchpad Pro Stuff, but used mainly here.
export function convGridto64( origGrid: number ): number {
  // Example Use: Give me 11,12,18 (Pad Grid Index),,,,88 and return 0, 1, 3, ,,,,63
    let ones: number = (origGrid % 10) - 1;
    let tens: number = Math.floor(origGrid / 10) - 1;
    if ( (ones >= 0) && (ones < 8) && (tens >= 0) && (tens < 8) ) {
      return ones + tens * 8;
    } else {
      return -1;  // will catch this as bad on other side.
    }
}

export function convertNote( padNote: number ): number {
    let note: number = convGridto64(padNote);
    console.log("note in: ", padNote, " converted to 0-64 range: ", note);
    if (note !== -1) {
      console.log("note out: ", diatonicFundemental[note]);
      return diatonicFundemental[note];
    } else {
      return -1;
    }
}

let testInstCh = [
  0,0,0,0,0,0,0,0,
  1,1,1,1,1,1,1,1,
  2,2,2,2,2,2,2,2,
  2,2,2,2,2,2,2,2,
  3,3,3,3,3,3,3,3,
  3,3,3,3,3,3,3,3,
  4,4,4,4,4,4,4,4,
  5,5,5,5,5,5,5,5
];
let testInstNote = [
  0,1,2,3,4,5,6,7,
  0,1,2,3,4,5,6,7,
  0,1,2,3,4,5,6,7,
  8,9,10,11,12,13,14,15,
  0,1,2,3,4,5,6,7,
  8,9,10,11,12,13,14,15,
  0,1,2,3,4,5,6,7,
  0,1,2,3,4,5,6,7,
];

export function customNote( padNote: number ): object {
    let note: number = convGridto64(padNote);
    //console.log("note in: ", padNote, " converted to 0-64 range: ", note);
    if (note !== -1) {
      console.log("note out: ", diatonicFundemental[testInstNote[note]]);
      return { note: diatonicFundemental[testInstNote[note]] + 48, channel: testInstCh[note] };
    } else {
      return { note: -1, channel: -1 };
    }
}

export function midiNoteOn(output: any, midiChannel: number, note: number, velocity: number) {
  output.send( [144 + midiChannel, note, velocity] );
}

export function midiNoteOff(output: any, midiChannel: number, note: number, velocity: number) {
  output.send( [128 + midiChannel, note, velocity] );
}

export function midiAftertouch(output: any, midiChannel: number, value: number) {
  output.send( [208 + midiChannel, value] );
}

export function midiCC(output: any, midiChannel: number, cc: number, value: number) {
  output.send( [176 + midiChannel, cc, value] );  //176 is CC on Channel 1 (midiChannel 0)
}

export function midiClock(output: any) {
  output.send( [0xF8] );
}
