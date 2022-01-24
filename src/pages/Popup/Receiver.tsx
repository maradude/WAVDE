import React, { useState } from 'react'
import TransformingCell from './TransformingCell'
import storageReader from '../Content/modules/storageReader'

import './Receiver.css'

import type { JWT } from '../Background/jwt'

const Receiver = () => {
  const [jwts, setJWTs] = useState<JWT[]>([])
  const matchKey = 'benign-success'
  const storage = storageReader(setJWTs, matchKey)

  const headerORrequest = (symbol: 'R' | 'H') => {
    if (symbol === 'R') {
      return <span title="R">🇷</span>
    } else if (symbol === 'H') {
      return <span title="H">🇭</span>
    }
    return <span title="unknown">❓</span>
  }

  const rows = (data: JWT[]) => {
    return data.map((row, i) => (
      <tr key={i}>
        <td className="row-url">{row.url}</td>
        <td>
          {row.name} {headerORrequest(row.type)}
        </td>
        <TransformingCell cname="row-value" content={row.value} />
      </tr>
    ))
  }

  return (
    <div>
      <div className="button" onClick={storage.clear}>
        Clear history!
      </div>
      <span>
        Double click any JWT to toggle decoding its header and body. Scroll to
        see more entries. '🇭' = header and '🇷' = request
      </span>
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
            <tbody>{rows(jwts)}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Receiver
