/* PDM Course: Sound Unit
Scheduling Events with Tone.Part()
*/

let synth;
let start;
let stop;
let pause;
let slider;
let startPart;
let chord; 
let probability;

function setup() {
  createCanvas(600, 600);
  synth = make_poly().instrument;

  let score = [
    {"time": "0:0", "note": ["D4", "E4", "F4"]},
    {"time": "1:0", "note": ["F4", "A4", "C4"]}, 
    {"time": "2:0", "note": ["G4", "Bb4", "D4"]},
    {"time": "3:3", "note": ["A4", "A4", "E4"]}, 
  ];
  chord = new Tone.Part(
    (time, chord) => {
      console.log(chord.note, chord.time)
      synth.triggerAttackRelease(chord.note, "8n", time);
    }, score);
  
  // loop every measure for 8 measures
  // true or number of times looped
  chord.loop = 4;
  chord.loopEnd = '4m'
  chord.playbackRate = 1
  chord.probability = 1;
  
  startPart = createButton("start part")
    .position(150, 60)
    .mousePressed(() => chord.start());

  stopPart = createButton("stop part")
    .position(150, 80)
    .mousePressed(() => chord.stop());

  probability = createSlider(0, 1, 1, 0)
    .position(150, 100)
  
  start = createButton("start transport");
  start.position(20, 60);
  start.mousePressed(() => Tone.Transport.start());

  pause = createButton("pause transport");
  pause.position(20, 80);
  pause.mousePressed(() => Tone.Transport.pause());

  stop = createButton("stop transport");
  stop.position(20, 100);
  stop.mousePressed(() => Tone.Transport.stop());

  slider = createSlider(40, 200, 120, 0);
  slider.position(20, 40);

  rampTransport = createButton("ramp transport bpm");
  rampTransport.position(200, 200);
  rampTransport.mousePressed(() => Tone.Transport.bpm.rampTo(200, 4));
}
function draw() {
  if(chord.state === 'stopped') {
    background(255, 0, 0)
  } else {
    background(0, 255, 0)
  }
  
  text(
    "Transport time in seconds " + Tone.Transport.seconds.toFixed(1),
    20,
    20
  );

  // bars:beats:sixteens
  text("Transport position: " + Tone.Transport.position, 200, 20);
  
  // event position
  text("Event position: " + chord.progress.toFixed(1), 200, 40)
  text("Event probability " + chord.probability.toFixed(1), 320, 40)
  // comment this line to get the ramp to work
  // Tone.Transport.bpm.value = slider.value();
  text("BPM " + Tone.Transport.bpm.value.toFixed(0), 20, 40);
  chord.probability = probability.value()

  text("Transport state: " + Tone.Transport.state, 400, 20);
}

function make_poly() {
  // create synth
  let instrument = new Tone.PolySynth(Tone.FMSynth, 3);
  let synthJSON = {
    harmonicity: 5,
    modulationIndex: 10,
    oscillator: {
      type: "sine"
    },
    envelope: {
      attack: 0.001,
      decay: 2,
      sustain: 0.1,
      release: 2
    },
    modulation: {
      type: "square"
    },
    modulationEnvelope: {
      attack: 0.002,
      decay: 0.2,
      sustain: 0,
      release: 0.2
    }
  };

  instrument.set(synthJSON);

  let effect1, effect2, effect3;

  // make connections
  instrument.connect(Tone.Destination);

  // define deep dispose function
  function deep_dispose() {
    if (instrument != undefined && instrument != null) {
      instrument.dispose();
      instrument = null;
    }
  }

  return {
    instrument: instrument,
    deep_dispose: deep_dispose
  };
}