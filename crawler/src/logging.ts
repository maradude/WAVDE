import { Console } from 'console'
import fs from 'fs'
import puppeteer from 'puppeteer-core'
import path from 'path'

const log = createLogger()

function ISOnow() {
  const date = new Date()
  return date.toISOString()
}

export function extLog(msg: string) {
  const prefix = `${ISOnow()} - [Message from CRX]: `
  log.debug(prefix + msg)
}

export function crawlLog(msg: string) {
  const prefix = `${ISOnow()} - [Message from crawler]: `
  log.debug(prefix + msg)
}

export function crawlErr(msg: string) {
  const prefix = `${ISOnow()} - [Error from crawler]: `
  log.error(prefix + msg)
}

function createLogger() {
  const now = new Date()
  const logFile = path.join(
    __dirname,
    '../logs/',
    `${now.toISOString()}__crawler.log`
  )
  const errLogFile = path.join(
    __dirname,
    '../logs/',
    `${now.toISOString()}__crawlerERRS.log`
  )
  return new Console({
    stdout: fs.createWriteStream(logFile),
    stderr: fs.createWriteStream(errLogFile),
  })
}
/**
 * Save webWorker console output to a file
 * @param worker
 * @returns this
 */
export async function addLoggerToWorker(worker: puppeteer.WebWorker) {
  extLog('***start***')
  worker.on('console', (message: puppeteer.ConsoleMessage) =>
    extLog(message.text())
  )
  await worker.evaluate(() => console.log('does this work?'))
  extLog(await worker.url())
  return
}
