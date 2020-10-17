// Clear localStorage before each test session
window.localStorage.clear();

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
