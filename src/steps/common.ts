import { Given, Then, When } from "@cucumber/cucumber";
import { config } from "../config/wdio.conf";
import { twitterPage } from "../pages/twitterPage";
// import "@wdio/shared-store-service";

const TIMEOUT = config.cucumberOpts?.timeout;

// ----------------------------- PAGE INTERACTIONS ----------------------------


When("the user clicks {string}", async function (element: keyof typeof twitterPage) {
    const locator = await twitterPage[element]();
    await locator.click();
});

When("the user moves mouse to {string}", async function (element: keyof typeof twitterPage) {
    const locator = await twitterPage[element]();
    await locator.moveTo();
});

When("the user scrolls {string} into view", async (element: keyof typeof twitterPage) => {
    const locator = await twitterPage[element]();
    await locator.scrollIntoView();
});

When("the user clicks and holds {string}", async (element: string) => {
    const locator = await twitterPage[element]();
    await browser.performActions([{
        type: "pointer",
        id: "mouse1",
        parameters: { pointerType: "mouse" },
        actions: [
            { type: "pointerMove", origin: locator, x: 0, y: 0 },
            { type: "pointerDown", button: 0 },
            { type: "pause", duration: 1000 },
            { type: "pointerUp", button: 0 },
        ],
    }]).then(() => browser.releaseActions());
});

// ------------------------------- WAITERS ------------------------------------

When("the user waits for {string} {isNegative} displayed", async (
    element: keyof typeof twitterPage, isNegative: boolean) => {
    isNegative
        ? await expect(twitterPage[element]()).not.toBeDisplayed({ wait: TIMEOUT })
        : await expect(twitterPage[element]()).toBeDisplayed({ wait: TIMEOUT });
});

When("the user waits for {string} to have text {string}", async (
    element: keyof typeof twitterPage, value: string) => {
    await expect(twitterPage[element]()).toHaveText(value, {
        message: `Element '${element}' value is incorrect`,
    });
});

// ------------------------------- ASSERTS ------------------------------------


Then("{string} {isNegative} displayed", async (element: keyof typeof twitterPage, isNegative: boolean) => {
    isNegative
        ? await expect(twitterPage[element]()).not.toBeDisplayed()
        : await expect(twitterPage[element]()).toBeDisplayed();
});

Then("{string} {isNegative} visible", async (element: keyof typeof twitterPage, isNegative: boolean) => {
    isNegative
        ? await expect(twitterPage[element]()).not.toBeDisplayedInViewport()
        : await expect(twitterPage[element]()).toBeDisplayedInViewport();
});

Then("{string} {isNegative} clickable", async (element: keyof typeof twitterPage, isNegative: boolean) => {
    isNegative
        ? await expect(twitterPage[element]()).not.toBeClickable()
        : await expect(twitterPage[element]()).toBeClickable();
});

Then("{string} {isNegative} enabled", async (element: keyof typeof twitterPage, isNegative: boolean) => {
    isNegative
        ? await expect(twitterPage[element]()).not.toBeEnabled()
        : await expect(twitterPage[element]()).toBeEnabled();
});

Then("{string} {isNegative} disabled", async (element: keyof typeof twitterPage, isNegative: boolean) => {
    await expect(twitterPage[element]()).toBeDisplayedInViewport();
    isNegative
        ? await expect(twitterPage[element]()).not.toHaveAttribute("disabled")
        : await expect(twitterPage[element]()).toHaveAttribute("disabled");
});

Then("{string} text {isNegative} {string}", async (element: keyof typeof twitterPage, isNegative: boolean, text: string) => {
    await expect(twitterPage[element]()).toBeDisplayedInViewport();
    isNegative
        ? await expect(twitterPage[element]()).not.toHaveText(text, { ignoreCase: true })
        : await expect(twitterPage[element]()).toHaveText(text, { ignoreCase: true });
});

Then("{string} {isNegative} contains text {string}", async (element: keyof typeof twitterPage, isNegative: boolean, text: string) => {
    isNegative
        ? await expect(twitterPage[element]()).not.toHaveTextContaining(text, { ignoreCase: true })
        : await expect(twitterPage[element]()).toHaveTextContaining(text, { ignoreCase: true });
});


Then("{string} value {isNegative} {string}", async (element: keyof typeof twitterPage, isNegative: boolean, value: string) => {
    isNegative
        ? await expect(twitterPage[element]()).not.toHaveValue(value)
        : await expect(twitterPage[element]()).toHaveValue(value);
});
