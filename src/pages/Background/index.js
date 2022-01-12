import { onHeadersReceivedHandler, onSendHeadersHandler } from './headerHandler'
import onBeforeRequestHandler from './requestHandler'

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
