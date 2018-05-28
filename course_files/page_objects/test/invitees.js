const {Browser, By, Key, until} = require("selenium-webdriver");
const {suite} = require("selenium-webdriver/testing");
const assert = require('assert');
const RsvpPage = require('../pages/rsvp.js');

suite(function(env) {
    describe('RSVP site', function() {
        let driver;
        let page;

        before(async function() {
            driver = await env.builder().build();
            page = new RsvpPage(driver);
            await page.open();
        });

        it('has invitee list', async function() {
            let elements = await driver.findElements(page.locators.invitedList);
            assert(elements.length > 0);
        });

        after(async function() {
            driver.quit();
        });
    });
});
