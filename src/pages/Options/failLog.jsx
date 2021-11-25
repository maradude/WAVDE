import React, { useState, useEffect } from "react";

import './failLog.css'


const FailLog = () => {
    // storage logic is identical to Receiver
    const [msgs, setMsgs] = useState([])
    const matchKey = 'benign-fail'

    const onMessage = (changes, areaName) => {
        const changed = changes[matchKey].newValue
        if (void 0 !== changed) {
            setMsgs(changed)
        }

    }

    const clear = () => {
        const options = {}
        options[matchKey] = []
        chrome.storage.local.set(options)
        setMsgs([])
    }

    useEffect(async () => {
        const defaultObj = {}
        defaultObj[matchKey] = []
        const data = await chrome.storage.local.get(defaultObj)
        setMsgs(data[matchKey])
    }, [])

    useEffect(() => {
        // only rerun the function if onMessage gets cleaned up
        chrome.storage.local.onChanged.addListener(onMessage)
        return () => chrome.storage.local.onChanged.removeListener(onMessage)
    }, [onMessage])

    const rows = (data) => {
        return data.map((row, i) =>
            <div key={i}>{row}</div>
        )
    }

    return (
        <div>
            <h3>Fail log</h3>
            <div className="button" onClick={clear}>Clear history!</div>
            <div>{rows(msgs)}</div>
        </div>
    )
}

export default FailLog