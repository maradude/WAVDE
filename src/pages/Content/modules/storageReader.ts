import { useEffect, useState } from 'react'
import { JsonValue } from 'type-fest'
import type { storageKey } from '../../Background/utilities'

type IStorageReader<T extends JsonValue> = {
  data: T[]
  clear: () => void
}

/**
 * Setup a extension local storage reader. Will update
 * data on storage changes and clear storage with clear
 * @param matchKey
 * @returns IStorageReader<T>
 */
const StorageReader = <T extends JsonValue>(
  matchKey: storageKey
): IStorageReader<T> => {
  const [data, saveData] = useState<T[]>([])
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
    function onMessage(
      this: { key: string },
      changes: { [key: string]: chrome.storage.StorageChange },
      _areaName: string
    ) {
      if (!changes[this.key]?.newValue) {
        // unfortunately our listener reacts to any  chrome local storage change
        // return if change is not to our matchKeys data
        return
      }
      const changed = changes[this.key].newValue
      if (changed !== undefined) {
        saveData(changed)
      }
    }
    // clone function to avoid overwrite
    const uniqueOnMessage: typeof onMessage = onMessage.bind({ key: matchKey })
    chrome.storage.onChanged.addListener(uniqueOnMessage)
    return () => chrome.storage.onChanged.removeListener(uniqueOnMessage)
  }, [matchKey, saveData])

  return {
    data,
    clear,
  }
}

/** listen to local storage changes on matchKey and call callback with new changes */
export default StorageReader
export type { IStorageReader }
