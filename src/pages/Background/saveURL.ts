import { save, storageKey, BaseWarning } from './utilities'

export interface mainFrameURL extends BaseWarning {
  timeStamp: number
}

export function saveURL(url: string, timeStamp: number) {
  save({ url, timeStamp }, storageKey.mainFrame)
}
