import type { JWTMessage } from './jwt'

const apiURL = 'http://localhost:3001/'

const ourURL = (url: string) =>
  url === apiURL || url.startsWith('chrome-extension://')

const send = async (data: JWTMessage) => {
  // data : { url, type, name, value })
  try {
    const rawResponse = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    console.debug(await rawResponse.text())
  } catch (error) {
    console.debug(error)
  }
}

export type StorageMessage = {
  url: string
}

export type BaseWarning = StorageMessage & {
  initiator: string | null
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
async function save<T extends StorageMessage>(data: T, key: storageKey) {
  const stored = await chrome.storage.local.get({ [key]: [] })
  stored[key].push(data)
  return chrome.storage.local.set(stored)
}

export { save, send, ourURL }
