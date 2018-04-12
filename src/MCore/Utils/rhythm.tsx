//import {initWebAudio, loadSounds} from './webaudio';
import {lppRgbPad, lppRgbGrid, lppClear} from './launchpadpro';

export function doTimer(length: number, resolution: number, oninstance: any, oncomplete: any)
{
    var steps: number = (length / 100) * (resolution / 10);
    var speed: number = length / steps;
    var count: number = 0;
    var start: number = new Date().getTime();

    function instance() {
        if (count++ === steps) {
            oncomplete(steps, count);
        } else {
            oninstance(steps, count);
            let diff = (new Date().getTime() - start) - (count * speed);
            window.setTimeout(instance, (speed - diff));
        }
    }
    window.setTimeout(instance, speed);
}

export function rhythmInit(outputs: any) {
  doTimer(
    5000,
    20,
    function(steps: number) {
      //console.log('steps: ', steps);
      outputs.forEach( function(output: any, v: any) {

        lppClear(output);
        let rand1 = Math.floor(Math.random() * 88);
        let rand2 = Math.floor(Math.random() * 62);
        let rand3 = Math.floor(Math.random() * 62);
        let rand4 = Math.floor(Math.random() * 62);
        lppRgbGrid( output,
                    [rand1, 0, 43, rand3,
                    55, 0, rand4, 63,
                    rand2, 44, 0, rand4]
              );

        //output.send( [183, 93, 53] );
        //output.send( [240, 0,32,41,2,16,40,81, 10, 247] );  // pulse? just a demo
        //console.log("Sent message");
      });
    },
    function() {
      console.log('complete');
    }
  );
  //initWebAudio();

  // let RhythmSample = function() {
  //   loadSounds(this, {
  //     kick: 'kick.wav',
  //     snare: 'snare.wav',
  //     hihat: 'hihat.wav'
  //   }, null);
//};

  // RhythmSample.prototype.play = function() {
  //   // We'll start playing the rhythm 100 milliseconds from "now"
  //   var startTime = context.currentTime + 0.100;
  //   var tempo = 80; // BPM (beats per minute)
  //   var eighthNoteTime = (60 / tempo) / 2;
  //
  //   // Play 2 bars of the following:
  //   for (var bar = 0; bar < 2; bar++) {
  //     var time = startTime + bar * 8 * eighthNoteTime;
  //     // Play the bass (kick) drum on beats 1, 5
  //     playSound(this.kick, time);
  //     playSound(this.kick, time + 4 * eighthNoteTime);
  //
  //     // Play the snare drum on beats 3, 7
  //     playSound(this.snare, time + 2 * eighthNoteTime);
  //     playSound(this.snare, time + 6 * eighthNoteTime);
  //
  //     // Play the hi-hat every eighthh note.
  //     for (var i = 0; i < 8; ++i) {
  //       playSound(this.hihat, time + i * eighthNoteTime);
  //     }
  //   }
  // };
}
