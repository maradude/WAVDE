import puppeteer from 'puppeteer-core'

export async function visitSites(
  page: puppeteer.Page,
  sites: string[],
  siteTimeout: number
) {
  for (const url of sites) {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: siteTimeout })
  }
}
