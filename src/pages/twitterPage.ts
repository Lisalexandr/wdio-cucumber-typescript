import { WebElement } from "../helpers/types";

const navigationPanel = `header nav `;

export const twitterPage = {
    twitterLogo: (): WebElement => $(`h1 > a svg`),
    searchInput: (): WebElement => $(`input[aria-activedescendant]`),
    settingsMenu: (): WebElement => $(`${navigationPanel}a[href*=settings]`),
    settingsToggle: (): WebElement => $(`input[role="switch"]`),
} as const;

export async function exampleFunction(value: number | string) {
    return <WebElement>$(`[test-selector-${value}]`);
}
