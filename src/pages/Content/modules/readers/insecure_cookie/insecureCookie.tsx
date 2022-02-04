import React, { FunctionComponent } from 'react'

import type { InsecureCookieHeader } from '../../../../Background/insecureCookies'

import BasicTable from '../../../generic/basicTable'

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

  const stringData = (data: InsecureCookieHeader[]) => {
    return data.map((row) => ({
      ...row,
      missingTags: row.missingTags.join('; '),
    }))
  }

  return (
    <div>
      <span>
        Lists all set-cookie headers that don't include the Security or HttpOnly
        tag. Used for manual review
      </span>
      <BasicTable
        rows={stringData(data)}
        headers={['url', 'name', 'value', 'missingTags']}
      />
    </div>
  )
}
export default InsecureCookieTable
