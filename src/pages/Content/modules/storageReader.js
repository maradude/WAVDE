import { useEffect } from 'react'

const StorageReader = ({ saveData, matchKey }) => {
  /** empty storage and state */
  const clear = () => {
    const options = {}
    options[matchKey] = []
    chrome.storage.local.set(options)
    saveData([])
  }

  //   useEffect(() => {
  //     const save = async () => {
  //       const defaultOpts = {};
  //       defaultOpts[matchKey] = [];
  //       const data = await chrome.storage.local.get(defaultOpts);
  //       saveData(data[matchKey]);
  //     };
  //     save();
  //   }, [matchKey, saveData]);

  useEffect(() => {
    const onMessage = (changes, areaName) => {
      if (areaName !== matchKey || !changes[matchKey]?.newValue) {
        // unfortunately our listener reacts to any  chrome local storage change
        // return if change is not to our matchKeys data
        return
      }
      const changed = changes[matchKey].newValue
      if (void 0 !== changed) {
        saveData(changed)
      }
    }
    chrome.storage.local.onChanged.addListener(onMessage)
    return () => chrome.storage.local.onChanged.removeListener(onMessage)
  }, [matchKey, saveData])

  return {
    clear,
  }
}

/** listen to local storage changes on matchKey and call callback with new changes */
export default StorageReader
