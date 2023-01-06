import { config as defaultConfig } from '../../src/config/wdio.conf'

const configOverride = {
  specs: ['./src/features/screen/desktop/**/*.feature'],
  suites: {
    all: ['./src/features/screen/desktop/**/*.feature'],
  },
  maxInstances: 3,
  specFileRetries: 2,
  capabilities: [
    {
      maxInstances: 3,
      browserName: 'chrome',
      'goog:chromeOptions': {
        'excludeSwitches': ['enable-automation'],
        args: [
          // '--headless',
          '--no-sandbox',
          '--disable-infobars',
          '--mute-audio',
          '--window-size=1280,720',
          '--disable-dev-shm-usage',
          '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
        ],
      },
      "goog:loggingPrefs": {
        browser: "ALL",
      },
    },
  ],
}
export const config = { ...defaultConfig, ...configOverride }
