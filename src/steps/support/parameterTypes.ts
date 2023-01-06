import { defineParameterType } from "@cucumber/cucumber";

/**
 * Defines a {isNegative} cucumebr type that is used inside steps alongside with {string}, {word} etc.
 * Used with a ternary operator to execute specific step code depending on the {isNegative} status (true|false).
 */
defineParameterType({
    regexp: /should be|should not be|to be|not to be|is|is not|are|are not|has|has not/,
    transformer: value => value.includes("not"),
    name: "isNegative",
});

/**
 * Defines a {toggleState} cucumebr type that is used inside steps alongside with {string}, {word} etc.
 * Used with a ternary operator to execute specific step code depending on the {toggleState} status (true|false).
 */
defineParameterType({
    regexp: /on|off/,
    transformer: value => value === "on",
    name: "toggleState",
});
