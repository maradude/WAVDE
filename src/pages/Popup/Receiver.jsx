import React, { useState, useEffect } from "react";

const Receiver = () => {
    const [msgs, setMsgs] = useState([])

    const onMessage = (changes, areaName) => {
        const changed = changes['bening'].newValue
        if (void 0 !== changed) {
            setMsgs(changed)
        }

    }

    const clear = () => {
        chrome.storage.local.clear()
        setMsgs([])
    }

    useEffect(async () => {
        const data = await chrome.storage.local.get({ 'bening': [] })
        setMsgs(data['bening'])
    }, [])

    useEffect(() => {
        // only rerun the function if onMessage gets cleaned up
        chrome.storage.local.onChanged.addListener(onMessage)
        return () => chrome.storage.local.onChanged.removeListener(onMessage)
    }, [onMessage])

    const rows = () => {
        return msgs.map((msg, i) =>
            <tr key={i}>{row(msg)}</tr>
        )
    }

    const row = cells => {
        return cells.map((cell, i) =>
            <td key={i}>{cell}</td>
        )
    }

    return (
        <div>
            <div className="button" onClick={clear}>Clear history!</div>
            <table>
                <thead>
                    <tr>
                        <th>ULR</th>
                        <th>Header/POST</th>
                        <th>Name/Type</th>
                        <th>JWT</th>
                    </tr>
                </thead>
                <tbody>
                    {rows()}
                </tbody>
            </table>
        </div>
    )
}
export default Receiver