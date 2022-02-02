import React, { FunctionComponent } from 'react'

import type { InsecureCookieHeader } from '../../../../Background/insecureCookies'

const InsecureCookieTable: FunctionComponent<{
  data: InsecureCookieHeader[]
}> = ({ data }) => {
  const rows = (data: InsecureCookieHeader[]) => {
    return data.map((row, i) => (
      <tr key={i}>
        <td className="row-url">{row.url}</td>
        <td className="row-name">{row.name}</td>
        <td className="row-value">{row.value}</td>
        <td className="row-tags"> {row.missingTags.join('; ')}</td>
      </tr>
    ))
  }

  return (
    <div>
      <span>
        Lists all set-cookie headers that don't include the Security or HttpOnly
        tag. Used for manual review
      </span>
      <div className="tableContainer">
        <div className="tHeadContainer">
          <table className="tHead">
            <thead>
              <tr>
                <th className="row-url">url</th>
                <th className="row-name">name</th>
                <th className="row-name">value</th>
                <th className="row-tags">missing tags</th>
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
export default InsecureCookieTable
