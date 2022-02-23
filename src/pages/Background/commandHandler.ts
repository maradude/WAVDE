import { downloadJSON } from '../Popup/download'

export const commandHandler = (command: string, tab: chrome.tabs.Tab) => {
  const innerAsyncFunc = async (command: string, tab: chrome.tabs.Tab) => {
    if (command === 'Download-Storage') {
      const data = await chrome.storage.local.get(null)
      downloadJSON(data)
    }
  }
  console.log('Keyboard shortcut hit, starting download')
  innerAsyncFunc(command, tab)
}
