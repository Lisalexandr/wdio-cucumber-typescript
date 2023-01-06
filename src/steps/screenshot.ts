import { Then, When } from "@cucumber/cucumber";
import { twitterPage } from "../pages/twitterPage";
import * as mobileScreenConfig from "../config/wdio.cucumber.mob.portrait.conf";

// =========================== SCREENSHOT STEPS ===============================

When("save {string} element screenshot as {string}",
    async (element: keyof typeof twitterPage, screenshotName: string) => {
        await browser.saveElement(await twitterPage[element](), `${screenshotName}`, {});
});

When("save full page screenshot as {string}", async (screenshotName: string) => {
    await browser.saveFullPageScreen(`${screenshotName}`, {});
});

// -------------------------------  ASSERTS -----------------------------------

Then("compare full page screenshot {string} equals baseline", async (screenshotName: string) => {
    const imageDIff = await browser.checkFullPageScreen(`${screenshotName}`, {});
    await expect(imageDIff).toEqual(0);
});

Then("compare {string} element screenshot {string} equals baseline", async (
    element: keyof typeof twitterPage, screenshotName: string) => {
    browser.pause(1000);
    const imageDIff  = await browser.checkElement(await twitterPage[element](), `${screenshotName}`, {});
    await expect(imageDIff).toEqual(0);
});

Then("compare {string} element screenshot {string} equals baseline area", async (
    element: keyof typeof twitterPage, screenshotName: string) => {
    const imageDIff = await browser.checkElement(await twitterPage[element](), `${screenshotName}`, {
        blockOut: [{
            height:
                mobileScreenConfig.config.capabilities[0]["goog:chromeOptions"].mobileEmulation.deviceMetrics.height / 2,
            width:
                mobileScreenConfig.config.capabilities[0]["goog:chromeOptions"].mobileEmulation.deviceMetrics.width,
            x: 0,
            y: 0,
        }],
        ignoreAlpha: true,
        blockOutStatusBar: true,
    });
    await expect(imageDIff).toEqual(0);
});
