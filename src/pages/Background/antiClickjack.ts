/**
 * Were trying to check if a response with an html document has appropriate anti-clickjack headers
 */
/*
Content-Security-Policy: frame-ancestors 'none' | 'self'
Content-Security-Policy: frame-ancestors 'none' | 'self' <custom allowed URL>

X-Frame-Options: Deny | SAMESITE

<meta>-tag not allowed

value that prevent embedding the document
as a iframe on 3rd party websites

CWE-1021: Improper Restriction of Rendered UI Layers or Frames
WASC-15: Application Misconfiguration
NOTE: All CSP directives are case-insensitive and most values are also (only casesensitive: paths on URIs & nonces)

TODO: xframeOptions
- check if multiple occurences of same header ???
- check XFO not defined by a META tag
*/

import { BaseWarning, storageKey } from './utilities'
import { saveToLocalStorage, send } from './record'

const findCSP = (headers: chrome.webRequest.HttpHeader[]) => {
  return headers.find(
    (header) => header.name.toLowerCase() === 'content-security-policy'
  )
}

const hasFrameAncestor = (headerValue: Lowercase<string>) => {
  return headerValue.toLowerCase().includes('frame-ancestor')
}
const findXFO = (headers: chrome.webRequest.HttpHeader[]) => {
  return headers.filter(
    (header) => header.name.toLowerCase() === 'x-frame-options'
  )
}

const ValidXFOValues = new Set(['sameorigin', 'deny'])

export const checkAntiClickjack = (
  res: chrome.webRequest.WebResponseHeadersDetails
): AntiClickjackError | undefined => {
  // TODO: report to user if header found but misconfigured
  if (res.responseHeaders === undefined) {
    return 'Neither CSP: frame-ancestor or XFO found'
  }
  const cspHeader = findCSP(res.responseHeaders)
  if (cspHeader?.value !== undefined && hasFrameAncestor(cspHeader.value)) {
    // TODO: show user the frame ancestor for manual review
    return
  }
  const xFrameOptions = findXFO(res.responseHeaders)
  if (xFrameOptions.length > 1) {
    return 'multiple XFOs found'
  }
  if (xFrameOptions.length === 0) {
    return 'Neither CSP: frame-ancestor or XFO found'
  }
  const XFOValue = xFrameOptions[0]?.value
  if (XFOValue !== undefined) {
    if (ValidXFOValues.has(XFOValue.toLowerCase())) {
      return
    }
    return 'invalid XFO value'
  }
  console.error('should be impossible', res)
  return
}

export type AntiClickjackError =
  | 'invalid XFO value'
  | 'Neither CSP: frame-ancestor or XFO found'
  | 'multiple XFOs found'

export interface AntiClickjackWarning extends BaseWarning {
  error: AntiClickjackError
  cspContent: string | null
  headers: string[]
}

export const saveAntiClickjack = (
  res: chrome.webRequest.WebResponseHeadersDetails,
  error: AntiClickjackError
) => {
  const headers = res.responseHeaders ?? []
  const data: AntiClickjackWarning = {
    url: res.url,
    error,
    cspContent: findCSP(headers)?.value ?? null,
    headers: headers.map((h) => h.name),
    initiator: res.initiator,
  }
  console.log('Anti Clickjack issue', data)
  saveToLocalStorage(data, storageKey.antiClickjack)
  send(res, data, storageKey.antiClickjack)
}
