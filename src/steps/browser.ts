import { Given, Then, When } from "@cucumber/cucumber";

// ------------------------------- BROWSER STEPS ------------------------------

Given("open {string} URL", async function (url: string) {
    await browser.url(url);
});

Given("switch to a {string} window", async function (text: string) {
    await browser.call(async () => await browser.switchWindow(text));
});

When("wait {int} milliseconds", async (timeout: number) => {
    await browser.pause(timeout);
});

When("the user reloads page", async () => {
    await browser.refresh();
});

When("the user press {string} key", async function (key: string) {
    await browser.keys(key);
});

Then("the user is navigated to {string} page", async (value: string) => {
    await expect(browser).toHaveUrlContaining(value);
});

Then("the page title is {string}", async function (title: string) {
    await expect(browser).toHaveTitle(`${title}`);
});
