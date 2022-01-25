import React, { FunctionComponent } from 'react'

import TransformingCell from './TransformingCell'

// import './JWTTable.css'

import type { JWTMessage } from '../../../../Background/jwt'

const JWTTable: FunctionComponent<{
  data: JWTMessage[]
}> = ({ data }) => {
  const headerORrequest = (symbol: 'R' | 'H') => {
    if (symbol === 'R') {
      return <span title="R">🇷</span>
    } else if (symbol === 'H') {
      return <span title="H">🇭</span>
    }
    return <span title="unknown">❓</span>
  }

  const rows = (data: JWTMessage[]) => {
    return data.map((row, i) => (
      <tr key={i}>
        <td className="row-url">{row.url}</td>
        <td>
          {row.name} {headerORrequest(row.type)}
        </td>
        <TransformingCell cname="row-value" content={row.jwt} />
      </tr>
    ))
  }

  return (
    <div>
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
            <tbody>{rows(data)}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default JWTTable
