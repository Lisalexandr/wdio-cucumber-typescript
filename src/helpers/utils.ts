import { TypePseudoElement } from "./types";

/**
 * Returns pseudo-random string.
 * String consist of a static prefix and a dynamic part, based on current time in milliseconds
 * @param {String} prefix (optional) - optional prefix for randomly generated string
 * @returns {String} randomly generated string, f.e. "test_1668081645436"
 */
export const randomDataFromDate = (prefix?: string): string => `${prefix}${new Date().getTime()}`;

/**
 * Utility function to execute Javascript in a browser.
 * @param {String} command - code that should be executed in browser.
 * @returns {*}
 */
export const browserExecutor = async (command: string): Promise<any> =>
    await browser.execute((cmd: string) => eval(cmd), command);

/**
 * Gets the content of pseudo-element.
 * @param {String} element Locator of element
 * @param {TypePseudoElement} typePseudoElement Type of pseudo element
 * @return {String} The value of property 'content'
 */
export async function getPseudoElementContent(
    element: string,
    typePseudoElement: TypePseudoElement,
): Promise<string> {
    const text: string = await browserExecutor(
        `window.getComputedStyle(document.querySelector('${element}'),'::${typePseudoElement}').getPropertyValue('content')`
    );
    return text;
}
