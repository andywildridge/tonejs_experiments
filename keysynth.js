/* PDM Course: Sound Unit

  Preset-AlienChorus
*/

var synth;
  // create a keyboard
var keyboard = new AudioKeys();

function setup() {
  synth = make_Pianoetta().instrument
  
  console.log(synth)
  
  keyboard.down(note => {   
    
    // convert MIDI velocity to gain
    var velToGain = map(note.velocity, 0, 127, 0, 1)
    synth.triggerAttack(note.frequency, Tone.now(), velToGain)
  });

  keyboard.up(note => synth.triggerRelease());
}


function make_Pianoetta() {
// create synth
var instrument = new Tone.MonoSynth();
var synthJSON = {
    "oscillator": {
        "type": "square"
    },
    "filter": {
        "Q": 2,
        "type": "lowpass",
        "rolloff": -12
    },
    "envelope": {
        "attack": 0.5,
        "decay": 3,
        "sustain": 0,
        "release": 0.45
    },
    "filterEnvelope": {
        "attack": 1,
        "decay": 0.32,
        "sustain": 0.9,
        "release": 3,
        "baseFrequency": 150,
        "octaves": 4
    }
};

instrument.set(synthJSON);

var effect1, effect2, effect3;

// make connections
instrument.connect(Tone.Destination);

// define deep dispose function
function deep_dispose() {
    if(instrument != undefined && instrument != null) {
        instrument.dispose();
        instrument = null;
    }
}


return {
    instrument: instrument,
    deep_dispose: deep_dispose
    };

}