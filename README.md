For most things a simple `setTimeout()` or `setInterval()` is enough - but Javascript timers get throttled when the page is minimised/tabbed out of and you will end up with imprecise timings in the long run. This is where AloTimer comes in - you set a timer and poll it with as much precision as you need - while individual polling calls might get throttled, the end result will always be accurate.

[![Coverage Status](https://coveralls.io/repos/github/Alorel/alo-timer/badge.svg?branch=master)](https://coveralls.io/github/Alorel/alo-timer?branch=master)
[![Build Status](https://travis-ci.org/Alorel/alo-timer.svg?branch=master)](https://travis-ci.org/Alorel/alo-timer)
[![Deps](https://david-dm.org/alorel/alo-timer.svg)](https://david-dm.org/alorel/alo-timer#info=dependencies&view=list)
[![Deps](https://david-dm.org/alorel/alo-timer/dev-status.svg)](https://david-dm.org/alorel/alo-timer#info=devDependencies&view=list)


[![NPM](https://nodei.co/npm/alo-timer.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/alo-timer)

# Functionality

[![Greenkeeper badge](https://badges.greenkeeper.io/Alorel/alo-timer.svg)](https://greenkeeper.io/)
 - Add or subtract any amount of miliseconds/seconds/minutes/hours/days
 - Get the amount of any of the above left individually
 - Output time left as a DD:HH:mm:ss string (customisable)
 - A simple check whether the timeout has finished
 - Pause and unpause the timer

# Installation
```html
<script src="path-to-alotimer.min.js"></script>
```
Or, if you prefer Node,
```
npm install alo-timer --save
```

# Usage example

```javascript
var span       = document.getElementById("my-countdown"),
    timer      = new AloTimer(3600000, ["hours", "minutes", "seconds"]), // 1 hr
    intervalCb = function () {
       if (!timer.hasFinished) {
           span.innerText = timer.toString();
       } else {
           span.innerText = "YOUR SCHNITZEL IS DONE!";
           clearInterval(interval);
       }
   },
   interval   = setInterval(intervalCb, 1000);
```

----------

More information:

   - [Demo](https://alorel.github.io/alo-timer)
   - [API documentation](https://alorel.github.io/alo-timer/jsdoc)
   - [Test coverage](https://coveralls.io/github/Alorel/alo-timer?branch=master)