Cookie Clicker Testing Framework
================================

This is an experimental framework for automated testing of Cookie Clicker mods.

It basically contains a copy of Cookie Clicker v2.029
together with some modifications to allow for easier testing.


Modifications
=============

- Removed ads, and the fonts are in the repository now,
	so it should be possible to run this instance of Cookie Clicker fully offline.

- Automatically load `CCSE-fork/CCSE.js` and all mods listed in `modList`,
	in the very beginning of `main.js`.
	Mods are loaded in sequence.
