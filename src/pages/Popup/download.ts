import { JsonObject } from 'type-fest'

const nowISO8601ishString = () => {
  return new Date()
    .toLocaleString(['sv'])
    .replaceAll(':', '-')
    .replace(' ', '--')
}

const noPresenter = (s: boolean) => undefined

const a = (content: string) => {
  // const prefix = 'data:application/json;base64,'
  const prefix = 'data:text/html;base64,'
  return prefix + encodeURIComponent(content)
}

export const downloadJSON = (
  data: JsonObject,
  successPresenter: (success: boolean) => void = noPresenter
) => {
  const sData = JSON.stringify(data, null, 4)
  // const bData = new Blob([sData], { type: 'octet/stream' })
  // const url = URL.createObjectURL(bData)
  const url = a(sData)
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
