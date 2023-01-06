import { config as defaultConfig } from '../../src/config/wdio.conf'

const configOverride = {
  specs: ['./src/features/**/*.feature'],
  suites: {
    all: ['./src/features/**/*.feature'],
  },
  maxInstances: 2,
  specFileRetries: 2,
  capabilities: [
    {
      maxInstances: 2,
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          // '--headless',
          '--disable-dev-shm-usage',
          '--no-sandbox',
          '--mute-audio',
          '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
        ],
      },
      "goog:loggingPrefs": {
        browser: "ALL",
      },
    },
  ],
}
export const config = { ...defaultConfig, ...configOverride }
