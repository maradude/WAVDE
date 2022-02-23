import { onHeadersReceivedHandler, onSendHeadersHandler } from './headerHandler'
import onBeforeRequestHandler from './requestHandler'

chrome.alarms.create({ periodInMinutes: 1 })

chrome.alarms.onAlarm.addListener((params) => {
  console.log(params)
  let text: string
  try {
    const dt = new Date(params.scheduledTime) // format example: 1645462419031.02
    text = `${dt.getHours()}${dt.getMinutes()}`
  } catch {
    text = 'err'
    console.error('issue with getting badge time: ', params)
  }
  chrome.action.setBadgeText({ text })
})
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
