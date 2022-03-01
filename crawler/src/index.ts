import puppeteer from 'puppeteer-core'
import path from 'path'
;(async () => {
  const pathToExtension = path.join(__dirname, '../../build')
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ],
    channel: 'chrome-canary',
  })
  const targets = await browser.targets()
  const backgroundPageTarget = targets.find(
    (target) => target.type() === 'background_page'
  )
  const backgroundPage = await backgroundPageTarget?.page()
  // Test the background page as you would any other page.
  await browser.close()
})()
