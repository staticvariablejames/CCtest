Cookie Clicker Testing Framework
================================

This is an experimental framework for automated testing of Cookie Clicker mods.

It basically contains a copy of Cookie Clicker v2.029
together with some modifications to allow for easier testing.


Modifications
=============

- Removed ads, and the fonts are in the repository now,
	so it should be possible to run this instance of Cookie Clicker fully offline.

- All local data is erased before initialization.

- The `Game.OpenSesame()` cheat code is on by default.

- `Date.now()` is mocked to start ticking from 2020-08-25 00:00:00 UTC,
    which is a few days after Cookie Clicker v2.029 went live.
    This helps testing time-sensitive features, like sugar lumps.

- Automatically load `CCSE-fork/CCSE.js` and all mods listed in `modList`,
	in the very beginning of `main.js`.
	Mods are loaded in sequence.
