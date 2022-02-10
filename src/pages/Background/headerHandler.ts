import { findJWT, saveJWT } from './jwt'
import { findInsecureCookies, saveInsecureCookie } from './insecureCookies'

const isSetCookies = (headerName: string) => {
  return headerName.toLowerCase() === 'set-cookie'
}

const searchForSecurityTagsMissing = (
  res: chrome.webRequest.WebResponseHeadersDetails,
  headerName: string,
  headerValue: string
) => {
  if (!isSetCookies(headerName) || headerValue === undefined) {
    return
  }
  const missingTags = findInsecureCookies(headerValue)
  if (missingTags.length === 0) {
    return
  }
  saveInsecureCookie(res, headerName, headerValue, missingTags)
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
    searchForSecurityTagsMissing(req, header.name, header.value)
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
