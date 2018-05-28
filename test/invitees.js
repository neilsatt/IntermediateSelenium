const {Browser, By, Key, until} = require("selenium-webdriver");
const {suite} = require("selenium-webdriver/testing");
const assert = require('assert');
// Load the RsvpPage class.
const RsvpPage = require('../pages/rsvp.js')

suite(function(env) {
    describe('RSVP site', async function() {
        let driver;
        // Define a variable to hold the page object here so that it stays in scope
        // for all our tests as well.
        let page;

        before(async function() {
            driver = await env.builder().build();
            // Create a new page object that will use our driver object.
            // Store it in the page variable.
            page = new RsvpPage(driver);
            // Instead of calling driver.get() ourselves, we'll let the page object
            // load the page for us.
            await page.open();
        });

        it('has invitee list', async function() {
            // Use the locator from the page object instead.
            let elements = await driver.findElements(page.locators.invitedList);
            assert(elements.length > 0);
        });

        it('has registration form', async function() {
            // Use the locator from the page object instead.
            let elements = await driver.findElements(page.locators.registrationForm);
            assert(elements.length > 0);
        });

        after(async function() {
            driver.quit();
        });
    });
});