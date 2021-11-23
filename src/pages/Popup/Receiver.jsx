import React, { useState, useEffect } from "react";
import TransformingCell from './TransformingCell'

import './Receiver.css'

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

    const rows = (data) => {
        console.log(data)
        return data.map((row, i) =>
            <tr key={i}>
                <td className="row-url">{row.url}</td>
                <td>{row.httpOnly.toString()}</td>
                <td>{row.type}</td>
                <td>{row.name}</td>
                <TransformingCell cname="row-value" content={row.value}/>
            </tr>
        )
    }

    return (
        <div>
            <div className="button" onClick={clear}>Clear history!</div>
            <span>Click any JWT to toggle decoding its header and body. Also, scroll to see more entries</span>
            <div className="table-cont">
            <table className="jwt-table">
                <thead>
                    <tr>
                        <th className="row-url">url</th>
                        <th className="row-httpOnly">httpOnly</th>
                        <th className="row-type">type</th>
                        <th className="row-name">name</th>
                        <th className="row-value">value</th>
                    </tr>
                </thead>
                <tbody>
                    {rows(msgs)}
                </tbody>
            </table>
            </div>
        </div>
    )
}
export default Receiver