import { alarmHandler } from './alarmHandler'
import { onHeadersReceivedHandler, onSendHeadersHandler } from './headerHandler'
import onBeforeRequestHandler from './requestHandler'
import onCompletionHandler from './completionHandler'

chrome.alarms.create({ periodInMinutes: 1 })
chrome.alarms.onAlarm.addListener(alarmHandler)

const networkFilters = {
  urls: ['<all_urls>'],
}

const completionFilters: chrome.webRequest.RequestFilter = {
  ...networkFilters,
  types: ['main_frame'],
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

chrome.webRequest.onCompleted.addListener(
  onCompletionHandler,
  completionFilters
)
