const {Browser, By, Key, until} = require("selenium-webdriver");
const {suite} = require("selenium-webdriver/testing");
const assert = require('assert');
const ExamplePage = require('../pages/example.js');

suite(function(env) {
    describe('Radio buttons', function() {
        let driver;
        let page;

        before(async function() {
            driver = await env.builder().build();
            page = new ExamplePage(driver);
            await page.open();
        });

        it('update status text', async function() {
            await page.clickRadioButton('radio2');
            await page.submit();
            let results = await driver.findElement(page.locators.formResults);
            let text = await results.getText();
            assert(text.includes("radio2"));
        });

        after(async function() {
            driver.quit();
        });
    });
});
