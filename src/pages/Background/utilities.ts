const crxURLprefix = 'chrome-extension://'
export const apiURL = 'http://localhost:3001/'

export const ourURL = (url: string) =>
  url === apiURL || url.startsWith(crxURLprefix)

export type BaseWarning = {
  url: string
  initiator?: string
}

export enum storageKey {
  jwt = 'jwt',
  insecureCookie = 'insecure-cookie',
  antiClickjack = 'anti-clickjack',
  corsMisconfig = 'cors-misconfig',
  mainFrame = 'main-frame-url',
}
