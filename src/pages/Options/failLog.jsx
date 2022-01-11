import React, { useState, useEffect } from "react";
import storageReader from '../Content/modules/storageReader'

import './failLog.css'


const FailLog = () => {
    // storage logic is identical to Receiver
    const [fails, setFails] = useState([])
    const matchKey = 'benign-fail'
    const storage = storageReader(setFails, matchKey)

    const rows = (data) => {
        return data.map((row, i) =>
            <div key={i}>{row}</div>
        )
    }

    return (
        <div>
            <h3>Fail log</h3>
            <div className="button" onClick={storage.clear}>Clear history!</div>
            <div>{rows(fails)}</div>
        </div>
    )
}

export default FailLog