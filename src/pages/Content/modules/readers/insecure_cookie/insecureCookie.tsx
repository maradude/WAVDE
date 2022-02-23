import React from 'react'

import type { InsecureCookieHeader } from '../../../../Background/insecureCookies'

import BasicTable from '../../../generic/basicTable'

type InsecureCookieTableProps = {
  data: InsecureCookieHeader[]
}

const InsecureCookieTable = ({ data }: InsecureCookieTableProps) => {
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
        headers={['initiator', 'url', 'name', 'value', 'missingTags']}
      />
    </div>
  )
}
export default InsecureCookieTable
