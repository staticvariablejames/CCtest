function selfTest() {
	console.assert(Boolean(Game.sesame));

	// Test date mocking
	console.assert(Game.lumps === -1); // No lumps yet

	Game.Earn(1e9);
	console.assert(Game.canLumps()); // Lumps available
	let savegame = Game.WriteSave(1);

	Util.mockedDate += 25*3600*1000; // Fast-forward 25 hours
	Game.LoadSave(savegame);
	console.assert(Game.lumps >= 1); // Lumps now!

	// Test Util.wipeSave()
	Util.wipeSave();
	console.assert(Game.lumps === -1);
	Game.LoadSave(savegame);
	console.assert(Game.lumps === -1); // still none because time got reset

	// Test fast ascension and fast reincarnation
	console.assert(!Game.OnAscend);
	console.assert(document.getElementById('heavenlyUpgrade363') === null);
	Util.Ascend();
	console.assert(!Game.cssClasses.includes('ascendIntro'));
	console.assert(Game.OnAscend);
	console.assert(document.getElementById('heavenlyUpgrade363') !== null);

	Util.Reincarnate();
	console.assert(document.getElementById('heavenlyUpgrade363') === null);
	console.assert(!Game.OnAscend);
	console.assert(!Game.cssClasses.includes('reincarnating'));

	console.log("Tests finished!");
}
