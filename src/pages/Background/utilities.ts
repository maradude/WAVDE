import type { JWT } from './jwt'

const apiURL = 'http://localhost:3001/'

const ourURL = (url: string) => url === apiURL

const send = async (data: JWT) => {
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

const save = async (data: any, key = 'benign-success') => {
  const stored = await chrome.storage.local.get({ [key]: [] })
  stored[key].push(data)
  chrome.storage.local.set(stored)
}

export { save, send, ourURL }
