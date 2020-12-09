// Clear localStorage before each test session
window.localStorage.clear();

// General utility for testing.
let approx = function(x, y) {
	return Math.abs(x-y) < 1e-10;
}

var Util = {};
Util.defaultMockedDate = 1598313600000; // 2020-08-25 00:00:00 UTC
Util.currentDate = Date.now();
Util.mockedDate = Util.defaultMockedDate; // This variable may be changed by users
Util.dateNow = Date.now;

// Allows the clock to tick starting from Util.mockedDate.
Date.now = () => Util.dateNow() - Util.currentDate + Util.mockedDate;

/* Wipe save file and restore original behavior of utilities
 * If type === "with minigames",
 * the fresh save will have all minigames unlocked,
 * farm and banks at level 10,
 * and 100 of each building.
 */
Util.wipeSave = function(type) {
	Util.mockedDate = Util.defaultMockedDate;
	Game.HardReset(2);
	if(type === "with minigames") {
		Game.Earn(1e9); // unlocks lumps
		Game.lumps = 22;
		Game.Objects['Farm'].level = 9;
		Game.Objects['Bank'].level = 9;
		for(let building of Game.ObjectsById) {
			building.getFree(100);
			if(building.minigameUrl)
				building.levelUp();
		}
	}
}

// Ascend, but skip the ascension animation
Util.Ascend = function() {
	Game.Ascend(1);
	Game.AscendTimer=Game.AscendDuration;
	Game.UpdateAscendIntro();
}

// Reincarnate, but skip the reincarnate animation
Util.Reincarnate = function() {
	Game.Reincarnate(1);
	Game.ReincarnateTimer = Game.ReincarnateDuration;
	Game.UpdateReincarnateIntro();
}

// Ensures the grandmapocalypse starts
Util.startGrandmapocalypse = function() {
	// Ensures we stay in the grandmapocalypse once it starts
	if(Game.Objects['Grandma'].amount < 1) Game.Objects['Grandma'].getFree(1);

	/* Even though Game.Upgrades['One mind'].buy has a 'bypass' argument,
	 * it definitely does not work as intended.
	 * So we will abuse of Game.Upgrade.prototype.toggle instead.
	 */
	Game.Upgrades['One mind'].bought = 0;
	// This forces the toggle() function below to do the right thing
	Game.Upgrades['One mind'].toggle();
}

/* Spawns and immediately pops a wrinkler.
 * This is mostly useful for testing.
 * Nothing happens if all wrinkler spots are occupied.
 */
Util.spawnAndPopWrinkler = function() {
	let wrinkler = Game.SpawnWrinkler();
	if(!wrinkler) return;
	wrinkler.close = 0; // Guarantees the wrinkler will count as a popped wrinkler
	wrinkler.hp = 0;
	Game.UpdateWrinklers();
}

/* Spaws a "spawnlead reindeer", which counts for Game.reindeerClicked when clicked.
 * The spawned reindeer is returned.
 */
Util.spawnReindeer = function() {
	let reindeer = new Game.shimmer('reindeer');
	reindeer.spawnLead = 1;
	return reindeer;
}

/* Simulates a click on the big cookie, forcing the game to process it.
 * The game has some shenanigans to e.g. award Uncanny Clicker and prevent more than 250 clicks/s,
 * so it might take several frames for a document.getElementById('bigCookie').click() to process.
 * This function forces the game to process it immediately.
 */
Util.clickBigCookie = function() {
	Game.lastClick = Date.now() - 4;
	if(Game.T < 3) Game.T = 3;
	Game.ClickCookie();
}
