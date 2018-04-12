
export function noteOn(midiNote: Number, velocity: Number) {
    player(midiNote, velocity);
}

export function noteOff(midiNote: Number, velocity: Number) {
    player(midiNote, velocity);
}

export function player(midiNote: Number, velocity: Number) {  //temp
  console.log("Got note: ", midiNote, " Velocity: ", velocity);

  // Sample from other....
  // var sample = sampleMap['key' + note];
  // if (sample) {
  //     if (type == (0x80 & 0xf0) || velocity == 0) { //QuNexus always returns 144
  //         btn[sample - 1].classList.remove('active');
  //         return;
  //     }
  //     btn[sample - 1].classList.add('active');
  //     btn[sample - 1].play(velocity);
  // }
}
// !! Sample Note Send:::
// This example sends a middle C note on message immediately on MIDI channel 1 (MIDI channels are 0-indexed,
// but generally referred to as channels 1-16), and queues a corresponding note off message for 1 second later.
    // function sendMiddleC( midiAccess, portID ) {
    //   var noteOnMessage = [0x90, 60, 0x7f];    // note on, middle C, full velocity
    //   var output = midiAccess.outputs.get(portID);
    //   output.send( noteOnMessage );  //omitting the timestamp means send immediately.
    //   output.send( [0x80, 60, 0x40], window.performance.now() + 1000.0 ); // Inlined array creation- note off, middle C,
    //                                                                 // release velocity = 64, timestamp = now + 1000ms.
    // }

//this, BELOW... going away I think
export function onMIDIMessage(event: any) {
    debugger;
    let data = event.data,
     cmd = data[0] >> 4,
     channel = data[0] & 0xf,
     type = data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
     note = data[1],
     velocity = data[2];
    // with pressure and tilt off
    // note off: 128, cmd: 8
    // note on: 144, cmd: 9
    // pressure / tilt on
    // pressure: 176, cmd 11:
    // bend: 224, cmd: 14

    switch (type) {
        case 144: // noteOn message
             noteOn(note, velocity);
             break;
        case 128: // noteOff message
            noteOff(note, velocity);
            break;
        default:
            break;
    }

    console.log('data', data, 'cmd', cmd, 'channel', channel);
    //logger(keyData, 'key data', data);
}
