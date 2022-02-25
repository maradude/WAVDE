const apiURL = 'http://localhost:3001/'
const crxURLprefix = 'chrome-extension://'

const ourURL = (url: string) => url === apiURL || url.startsWith(crxURLprefix)

const send = async <T extends BaseWarning>(data: T) => {
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  try {
    const rawResponse = await fetch(apiURL, init)
    console.debug(await rawResponse.text())
  } catch (error) {
    console.error(error)
  }
}

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
/**
 * Save data to local storage array assigned to key
 *
 * @param data
 * @param key
 * @returns Promise<void>
 */
async function save<T extends BaseWarning>(data: T, key: storageKey) {
  const stored = await chrome.storage.local.get({ [key]: [] })
  stored[key].push(data)
  return chrome.storage.local.set(stored)
}

export { save, send, ourURL }
