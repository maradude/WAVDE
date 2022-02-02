import { save } from './utilities'

export const findInsecureCookies = (headerValue: string): SecurityTags[] => {
  const res: SecurityTags[] = []
  const normalizedValue = headerValue.toLowerCase() // case insensitive as per: https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.6
  if (normalizedValue.includes('httponly')) {
    res.push('HttpOnly')
  }
  if (normalizedValue.includes('secure')) {
    res.push('Secure')
  }
  return res
}

export type SecurityTags = 'HttpOnly' | 'Secure'

export type InsecureCookieHeader = {
  name: string
  value: string
  missingTags: SecurityTags[]
  url: string
}

export const saveInsecureCookie = (
  req:
    | chrome.webRequest.WebRequestBodyDetails
    | chrome.webRequest.ResourceRequest,
  name: string,
  value: string,
  missingTags: SecurityTags[]
) => {
  const data: InsecureCookieHeader = {
    name,
    value,
    missingTags,
    url: req.url,
  }
  console.log('Insecure cookie found', data)
  save(data, 'insecure-cookie')
}
