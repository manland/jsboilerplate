jsboilerplate
=============

A light js boilerplate, based on grunt, bower, karma and travis !

#Install

* Clone this repo
* `cd jsboilerplate`
* `npm install`
* Dev : `grunt dev`
  * Every save files, tests are checked and files are compiled into build dir
* Compile : `grunt compile`
  * In bin dir you are 1 html, css and js, concatened and minified

#Change

* bower.json :
  * name
  * dependencies if needed and so `bower install`
* package.json
  * author
  * bugs url
  * licenses

#Special conf

* karma.conf.js
  * l.17 add files to be first

* gruntConfig.js
  * l.8 add files to be first

#Tests

* Must be named *.spec.js
