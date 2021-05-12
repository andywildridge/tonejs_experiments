
		// the player
		const player = new Tone.GrainPlayer({
			url: "https://tonejs.github.io/audio/berklee/arpeggio3crazy.mp3",
			loop: true,
			grainSize: 0.1,
            loopStart: 0.7,
            loopEnd: 1.4,
			overlap: 0.1,
            start: start
		}).toDestination();

		ui({
			parent: document.querySelector("#content"),
			tone: player,
		});

		// bind the interface
		document.querySelector("tone-play-toggle").addEventListener("start", () => player.start());
		document.querySelector("tone-play-toggle").addEventListener("stop", () => player.stop());

	/// PLAYER START

		// the player
		const player = new Tone.Player({
			url: "https://tonejs.github.io/audio/loop/FWDL.mp3",
			loop: true,
			loopStart: 0.5,
			loopEnd: 0.7,
		}).toDestination();

		ui({
			tone: player,
			parent: document.querySelector("#content")
		});

		// bind the interface
		document.querySelector("tone-play-toggle").addEventListener("start", () => player.start());
		document.querySelector("tone-play-toggle").addEventListener("stop", () => player.stop());
	

        //clock

        // the callback will be invoked approximately once a second
// and will print the time exactly once a second apart.
const clock = new Tone.Clock(time => {
	console.log(time);
}, 1);
clock.start();