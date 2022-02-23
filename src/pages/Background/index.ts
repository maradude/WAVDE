import { alarmHandler } from './alarmHandler'
import { commandHandler } from './commandHandler'
import { onHeadersReceivedHandler, onSendHeadersHandler } from './headerHandler'
import onBeforeRequestHandler from './requestHandler'

chrome.alarms.create({ periodInMinutes: 1 })
chrome.alarms.onAlarm.addListener(alarmHandler)

chrome.commands.onCommand.addListener(commandHandler)

const networkFilters = {
  urls: ['<all_urls>'],
}

chrome.webRequest.onHeadersReceived.addListener(
  onHeadersReceivedHandler,
  networkFilters,
  ['responseHeaders', 'extraHeaders']
)

chrome.webRequest.onSendHeaders.addListener(
  onSendHeadersHandler,
  networkFilters,
  ['requestHeaders', 'extraHeaders']
)

chrome.webRequest.onBeforeRequest.addListener(
  onBeforeRequestHandler,
  networkFilters,
  ['requestBody']
)
