import { JsonValue } from 'type-fest'
import { BaseWarning, apiURL, storageKey } from './utilities'

type WebRequest =
  | chrome.webRequest.WebResponseHeadersDetails
  | chrome.webRequest.WebRequestHeadersDetails
  | chrome.webRequest.WebRequestBodyDetails
  | chrome.webRequest.WebRequestBodyDetails
  | chrome.webRequest.ResourceRequest
  | chrome.webRequest.WebResponseCacheDetails

export type FullWarning = {
  message: WebRequest
  warning: JsonValue
}

const send = async <T extends BaseWarning>(
  message: WebRequest,
  warning: T,
  type: storageKey
) => {
  const { url, initiator, ...relevantFields } = { ...warning, type } // url and initiator are included in message
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, warning: relevantFields }),
  }
  try {
    const rawResponse = await fetch(apiURL, init)
    console.debug(await rawResponse.text())
  } catch (error) {
    console.error(error)
  }
}

/**
 * Save data to local storage array assigned to key
 *
 * @param data
 * @param key
 * @returns Promise<void>
 */
async function saveToLocalStorage<T extends BaseWarning>(
  data: T,
  key: storageKey
) {
  const stored = await chrome.storage.local.get({ [key]: [] })
  stored[key].push(data)
  return chrome.storage.local.set(stored)
}

export { saveToLocalStorage, send }
