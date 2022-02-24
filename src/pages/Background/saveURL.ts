import { save, storageKey, StorageMessage } from './utilities'

export interface mainFrameURL extends StorageMessage {
  timeStamp: number
}

export function saveURL(url: string, timeStamp: number) {
  save({ url, timeStamp }, storageKey.mainFrame)
}
