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

        it('loads existing invitations', async function() {
            // Instead of looking for a particular invitee list item, let's find the
            // whole invited list and ensure it contains the name of the invitee
            // we're looking for. This element should get found as soon as the page
            // loads, because it's present even before the AJAX request completes.
            let list = await driver.findElement(page.locators.invitedList);
            // Now we need to wait for that AJAX call. We'll do that with an explicit
            // wait. We make a call to the driver.wait() method.
            // We need to give the wait() method the conditions that will cause it
            // to stop waiting. Remember, up at the top of this file, we require
            // the "until" object. That object has a method called elementLocated()
            // that will stop the wait as soon as the specified locator is present
            // in the document. So we'll have it look for our "invitees" locator,
            // which will only be present after the AJAX request completes successfully.
            await driver.wait(
                until.elementLocated(page.locators.invitees)
            );
            // Once the explicit wait is resolved, we can be confident our invitees
            // have been loaded into the page. If we get all the text from our list
            // element, it should include the name of the invitee we're looking for.
            let text = await list.getText();
            // We end our test by asserting that the text includes the name.
            assert(text.includes("Craig Dennis"));
        });

        after(async function() {
            driver.quit();
        });
    });
});