import type { Options } from '@wdio/types'
import * as messages from "@cucumber/messages";
import { Frameworks } from "@wdio/types";

export const config: Options.Testrunner = {
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: './tsconfig.json'
    }
  },
  specs: ['./src/features/test.feature'],
  // specs: ['./src/features/*/*/**/*.feature'],
  exclude: [],
  maxInstances: 5,
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--no-sandbox',
          '--use-gl=egl',
          '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
        ],
      },
    },
  ],
  logLevel: 'silent',
  bail: 0,
  baseUrl: 'http://twitter.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: [
    'chromedriver',
    'shared-store',
    ['image-comparison',
      {
        baselineFolder: 'src/screenshots/baseline/',
        formatImageName: '{tag}-{logName}-{width}x{height}',
        screenshotPath: 'src/screenshots/',
        savePerInstance: true,
        autoSaveBaseline: true,
      }],
  ],
  framework: 'cucumber',
  specFileRetries: 2,
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: './allure-results',
        disableWebdriverScreenshotsReporting: false,
        disableWebdriverStepsReporting: true,
        useCucumberStepReporter: true,
      },
    ],
  ],
  cucumberOpts: {
    require: ['./src/steps/**/*.ts'],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: true,
    snippets: true,
    source: true,
    strict: true,
    timeout: 60000,
    snippetSyntax: undefined,
    ignoreUndefinedDefinitions: false,
    failAmbiguousDefinitions: true,
    scenarioLevelReporter: false,
    order: 'defined',
    tagsInTitle: false,
  },
  afterStep: async function (
    _step: messages.PickleStep,
    _scenario: messages.Pickle,
    result: Frameworks.PickleResult,
  ) {
    if (result.error) {
      await browser.takeScreenshot();
      // display browser logs in CI (use only for debug reasons)
      // console.log(await browser.getLogs('browser'));
    }
  },
}

export const gameLoadTimeout = 90000;
/**
 * Path configuration for the mock files
 *
 * examples:
 * 1. Path to the file with game mocks can be configured by providing relative path configuration.
 *
 * mockConfig: {[key: string]: string } = {
 *     gamePath: `${__dirname}/../data`, // -> yourProject/src/config/../data
 * };
 *
 * By default, game mocks will be read from game.json file so the one just need to specify relative path from configuration file.
 * If the one would like to keep mocks in different directory then path can be specified accordingly:
 *
 * projectDir
 * ├── src
 * │   └── config
 * │   └── mocks
 * │       └── game.json
 *
 * gamePath: `${__dirname}/../mocks`,
 *
 * mockConfig: {[key: string]: string } = {
 *     gamePath: `${__dirname}/../mocks`,
 * };
 *
 * 2. Common configs will be taken from the framework directory.
 * However, if it's necessary to use common files from your project the one can specify commonPath property and specify relative path to common mocks.
 *
 * projectDir
 * ├── src
 * │   └── config
 * │   └── mocks
 * │       └── game.json
 * │       └── jas.json
 * │       └── platform.json
 *
 * mockConfig: {[key: string]: string } = {
 *     gamePath: `${__dirname}/../mocks`,
 *     commonPath: `${__dirname}/../mocks`,
 * };
 *
 */
export const mockConfig: { [key: string]: string } = {
  gamePath: `${__dirname}/../data`,
};
