import React from 'react'

import type { AntiClickjackWarning } from '../../../../Background/antiClickjack'

import BasicTable from '../../../generic/basicTable'

type antiClickjackTableProps = {
  data: AntiClickjackWarning[]
}

const antiClickjackTable = ({ data }: antiClickjackTableProps) => {
  const stringData = (data: AntiClickjackWarning[]) => {
    return data.map((row) => ({
      ...row,
      headers: row.headers.join(', '),
    }))
  }
  return (
    <div>
      <span>
        Loooking for missing anti Clickjack headers. Either content security
        policy not having frame-ancestor or X-Frame-Options missing
      </span>
      <BasicTable
        rows={stringData(data)}
        headers={['initiator', 'url', 'error', 'cspContent', 'headers']}
      />
    </div>
  )
}

export default antiClickjackTable
