import { BaseWarning, save, storageKey } from './utilities'
/*
both WASC-13: Info leakage
CWE-1004: Sensitive Cookie Without 'HttpOnly' Flag
CWE-614: Sensitive Cookie in HTTPS Session Without 'Secure' Attribute
*/
export const findInsecureCookies = (headerValue: string): SecurityTags[] => {
  const res: SecurityTags[] = []
  const normalizedValue = headerValue.toLowerCase() // case insensitive as per: https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.6
  if (!normalizedValue.includes('httponly')) {
    res.push('HttpOnly')
  }
  if (!normalizedValue.includes('secure')) {
    res.push('Secure')
  }
  return res
}

export type SecurityTags = 'HttpOnly' | 'Secure'

export interface InsecureCookieHeader extends BaseWarning {
  name: string
  value: string
  missingTags: SecurityTags[]
}

export const saveInsecureCookie = (
  res: chrome.webRequest.WebResponseHeadersDetails,
  name: string,
  value: string,
  missingTags: SecurityTags[]
) => {
  const data: InsecureCookieHeader = {
    name,
    value,
    missingTags,
    url: res.url,
    initiator: res.initiator ?? null,
  }
  console.log('Insecure cookie found', data)
  save(data, storageKey.insecureCookie)
}
