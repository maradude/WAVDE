import { findJWT, saveJWT } from './jwt'

const isHttpOnly = (value: string) => {
  // case insensitive as per: https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.6
  return value.toLowerCase().includes('httponly')
}

const searchJWTInHeader = (
  req: chrome.webRequest.ResourceRequest,
  headerName: string,
  headerValue: string
) => {
  const matches = findJWT(headerValue)
  for (const match of matches) {
    saveJWT(req, match, headerName, 'H')
  }
}

const onHeaderHandler = (
  req: chrome.webRequest.ResourceRequest,
  headers: chrome.webRequest.HttpHeader[]
) => {
  headers.forEach((header) => {
    if (header.value === undefined) {
      return
    }
    searchJWTInHeader(req, header.name, header.value)
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
