import { findJWT, saveJWT } from './jwt'
import { findInsecureCookies, saveInsecureCookie } from './insecureCookies'
import { checkAntiClickjack, saveAntiClickjack } from './antiClickjack'
import { findCORSAllow, saveCorsMisconfig } from './corsMisconfig'

// NOTE: Header names are not case sensitive!!!

const searchForCORSMisconfig = (
  res: chrome.webRequest.WebResponseHeadersDetails
) => {
  const warning = findCORSAllow(res)
  if (warning === undefined) {
    return
  }
  saveCorsMisconfig(warning)
}

const searchForMissingAntiClickjackHeaders = (
  res: chrome.webRequest.WebResponseHeadersDetails
) => {
  if (!(res.type === 'main_frame' || res.type === 'sub_frame')) {
    try {
      DEBUGGING_FUNC_checkForContentTypeProgrammerError(res)
    } catch (e) {
      if (e instanceof Error) {
        console.groupCollapsed(e.message)
        console.warn(res)
        console.groupEnd()
      }
    }
    return
  }
  const a = checkAntiClickjack(res)
  if (a === undefined) {
    return
  }
  saveAntiClickjack(res, a)
}

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
  })
}

const onWebResponseHeader = (
  res: chrome.webRequest.WebResponseHeadersDetails,
  headers: chrome.webRequest.HttpHeader[]
) => {
  searchForCORSMisconfig(res)
  searchForMissingAntiClickjackHeaders(res)
  onHeaderHandler(res, headers)
  headers.forEach((header) => {
    if (header.value === undefined) {
      return
    }
    searchForSecurityTagsMissing(res, header.name, header.value)
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
  res: chrome.webRequest.WebResponseHeadersDetails
) => {
  if (res.responseHeaders !== undefined) {
    onWebResponseHeader(res, res.responseHeaders)
  }
}

/**
 * content-types that can be used for XSS with the X-Content-Type-Options: nosniff header active
 * [source](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet#content-types)
 */
const XSS_VULN_CONT_TYPES = new Set([
  'text/html',
  'application/xhtml+xml',
  'application/xml',
  'text/xml',
  'image/svg+xml',
  // 'text/xsl', // chrome+safari only
])

/** X-Frame-Options: frame, iframe, embed or object element.
 *
 * Content-Security-Policy with frame-ancestors: same but with added applet
 */
// const clickjackTags = new Set(['frame', 'iframe', 'object', 'embed', 'applet'])
// console.log(
//     `${res.type}${clickjackTags.has(res.type) ? '' : ' not'} in [${Array.from(
//       clickjackTags
//     ).join(', ')}]`
//   )
/**
 * check for logic errors in terms of content-type ignored when
 * not supposed to
 * @param res
 * @returns void | never
 */
function DEBUGGING_FUNC_checkForContentTypeProgrammerError(
  res: chrome.webRequest.WebResponseHeadersDetails
): void | never {
  if (res.responseHeaders === undefined) {
    return
  }

  const contentType = res.responseHeaders.find(
    (h) => h.name.toLowerCase() === 'content-type'
  )
  if (
    contentType?.value !== undefined &&
    (XSS_VULN_CONT_TYPES.has(contentType.value) ||
      contentType.value.includes('text/html')) // can be used for XSS when you can inject into the content-type header
  ) {
    throw Error(
      `Programmer logic error: why is res.type=${res.type} and not a main_frame or sub_frame: ${contentType.value}`
    )
  }
}

export { onSendHeadersHandler, onHeadersReceivedHandler }
