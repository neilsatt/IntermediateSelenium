const {Browser, By, Key, until} = require("selenium-webdriver");

const url = "https://treehouse-projects.github.io/selenium-webdriver-intermediate/waits/app/index.html";

class RsvpPage {
    constructor(driver) {
        this.driver = driver;
        this.locators = {
            invitedList: By.id('invitedList'),
        }
    }

    open() {
        this.driver.get(url);
    }
}

module.exports = RsvpPage;
