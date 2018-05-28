const {Browser, By, Key, until} = require("selenium-webdriver");
const {suite} = require("selenium-webdriver/testing");
const assert = require('assert');

suite(function(env) {
    describe('RSVP site', function() {
        it('has invitee list', function() {
            assert(1 === 2);
        });
    });
});