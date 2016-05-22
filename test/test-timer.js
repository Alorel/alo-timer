var origWarn = console.warn,
    warnings = [],
    /** 18d 7h 3m 11s 79ms */
    TIME = 79 + 11000 + (60000 * 3) + (3600000 * 7) + (3600000 * 24 * 18);

console.warn = function (msg) {
    warnings.push(msg);
    origWarn.apply(console, [msg]);
};

it("Defined", function () {
    expect(AloTimer).toBeDefined();
});

describe("Adders", function () {
    var t;

    beforeEach(function () {
        t = new AloTimer(5);
    });

    it("ms", function () {
        expect(t.addMS(10) instanceof AloTimer).toBe(true);
        expect(t.timeout).toBe(15);
        expect(t.msLeft > 10).toBe(true);
        expect(t.secondsLeft).toBe(0);
        expect(t.minutesLeft).toBe(0);
        expect(t.hoursLeft).toBe(0);
        expect(t.daysLeft).toBe(0);
    });

    it("s", function () {
        expect(t.addSeconds(15) instanceof AloTimer).toBe(true);
        expect(t.timeout).toBe(15005);
        expect(t.msLeft > 0).toBe(true);
        expect(t.secondsLeft >= 14).toBe(true);
        expect(t.minutesLeft).toBe(0);
        expect(t.hoursLeft).toBe(0);
        expect(t.daysLeft).toBe(0);
    });

    it("m", function () {
        expect(t.addMinutes(15) instanceof AloTimer).toBe(true);
        expect(t.timeout).toBe(5 + (60000 * 15));
        expect(t.msLeft > 0).toBe(true);
        expect(t.secondsLeft === 0 || t.secondsLeft >= 58).toBe(true);
        expect(t.minutesLeft >= 14).toBe(true);
        expect(t.hoursLeft).toBe(0);
        expect(t.daysLeft).toBe(0);
    });

    it("h", function () {
        expect(t.addHours(15) instanceof AloTimer).toBe(true);
        expect(t.timeout).toBe(5 + (3600000 * 15));
        expect(t.msLeft > 0).toBe(true);
        expect(t.secondsLeft === 0 || t.secondsLeft >= 58).toBe(true);
        expect(t.minutesLeft === 0 || t.minutesLeft === 59).toBe(true);
        expect(t.hoursLeft >= 14).toBe(true);
        expect(t.daysLeft).toBe(0);
    });

    it("d", function () {
        expect(t.addDays(15) instanceof AloTimer).toBe(true);
        expect(t.timeout).toBe(5 + (3600000 * 24 * 15));
        expect(t.msLeft > 0).toBe(true);
        expect(t.secondsLeft === 0 || t.secondsLeft >= 58).toBe(true);
        expect(t.minutesLeft === 0 || t.minutesLeft === 59).toBe(true);
        expect(t.hoursLeft === 0 || t.hoursLeft === 23).toBe(true);
        expect(t.daysLeft >= 14).toBe(true);
    });
});

describe("Subbers", function () {
    var t;

    beforeEach(function () {
        t = new AloTimer(TIME);
    });

    it("ms", function () {
        expect(t.msLeft >= 70).toBe(true);
        expect(t.subMS(20) instanceof AloTimer).toBe(true);
        expect(t.msLeft <= 59).toBe(true);
    });

    it("s", function () {
        expect(t.secondsLeft).toBe(11);
        expect(t.subSeconds(1) instanceof AloTimer).toBe(true);
        expect(t.secondsLeft).toBe(10);
    });

    it("m", function () {
        expect(t.minutesLeft).toBe(3);
        expect(t.subMinutes(1) instanceof AloTimer).toBe(true);
        expect(t.minutesLeft).toBe(2);
    });

    it("h", function () {
        expect(t.hoursLeft).toBe(7);
        expect(t.subHours(1) instanceof AloTimer).toBe(true);
        expect(t.hoursLeft).toBe(6);
    });

    it("d", function () {
        expect(t.daysLeft).toBe(18);
        expect(t.subDays(1) instanceof AloTimer).toBe(true);
        expect(t.daysLeft).toBe(17);
    });
});

it("hasFinished & diff", function (done) {
    var t = new AloTimer(5);
    expect(t.hasFinished).toBe(false);
    setTimeout(function () {
        try {
            expect(t.hasFinished).toBe(true);
            expect(t.diff >= 6).toBe(true);
            ["ms", "seconds", "minutes", "hours", "days"].forEach(function (v) {
                expect(t[v + "Left"]).toBe(0);
            });
        } finally {
            done();
        }
    }, 6);
});

it(".timeout=", function () {
    var t = new AloTimer(500);
    t.timeout = 1000;
    expect(t.timeout).toBe(1000);

    expect(function () {
        t.timeout = "foo";
    }).toThrow(new Error("The timeout must be numeric!"));

    t = new AloTimer();
    expect(t.timeout).toBe(0);
});

describe("toString", function () {
    it("default", function () {
        expect((new AloTimer(TIME)).toString()).toBe("18:07:03:11");
    });

    it("custom", function () {
        expect((new AloTimer(TIME, ["minutes", "seconds"])).toString()).toBe("03:11");

        var t = parseInt((new AloTimer(TIME, ["ms"])).toString());
        expect(t > 70 && t <= 79).toBe(true);
    });
});

it("pause", function (done) {
    var t = new AloTimer(500);
    expect(t.pauseTime).toBe(false);
    expect(t.isPaused).toBe(false);
    expect(t.pause() instanceof AloTimer).toBe(true);
    expect(t.isPaused).toBe(true);
    expect(t.pauseTime.toString()).toBe(new Date().toString());

    t.pause();
    var idx = warnings.indexOf("The timer is already paused");

    expect(idx).not.toBe(-1);
    delete warnings[idx];

    setTimeout(function () {
        try {
            expect(t.msSincePause >= 100).toBe(true);
            expect(t.unpause() instanceof AloTimer).toBe(true);
            expect(t.msSincePause).toBe(0);
            expect(t.timeout >= 600).toBe(true);

            t.unpause();
            var idx = warnings.indexOf("The timer isn't paused");
            expect(idx).not.toBe(-1);
            delete warnings[idx];
        } finally {
            done();
        }
    }, 100);
});