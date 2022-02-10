import type { JWTMessage } from './jwt'
import { JsonValue } from 'type-fest'

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

export type storageKey =
  | 'jwt'
  | 'jwt-fail'
  | 'insecure-cookie'
  | 'missing-anti-clickjack'
  | 'cors-misconfig'

const save = async (data: JsonValue, key: storageKey) => {
  const stored = await chrome.storage.local.get({ [key]: [] })
  stored[key].push(data)
  chrome.storage.local.set(stored)
}

export { save, send, ourURL }
