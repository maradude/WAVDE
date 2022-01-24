import { useEffect } from 'react'

const StorageReader = (saveData: (a: any[]) => void, matchKey: string) => {
  /** empty storage and state */
  const clear = () => {
    chrome.storage.local.set({
      [matchKey]: [],
    })
    saveData([])
  }

  useEffect(() => {
    /** set initial state */
    const save = async () => {
      const data = await chrome.storage.local.get({ [matchKey]: [] })
      saveData(data[matchKey])
    }
    save()
  }, [matchKey, saveData])

  useEffect(() => {
    /** event handler for storage chagnes */
    function onMessage(this: { key: string }, changes: any, areaName: string) {
      if (!changes[this.key]?.newValue) {
        // unfortunately our listener reacts to any  chrome local storage change
        // return if change is not to our matchKeys data
        return
      }
      const changed = changes[this.key].newValue
      if (void 0 !== changed) {
        saveData(changed)
      }
    }
    // clone function to avoid overwrite
    const uniqueOnMessage: typeof onMessage = onMessage.bind({ key: matchKey })
    chrome.storage.onChanged.addListener(uniqueOnMessage)
    return () => chrome.storage.onChanged.removeListener(uniqueOnMessage)
  }, [matchKey, saveData])

  return {
    clear,
  }
}

/** listen to local storage changes on matchKey and call callback with new changes */
export default StorageReader
