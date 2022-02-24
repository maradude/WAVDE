import type { JWTMessage } from './jwt'

const apiURL = 'http://localhost:3001/'

const ourURL = (url: string) => url === apiURL

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

export interface BaseWarning {
  initiator: string | null
  url: string
}

export enum storageKey {
  jwt = 'jwt',
  insecureCookie = 'insecure-cookie',
  antiClickjack = 'anti-clickjack',
  corsMisconfig = 'cors-misconfig',
}
/**
 * Save data to local storage array assigned to key
 *
 * @param data
 * @param key
 * @returns Promise<void>
 */
const save = async (data: BaseWarning, key: storageKey): Promise<void> => {
  const stored = await chrome.storage.local.get({ [key]: [] })
  stored[key].push(data)
  return chrome.storage.local.set(stored)
}

export { save, send, ourURL }
