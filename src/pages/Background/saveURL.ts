import { storageKey, BaseWarning } from './utilities'
import { saveToLocalStorage, send } from './record'

export interface mainFrameURL extends BaseWarning {
  timeStamp: number
}

export function saveURL(res: chrome.webRequest.WebResponseCacheDetails) {
  const warn = { url: res.url, timesStamp: res.timeStamp }
  saveToLocalStorage(warn, storageKey.mainFrame)
  send(res, warn, storageKey.mainFrame)
}
