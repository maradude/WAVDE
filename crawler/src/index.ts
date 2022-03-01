import puppeteer from 'puppeteer-core'
import path from 'path'
import { enableCxtDevMode, findCxtServiceWorker } from './turnOnCXT'
import { addLoggerToWorker } from './createLogFile'
import { visitSites } from './visitSites'
import { getSites } from './getSites'

/**
 * 10 seconds
 */
const TIMEOUT = 10000
/**
 * Location of benign-extension
 */
const pathToExtension = path.join(__dirname, '../../build')
/**
 * headless off due to chrome extension test (headless not allowed)
 *
 * load our extension and disable all others
 *
 * use canary as the minimum version of chrome we need is 100 about
 */
const browserOptions = {
  headless: false,
  args: [
    `--disable-extensions-except=${pathToExtension}`,
    `--load-extension=${pathToExtension}`,
  ],
  channel: 'chrome-canary' as puppeteer.ChromeReleaseChannel,
}
/**
 * path to a subset of majestic 1 million domains
 */
const majestic10k = path.join(__dirname, '../majestic_10k_domains_only.csv')
const sites = getSites(majestic10k)
if (!sites) {
  throw Error('Missing URLs list')
}

/**
 * Main
 */
;(async () => {
  const browser = await puppeteer.launch(browserOptions)
  await enableCxtDevMode(browser)
  const serviceWorker = await findCxtServiceWorker(browser)
  if (!serviceWorker) {
    await browser.close()
    throw Error('Service worker not found')
  }
  addLoggerToWorker(serviceWorker)

  const page = await browser.newPage()
  await visitSites(page, sites, TIMEOUT)

  await browser.close()
})()
