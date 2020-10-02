// Clear localStorage before each test session
window.localStorage.clear();

var Util = {};
Util.currentDate = Date.now();
Util.mockedDate = 1598313600000; // 2020-08-25 00:00:00 UTC
Util.dateNow = Date.now;

// Allows the clock to tick starting from Util.mockedDate.
Date.now = () => Util.dateNow() - Util.currentDate + Util.mockedDate;
