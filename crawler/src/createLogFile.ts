import { Console } from 'console'
import fs from 'fs'
import puppeteer from 'puppeteer-core'
import path from 'path'

function createLogFile(filename: string) {
  return new Console({
    stdout: fs.createWriteStream(filename),
  })
}
/**
 * Save webWorker console output to a file
 * @param worker
 * @returns this
 */
export function addLoggerToWorker(worker: puppeteer.WebWorker) {
  const now = new Date()
  const logFile = path.join(
    __dirname,
    '../logs/',
    `${now.toISOString()}__crawler.log`
  )
  const myLogger = createLogFile(logFile)
  return worker.on('console', (message: puppeteer.ConsoleMessage) =>
    myLogger.log(message.text())
  )
}
