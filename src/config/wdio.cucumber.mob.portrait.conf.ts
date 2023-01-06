import { config as defaultConfig } from './wdio.cucumber.mob.landscape.conf'

const configOverride = {
  capabilities: [
    { // Iphone X - iOS 11 Portrait
      exclude: [
      ],
      browserName: 'chrome',
      'goog:chromeOptions': {
        'excludeSwitches': ['enable-automation'],
        args: [
          // '--headless',
          '--no-sandbox',
          '--disable-infobars',
          '--disable-dev-shm-usage',
        ],
        mobileEmulation: {
          deviceMetrics: {
            width: 375,
            height: 812,
            pixelRatio: 3,
          },
          userAgent:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/97.0.4692.98 Mobile/15E148 Safari/604.1',
        },
      },
      "goog:loggingPrefs": {
        browser: "ALL",
      },
    },
  ],
}
export const config = { ...defaultConfig, ...configOverride }
