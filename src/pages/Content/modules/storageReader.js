import React, { useState, useEffect } from "react"

const storageReader = ({ saveData, matchKey }) => {
    const onMessage = (changes, areaName) => {
        if (areaName !== matchKey || !changes[matchKey] ? .newValue) {
            // unfortunately our listener reacts to any  chrome local storage change
            // return if change is not to our matchKeys data
            return
        }
        const changed = changes[matchKey].newValue
        if (void 0 !== changed) {
            setMsgs(changed)
        }

    }

    /** empty storage and state */
    const clear = () => {
        const options = {}
        options[matchKey] = []
        chrome.storage.local.set(options)
        setMsgs([])
    }

    useEffect(async() => {
        const defaultOpts = {}
        defaultOpts[matchKey] = []
        const data = await chrome.storage.local.get(defaultOpts)
        setMsgs(data[matchKey])
    }, [])

    useEffect(() => {
        // only rerun the function if onMessage gets cleaned up
        chrome.storage.local.onChanged.addListener(onMessage)
        return () => chrome.storage.local.onChanged.removeListener(onMessage)
    }, [onMessage])

    return { clear }
}

/** listen to local storage changes on matchKey and call callback with new changes */
export default storageReader