import { save, send } from './utilities'
import { findJWT } from './jwt'
import type { JWT } from './jwt'

const isHttpOnly = (value: string) => {
  // case insensitive as per: https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.6
  return value.toLowerCase().includes('httponly')
}

const processHeader = (
  req: chrome.webRequest.ResourceRequest,
  header: chrome.webRequest.HttpHeader,
  match: string
) => {
  let name = header.name
  if (name.toLowerCase() === 'set-cookie' && header.value !== void 0) {
    const httpOnly = isHttpOnly(header.value)
    name += `; httpOnly=${httpOnly.toString()}`
  }
  const data: JWT = { value: match, url: req.url, type: 'H', name: name }
  console.log('JWT FOUND', data)
  save(data)
  send(data)
}

const onHeaderHandler = (
  req: chrome.webRequest.ResourceRequest,
  headers: chrome.webRequest.HttpHeader[]
) => {
  headers.forEach((header) => {
    if (header.value === void 0) {
      return
    }
    const matches = findJWT(header.value)
    for (const match of matches) {
      processHeader(req, header, match)
    }
  })
}

const onSendHeadersHandler = (
  req: chrome.webRequest.WebRequestHeadersDetails
) => {
  if (void 0 !== req.requestHeaders) {
    onHeaderHandler(req, req.requestHeaders)
  }
}

const onHeadersReceivedHandler = (
  req: chrome.webRequest.WebResponseHeadersDetails
) => {
  if (void 0 !== req.responseHeaders) {
    onHeaderHandler(req, req.responseHeaders)
  }
}

export { onSendHeadersHandler, onHeadersReceivedHandler }
