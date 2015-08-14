/**
 * Creates the timer
 * @author Art <a.molcanovas@gmail.com>
 * @param {number} timeout How many miliseconds to have the timeout for
 * @constructor
 */
function AloTimer(timeout) {
   /**
    * How long the timeout is set for
    * @type {number}
    */
   this.timeout = timeout;

   /**
    * When the timeout started
    * @type {number}
    */
   this.timeStart = new Date().getTime();

   /**
    * When the timer was paused
    * @type {Date}
    */
   this.pauseTime = false;
}

AloTimer.prototype = {
   /**
    * Methods to call for toString()
    * @type {string[]}
    */
   timeChain: ['Days', 'Hours', 'Minutes', 'Seconds'],

   /**
    * Adds miliseconds to the timer
    * @author Art <a.molcanovas@gmail.com>
    * @param val The amount to add
    * @returns {AloTimer}
    */
   addMS: function(val) {
      this.timeout += val;
      return this;
   },

   /**
    * Pauses the timer
    * @author Art <a.molcanovas@gmail.com>
    * @returns {AloTimer}
    */
   pause: function() {
      if(this.isPaused()) {
         throw new Error("The timer is already paused");
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
   isPaused: function() {
      return this.pauseTime instanceof Date;
   },

   /**
    * Unpauses the timer
    * @author Art <a.molcanovas@gmail.com>
    * @returns {AloTimer}
    */
   unpause: function() {
      if(!this.isPaused()) {
         throw new Error("The timer isn't paused");
      } else {
         this.addMS(this.msSincePause());
         this.pauseTime = false;
      }
      return this;
   },

   /**
    * Returns the number of miliseconds that have passed since the timer was paused
    * @author Art <a.molcanovas@gmail.com>
    * @returns {number}
    */
   msSincePause: function() {
      if(this.isPaused()) {
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
   addSeconds: function(val) {
      this.timeout += val * 1000;
      return this;
   },

   /**
    * Adds minutes to the timer
    * @author Art <a.molcanovas@gmail.com>
    * @param val The amount to add
    * @returns {AloTimer}
    */
   addMinutes: function(val) {
      this.timeout += val * 60000;
      return this;
   },

   /**
    * Adds hours to the timer
    * @author Art <a.molcanovas@gmail.com>
    * @param val The amount to add
    * @returns {AloTimer}
    */
   addHours: function(val) {
      this.timeout += val * 3600000;
      return this;
   },

   /**
    * Adds days to the timer
    * @author Art <a.molcanovas@gmail.com>
    * @param val The amount to add
    * @returns {AloTimer}
    */
   addDays: function(val) {
      this.timeout += val * 86400000;
      return this;
   },

   /**
    * Subtracts miliseconds from the timer
    * @author Art <a.molcanovas@gmail.com>
    * @param val The amount to add
    * @returns {AloTimer}
    */
   subMS: function(val) {
      this.timeout -= val;
      return this;
   },

   /**
    * Subtracts seconds from the timer
    * @author Art <a.molcanovas@gmail.com>
    * @param val The amount to add
    * @returns {AloTimer}
    */
   subSeconds: function(val) {
      this.timeout -= val * 1000;
      return this;
   },

   /**
    * Subtracts minutes from the timer
    * @author Art <a.molcanovas@gmail.com>
    * @param val The amount to add
    * @returns {AloTimer}
    */
   subMinutes: function(val) {
      this.timeout -= val * 60000;
      return this;
   },

   /**
    * Subtracts hours from the timer
    * @author Art <a.molcanovas@gmail.com>
    * @param val The amount to add
    * @returns {AloTimer}
    */
   subHours: function(val) {
      this.timeout -= val * 3600000;
      return this;
   },

   /**
    * Subtracts days from the timer
    * @author Art <a.molcanovas@gmail.com>
    * @param val The amount to add
    * @returns {AloTimer}
    */
   subDays: function(val) {
      this.timeout -= val * 86400000;
      return this;
   },

   /**
    * Checks whether the timeout has finished
    * @author Art <a.molcanovas@gmail.com>
    * @returns {boolean}
    */
   isFinished: function() {
      return (new Date().getTime() - this.timeStart) >= this.timeout;
   },

   /**
    * Returns the amount of miliseconds remaining
    * @author Art <a.molcanovas@gmail.com>
    * @returns {number}
    */
   getMSLeft: function() {
      var diff = this.diff();
      return diff < this.timeout ? (this.timeout - diff) % 1000 : 0;
   },

   /**
    * Returns the difference between timeStart and now, taking pause time into account
    * @author Art <a.molcanovas@gmail.com>
    * @returns {number}
    */
   diff: function() {
      return new Date().getTime() - this.timeStart - this.msSincePause();
   },

   /**
    * Returns the amount of seconds remaining
    * @author Art <a.molcanovas@gmail.com>
    * @returns {number}
    */
   getSecondsLeft: function() {
      var diff = this.diff();
      return diff < this.timeout ? Math.floor(((this.timeout - diff) / 1000) % 60) : 0;
   },

   /**
    * Returns the amount of minutes remaining
    * @author Art <a.molcanovas@gmail.com>
    * @returns {number}
    */
   getMinutesLeft: function() {
      var diff = this.diff();
      return diff < this.timeout ? Math.floor(((this.timeout - diff) / 60000) % 60) : 0;
   },

   /**
    * Returns the amount of hours remaining
    * @author Art <a.molcanovas@gmail.com>
    * @returns {number}
    */
   getHoursLeft: function() {
      var diff = this.diff();
      return diff < this.timeout ? Math.floor(((this.timeout - diff) / 3600000) % 24) : 0;
   },

   /**
    * Returns the amount of days remaining
    * @author Art <a.molcanovas@gmail.com>
    * @returns {number}
    */
   getDaysLeft: function() {
      var diff = this.diff();
      return diff < this.timeout ? Math.floor((this.timeout - diff) / 86400000) : 0;
   },

   /**
    * Returns a string representation of the amount of time remaining (DD:HH:mm:ss)
    * @author Art <a.molcanovas@gmail.com>
    * @returns {string}
    */
   toString: function() {
      var arr = [], i;

      for(i = 0; i < this.timeChain.length; i++) {
         arr.push(this["get" + this.timeChain[i] + "Left"]());
      }

      for(i = 0; i < arr.length; i++) {
         if(arr[i] < 10) {
            arr[i] = "0" + arr[i];
         }
      }

      return arr.join(":");
   }
};
