@screenshots
Feature: Twitter basic screenshot tests

    Background:
        Given open "https://twitter.com/" URL
        * the user waits for "searchInput" to be displayed

    Scenario: Verify a screenshot of the twitter logo
        When "twitterLogo" is displayed
        Then compare "twitterLogo" element screenshot "LogoMain" equals baseline

    Scenario: Verify a full page screenshot of the Settings page
        When "settingsMenu" is clickable
        * the user clicks "settingsMenu"
        * the user is navigated to "settings/account/personalization" page
        Then compare full page screenshot "SettingsScreen" equals baseline
