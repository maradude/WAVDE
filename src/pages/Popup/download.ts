import { JsonObject } from 'type-fest'

const nowISO8601ishString = () => {
  return new Date()
    .toLocaleString(['sv'])
    .replaceAll(':', '-')
    .replace(' ', '--')
}

export const downloadJSON = (
  data: JsonObject,
  successPresenter: (success: boolean) => void
) => {
  const sData = JSON.stringify(data, null, 4)
  const bData = new Blob([sData], { type: 'octet/stream' })
  const url = window.URL.createObjectURL(bData)
  const filename = `benign__${nowISO8601ishString()}.json`
  const DownloadOptions: chrome.downloads.DownloadOptions = { url, filename }
  const callback = (f: typeof successPresenter) => (downloadID?: number) => {
    if (downloadID === undefined) {
      f(false)
    } else {
      f(true)
    }
  }
  chrome.downloads.download(DownloadOptions, callback(successPresenter))
}
