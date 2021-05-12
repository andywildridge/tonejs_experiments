/*
Making a Simple Synthesizer Sequence with Tone.js and P5
Programming Digital Media
code by Matthew A. Bardin [2020]

The goal of this code is to build on the basic Tone.Synth object and sequence the output notes to automatically play a melody
*/
//In addition to the original codefor making a synthesizer, you will need 2 new variables: one to store the sequencing information, and an array to hold the notes
let sequence1, simpSynth;
let bgMelody = ["C3", ["E3", "G3", "D3", "C3"], "A3", "B2", "C2", "E3", ["A2", "G2"], "C4"]; //each indexed element is one beat of musical time. Nested arrays are subdivisions of those beats


function setup() {
  createCanvas(400, 400);
//Make the synth like normal
    simpSynth = new Tone.Synth({
    oscillator: {
      type: "square" //the type of waveform the synthesizer produces. Can be square, since, triangle, or sawtooth
    },
    envelope: { //sets the various sound properties for the synth
      attack: 0.05,
      decay: 0.5,
      sustain: 1,
      release: 5
    }
  }).toDestination(); //sends the synth's output to the speakers

//Here we generate the sequencer.
  sequence1 = new Tone.Sequence(function(time, note) { //the object has a built in function where we call triggerAttackRelease(), which is what makes our synthesizer generate sound
    simpSynth.triggerAttackRelease(note, 0.5);
//adding the console log lets the programmer see the current note being generated
    console.log(note);
  }, bgMelody, '4n'); //after making the function, you have to specify what the notes you want to feed into it are, and how you are defining the beat. In this case, notes come from the bgMelody array, and each element is one quarter note

//Next we need to set up the clock that will act as the driving force for the sequence of notes. 
  Tone.Transport.bpm.value = 80; //how many beats(quarter notes) per minute
  Tone.Transport.start(); //starts the transport
}

function draw() {
  background(220, 0, 255);
 textAlign(CENTER);
  textFont('futura');
  text("Hold the mouse button play a melody. \nYou may have to click, then click and hold.", width / 2, height / 2);
}

//starts the sequence
function mousePressed() {
  Tone.start();
  sequence1.start();
  console.log('lets go!')
}

//end the sequence
function mouseReleased(){
  sequence1.stop();
}