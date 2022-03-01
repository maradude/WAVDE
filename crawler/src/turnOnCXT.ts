import puppeteer from 'puppeteer-core'

export async function findCxtServiceWorker(browser: puppeteer.Browser) {
  const targets = await browser.targets()
  const serviceWorkerTarget = targets.find(
    (target) => target.type() === 'service_worker'
  )
  return await serviceWorkerTarget?.worker()
}
/**
 * Enable browser dev-mode for extensions.
 *
 * credit to: https://github.com/puppeteer/puppeteer/issues/5095#issuecomment-590292518
 * @param browserInstance
 * @returns Promise<void>
 */
export async function enableCxtDevMode(browserInstance: puppeteer.Browser) {
  const [chromeExtenstionsTab] = await browserInstance.pages()
  await chromeExtenstionsTab.goto('chrome://extensions')
  await chromeExtenstionsTab.waitForTimeout(100)
  const devModeToggle =
    await chromeExtenstionsTab.evaluateHandle<puppeteer.ElementHandle>(
      'document.querySelector("body > extensions-manager").shadowRoot.querySelector("extensions-toolbar").shadowRoot.querySelector("#devMode")'
    )
  return devModeToggle.click()
}
