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

	console.log("Tests finished!");
}
