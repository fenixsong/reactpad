// THE Collection of SYSEX functions for Launchpad Pro VISUALS while using factory firmware
// especially meant to work with PROGRAMMER MODE, but can work in all MODEs with mixed results

export function lppRgbPad(output: any, pad: number, r: number, g: number, b: number) {
    output.send( [240, 0, 32, 41, 2, 16, 11,
                  pad, r, g, b,
                  247] );  // sysex ...rgb to grid...various randoms
}

export function lppRgbGrid(output: any, padArray: any) {
  //padArray can be a long sequence of... <LED>,<R>,<G>,<B>, (repeat)
    let sysex = [240, 0, 32, 41, 2, 16, 11];
    let full = sysex.concat( padArray );
    full.push( 247 );
    output.send( full );  // sysex ...rgb to grid...various randoms
}

export function lppClear(output: any) {
    output.send( [240,0,32,41,2,16,14,0,247] );  // sysex... blanks all
}

export function lppLedPads(output: any, padArray: any) {
  //padArray can be a long sequence of... <LED>,<Colour>, (repeat)
  let sysex = [240,0,32,41,2,16,10];
  let full = sysex.concat( padArray );
  full.push( 247 );
  output.send( full );  // sysex ...LED to grid...Color is from 0-128
}

export function lppLedColumn(output: any, column: number, colorArray: any) {
  /*Columns are numbered left to right, 0 – 9, with 0 and 9 referring to the round buttons. The
  sequence of LED colours starts at the lowest LED, with the next colour referring to the next
  higher LED in the same column. However, the LEDs that are missing from the corners (in the
  columns of round buttons) still occupy a position in the message. They just cannot be seen. Also,
  the side LED cannot be updated by this message. */
  let sysex = [240,0,32,41,2,16,12, column];
  let full = sysex.concat( colorArray );
  full.push( 247 );
  output.send( full );
}

export function lppLedRow(output: any, row: number, colorArray: any) {
  /* Rows are numbered bottom to top, 0 - 9, with 0 and 9 referring to the round buttons. The
  sequence of LED colours starts at the most left LED, with the next colour referring to the next LED
  to the right in the same row. However, the LEDs that are missing from the corners (in the rows of
  round buttons) still occupy a position in the message. They just cannot be seen. Also, the side
  LED cannot be updated by this message. */
  let sysex = [240,0,32,41,2,16,13, row];
  let full = sysex.concat( colorArray );
  full.push( 247 );
  output.send( full );
}

export function lppLightAll(output: any, color: number) {
  output.send([240,0,32,41,2,16,14,color,247]);
}

export function lppFlashPads(output: any, padArray: any) {
  //padArray can be a long sequence of... <LED>,<Colour>, (repeat)
  let sysex = [240,0,32,41,2,16,35];
  let full = sysex.concat( padArray );
  full.push( 247 );
  output.send( full );  // sysex ...LED to grid...Color is from 0-128
}

export function lppPulsePads(output: any, padArray: any) {
  //padArray can be a long sequence of... <LED>,<Colour>, (repeat)
  let sysex = [240,0,32,41,2,16,40];
  let full = sysex.concat( padArray );
  full.push( 247 );
  output.send( full );  // sysex ...LED to grid...Color is from 0-128
}

export function lppRgb10x10(output: any, r: number, g: number, b: number) {
    output.send( [240, 0, 32, 41, 2, 16, 15, 0, r, g, b, 247] );
}

export function lppRgb8x8(output: any, r: number, g: number, b: number) {
    output.send( [240, 0, 32, 41, 2, 16, 15, 1, r, g, b, 247] );
}

//Midi Clock handled by TAP ...aka elsewhere
/* By default, Launchpad Pro will flash and pulse at 120 BPM. This can be altered by sending
Launchpad Pro F8h (248) messages (MIDI clock), which should be sent at a rate of 24 per beat. To
set a tempo of 100 BPM, 2400 MIDI clock messages should be sent each minute, or with a time
interval of 25ms.

Launchpad Pro supports tempos between 40 and 240 BPM.  */

export function lppText(output: any, color: number, loop: number, asciiTextArray: any) {
  //loop is 0 to not loop and 1 to loop (be careful, that may go on forever!)
  //asciiTextArray uses 1 thru 7 for speed and above for ascii numbered letters.... 32 space, 33-sp.chars, 48=0, 49=1, etc.
  // 65=A  97=a (quick summary)
  let sysex = [240, 0, 32, 41, 2, 16, 20, color, loop];
  let full = sysex.concat( asciiTextArray );
  full.push( 247 );
  output.send( full );
}

export function lppStopText(output: any) {
  output.send( [240,0,32,41,2,16,20,247] );
}
