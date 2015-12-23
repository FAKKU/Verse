FAKKU Verse
============

It has three major parts:

* the server side, which runs using Node.js
* the client side, which runs using javascript in your browser
* the database side, which runs using Redis

Browser Support
---------------

* Firefox - Works well.
* Chrome - Works well.
* Chromium - Works well.
* Opera 15.x - Works well.
* Opera 12.16 - Background music doesn't play.  Everything else works (Very slow though).
* Safari 6.x - Background music doesn't play.  Everything else works well.
* IE 10.x - Doesn't work.  Other versions untested.

How to get it going
-------------------

* Install [Vagrant](https://www.vagrantup.com) & [Virtual Box](https://www.virtualbox.org/wiki/Downloads).
* Add the following to the to your hosts file on your host machine:
```
127.0.0.1   game.fakku.local
```
* Go to the directory you cloned this repository into and run the command **vagrant up**.
* Create a cookie for *.fakku.local* named *fakku_game* with the following value:
```
{"name":"Test","sid":"password"}
```
* Visit [game.fakku.local](http://game.fakku.local)

Issues
-------------------

If you have an issue where the server is reporting the account doesn't exist, or the client is just saying 'Loading' forever. Then delete the Local Storage for game.fakku.local in the inspector.
