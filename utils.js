// Clear localStorage before each test session
window.localStorage.clear();

var Util = {};
Util.defaultMockedDate = 1598313600000; // 2020-08-25 00:00:00 UTC
Util.currentDate = Date.now();
Util.mockedDate = Util.defaultMockedDate; // This variable may be changed by users
Util.dateNow = Date.now;

// Allows the clock to tick starting from Util.mockedDate.
Date.now = () => Util.dateNow() - Util.currentDate + Util.mockedDate;

// Wipe save file and restore original behavior of utilities
Util.wipeSave = function() {
	Util.mockedDate = Util.defaultMockedDate;
	Game.HardReset(2);
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
