import React, { useState, useEffect } from "react";
import TransformingCell from './TransformingCell'

import './Receiver.css'

const Receiver = () => {
    const [msgs, setMsgs] = useState([])
    const matchKey = 'benign-success'

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

    const headerORrequest = symbol => {
        if (symbol === 'R') {
            return <span alt="R">🇷</span>
        }
        else if (symbol === 'H') {
            return <span alt='H'>🇭</span>
        }
        return <span alt="unknown">❓</span>
    }

    const rows = (data) => {
        return data.map((row, i) =>
            <tr key={i}>
                <td className="row-url">{row.url}</td>
                <td>{row.name} {headerORrequest(row.type)}</td>
                <TransformingCell cname="row-value" content={row.value} />
            </tr>
        )
    }

    return (
        <div>
            <div className="button" onClick={clear}>Clear history!</div>
            <span>Double click any JWT to toggle decoding its header and body.
                Scroll to see more entries. '🇭' = header and '🇷' = request</span>
            <div className="tableContainer">
                <div className="tHeadContainer">
                    <table className="tHead">
                        <thead>
                            <tr>
                                <th className="row-url">url</th>
                                <th className="row-name">name</th>
                                <th className="row-value">value</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="tBodyContainer">
                    <table className="tBody">
                        <tbody>
                            {rows(msgs)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Receiver