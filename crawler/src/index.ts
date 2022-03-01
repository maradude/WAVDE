import puppeteer from 'puppeteer-core'
import path from 'path'
import { enableCxtDevMode, findCxtServiceWorker } from './turnOnCXT'
import { addLoggerToWorker } from './createLogFile'
import { visitSites } from './visitSites'
import { getSites } from './getSites'

const TIMEOUT = 10000
const majestic10k = path.join(__dirname, '../majestic_10k_domains_only.csv')
const sites = getSites(majestic10k)
if (!sites) {
  throw Error('Missing URLs list')
}
// main
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
  await enableCxtDevMode(browser)
  const serviceWorker = await findCxtServiceWorker(browser)
  if (!serviceWorker) {
    await browser.close()
    throw Error('Service worker not found')
  }
  /**
   * 10 seconds
   */
  // Test the background page as you would any other page.
  addLoggerToWorker(serviceWorker)

  const page = await browser.newPage()
  await visitSites(page, sites, TIMEOUT)

  await browser.close()
})()
