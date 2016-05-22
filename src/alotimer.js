var AloTimer = (function (floor, Date, Error) {
    /**
     * Methods to call for toString()
     */
    var TIME_CHAIN = ['days', 'hours', 'minutes', 'seconds'],
    // Note that this is not global if require()'d in NodeJS, only plain Javascript
        /**
         * Creates the timer
         * @author Art <a.molcanovas@gmail.com>
         * @param {number} [timeout=0] How many milliseconds to have the timeout for
         * @class
         * @global
         */
        AloTimer = function (timeout) {
            /**
             * How long the timeout is set for
             * @type {number}
             */
            this.timeout = timeout || 0;

            /**
             * When the timeout started
             * @type {number}
             * @readonly
             */
            this.timeStart = new Date().getTime();

            /**
             * When the timer was paused. Will hold false if the timer isn't currently paused.
             * @type {Date|boolean}
             */
            this.pauseTime = false;
        }

    /** @global */
    AloTimer.prototype = {

        /**
         * Adds milliseconds to the timer
         * @author Art <a.molcanovas@gmail.com>
         * @param val The amount to add
         * @returns {AloTimer}
         */
        addMS: function (val) {
            this.timeout += val;
            return this;
        },


        get timeout() {
            return this._timeout;
        },

        set timeout(num) {
            if (!isNaN(num)) {
                this._timeout = parseInt(num);
            } else {
                throw new Error("The timeout must be numeric!");
            }
        },

        /**
         * Pauses the timer
         * @author Art <a.molcanovas@gmail.com>
         * @returns {AloTimer}
         */
        pause: function () {
            if (this.isPaused) {
                console.warn("The timer is already paused");
            } else {
                this.pauseTime = new Date();
            }
            return this;
        },

        /**
         * Checks if the timer is currently paused
         * @author Art <a.molcanovas@gmail.com>
         * @returns {boolean}
         */
        get isPaused() {
            return this.pauseTime instanceof Date;
        },

        /**
         * Unpauses the timer
         * @author Art <a.molcanovas@gmail.com>
         * @returns {AloTimer}
         */
        unpause: function () {
            if (!this.isPaused) {
                console.warn("The timer isn't paused");
            } else {
                this.addMS(this.msSincePause);
                this.pauseTime = false;
            }
            return this;
        },

        /**
         * Returns the number of milliseconds that have passed since the timer was paused
         * @author Art <a.molcanovas@gmail.com>
         * @returns {number}
         */
        get msSincePause() {
            if (this.isPaused) {
                return new Date().getTime() - this.pauseTime;
            } else {
                return 0;
            }
        },

        /**
         * Adds seconds to the timer
         * @author Art <a.molcanovas@gmail.com>
         * @param val The amount to add
         * @returns {AloTimer}
         */
        addSeconds: function (val) {
            this.timeout += val * 1000;
            return this;
        },

        /**
         * Adds minutes to the timer
         * @author Art <a.molcanovas@gmail.com>
         * @param val The amount to add
         * @returns {AloTimer}
         */
        addMinutes: function (val) {
            this.timeout += val * 60000;
            return this;
        },

        /**
         * Adds hours to the timer
         * @author Art <a.molcanovas@gmail.com>
         * @param val The amount to add
         * @returns {AloTimer}
         */
        addHours: function (val) {
            this.timeout += val * 3600000;
            return this;
        },

        /**
         * Adds days to the timer
         * @author Art <a.molcanovas@gmail.com>
         * @param val The amount to add
         * @returns {AloTimer}
         */
        addDays: function (val) {
            this.timeout += val * 86400000;
            return this;
        },

        /**
         * Subtracts milliseconds from the timer
         * @author Art <a.molcanovas@gmail.com>
         * @param val The amount to add
         * @returns {AloTimer}
         */
        subMS: function (val) {
            this.timeout -= val;
            return this;
        },

        /**
         * Subtracts seconds from the timer
         * @author Art <a.molcanovas@gmail.com>
         * @param val The amount to add
         * @returns {AloTimer}
         */
        subSeconds: function (val) {
            this.timeout -= val * 1000;
            return this;
        },

        /**
         * Subtracts minutes from the timer
         * @author Art <a.molcanovas@gmail.com>
         * @param val The amount to add
         * @returns {AloTimer}
         */
        subMinutes: function (val) {
            this.timeout -= val * 60000;
            return this;
        },

        /**
         * Subtracts hours from the timer
         * @author Art <a.molcanovas@gmail.com>
         * @param val The amount to add
         * @returns {AloTimer}
         */
        subHours: function (val) {
            this.timeout -= val * 3600000;
            return this;
        },

        /**
         * Subtracts days from the timer
         * @author Art <a.molcanovas@gmail.com>
         * @param val The amount to add
         * @returns {AloTimer}
         */
        subDays: function (val) {
            this.timeout -= val * 86400000;
            return this;
        },

        /**
         * Checks whether the timeout has finished
         * @author Art <a.molcanovas@gmail.com>
         * @returns {boolean}
         */
        get hasFinished() {
            return (new Date().getTime() - this.timeStart) >= this.timeout;
        },

        /**
         * Returns the amount of milliseconds remaining
         * @author Art <a.molcanovas@gmail.com>
         * @returns {number}
         */
        get msLeft() {
            var diff = this.diff;
            return diff < this.timeout ? (this.timeout - diff) % 1000 : 0;
        },

        /**
         * Returns the difference between timeStart and now, taking pause time into account
         * @author Art <a.molcanovas@gmail.com>
         * @returns {number}
         */
        get diff() {
            return new Date().getTime() - this.timeStart - this.msSincePause;
        },

        /**
         * Returns the amount of seconds remaining
         * @author Art <a.molcanovas@gmail.com>
         * @returns {number}
         */
        get secondsLeft() {
            var diff = this.diff;
            return diff < this.timeout ? floor(((this.timeout - diff) / 1000) % 60) : 0;
        },

        /**
         * Returns the amount of minutes remaining
         * @author Art <a.molcanovas@gmail.com>
         * @returns {number}
         */
        get minutesLeft() {
            var diff = this.diff;
            return diff < this.timeout ? floor(((this.timeout - diff) / 60000) % 60) : 0;
        },

        /**
         * Returns the amount of hours remaining
         * @author Art <a.molcanovas@gmail.com>
         * @returns {number}
         */
        get hoursLeft() {
            var diff = this.diff;
            return diff < this.timeout ? floor(((this.timeout - diff) / 3600000) % 24) : 0;
        },

        /**
         * Returns the amount of days remaining
         * @author Art <a.molcanovas@gmail.com>
         * @returns {number}
         */
        get daysLeft() {
            var diff = this.diff;
            return diff < this.timeout ? floor((this.timeout - diff) / 86400000) : 0;
        },

        /**
         * Returns a string representation of the amount of time remaining
         * @author Art <a.molcanovas@gmail.com>
         * @param {string[]} [timeChain=["days", "hours", "minutes", "seconds"]] Which units to include. Valid values
         * are "days", "hours", "minutes", "seconds", and "ms". With the default setting the output for 1 hour 53
         * minutes 11 seconds and 6 milliseconds would be 00:01:53:11.
         * @returns {string}
         */
        toString: function (timeChain) {
            timeChain = timeChain || TIME_CHAIN;
            var arr = [], tmp, i;

            for (i = 0; i < timeChain.length; i++) {
                tmp = this[timeChain[i] + "Left"];

                arr.push(tmp < 10 ? "0" + tmp : tmp);
            }

            return arr.join(":");
        }
    };

    return AloTimer;
})(Math.floor, Date, Error);

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = AloTimer;
}