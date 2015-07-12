![Logo](https://cloud.githubusercontent.com/assets/4998038/8639510/143eb500-28d4-11e5-97e2-3d1685e5fa90.png)

[![License](https://poser.pugx.org/alorel/alo-timer/license?format=plastic)](LICENSE) [![Latest Stable Version](https://poser.pugx.org/alorel/alo-timer/v/stable?format=plastic)](https://packagist.org/packages/alorel/alo-timer)  [![Total Downloads](https://poser.pugx.org/alorel/alo-timer/downloads?format=plastic)](https://packagist.org/packages/alorel/alo-timer)

# About #
Imagine you want a simple countdown for your site. You add a `span`, set an interval to subtract a second from it every second, and in 30 minutes you refresh the page only to see that the timer is off. AloTimer addresses that - you create the timer object and, instead, query it how much time is left, getting accurate results regardless of runtime or machine resource usage.

# Functionality #

 - Add or subtract any amount of miliseconds/seconds/minutes/hours/days
 - Get the amount of any of the above left individually
 - Output time left as a DD:HH:mm:ss string
 - A simple check whether the timeout has finished

# Installation #
One or the other:

    git clone https://github.com/Alorel/alo-timer.git
    composer require alorel/alo-timer

# Documentation #
Documentation can be found in the JSDoc directory - it's just one class.

# Usage example#
The example uses jQuery.

    var span       = $("#my-countdown"),
        timer      = new AloTimer(3600000), // 1 hr
        intervalCb = function () {
            if (!timer.isFinished()) {
                span.html(timer.toString());
            } else {
                span.html('Done');
                clearInterval(interval);
            }
        },
        interval   = setInterval(intervalCb, 1000);
