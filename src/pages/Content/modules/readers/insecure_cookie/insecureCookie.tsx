import React, { FunctionComponent } from 'react'

import type { InsecureCookieHeader } from '../../../../Background/insecureCookies'

import BasicTable from '../../../generic/basicTable'

const InsecureCookieTable: FunctionComponent<{
  data: InsecureCookieHeader[]
}> = ({ data }) => {
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
