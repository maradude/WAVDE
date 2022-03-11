import puppeteer from 'puppeteer-core'
import { crawlLog, crawlErr } from './logging'

export async function visitSites(
  page: puppeteer.Page,
  sites: string[],
  siteTimeout: number
) {
  for (const url of sites) {
    try {
      crawlLog(url)
      await page.goto(url, { waitUntil: 'networkidle0', timeout: siteTimeout })
    } catch (e) {
      console.warn(`Error with: ${url} - `, e)
      crawlErr(`${url} -- ${e}`)
    }
  }
}
