THIS PROJECT IS DEPRECATED
==========================

Check Cookie Connoisseur (<https://github.com/staticvariablejames/cookie-connoisseur>)
for a better alternative.


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

- Automatically load all mods listed in `modList`,
	in the very beginning of `main.js`.
	Mods are loaded in sequence.

- Catch DOMException raised when sounds don't play properly.
	This should make seeing the errors from `console.assert` easier.

- The `order` attribute of upgrades and achievements is displayed in full.
    (Vanilla Cookie Clicker `Math.floor`s the `order` attribute before displaying.)


Using the Framework
===================

Instructions for Unix-like operating systems:

1. Create a symbolic link pointing to the directory containing the mod being tested.

2. Create a `test.js` file (or something like that) containing a `runTest()` function
    that does the testing.
    See [`self-test.js`](self-test.js) for an example.

3. Edit `modList` in the beginning of `main.js` to load the mod and the test.
    (Here the symbolic link is useful to allow testing local code.)

4. Run a live server (like npm's `live-server`) and happy debugging!
