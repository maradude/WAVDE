import React, { FunctionComponent } from 'react'

import TransformingText from './TransformingJWT'

// import './JWTTable.css'

import type { JWTMessage } from '../../../../Background/jwt'
import BasicTable from '../../../generic/basicTable'

const JWTTable: FunctionComponent<{
  data: JWTMessage[]
}> = ({ data }) => {
  const headerORrequest = (symbol: 'R' | 'H') => {
    if (symbol === 'R') {
      return '🇷'
    }
    return '🇭'
  }
  const rows = (data: JWTMessage[]) => {
    return data.map((row) => ({
      url: row.url,
      name: `${row.name} ${headerORrequest(row.type)}`,
      jwt: TransformingText({ cname: 'row-value', content: row.jwt }),
    }))
  }

  return (
    <div>
      <span>
        Double click any JWT to toggle decoding its header and body. Scroll to
        see more entries. '🇭' = header and '🇷' = request
      </span>
      <BasicTable rows={rows(data)} headers={['url', 'name', 'jwt']} />
    </div>
  )
}
export default JWTTable
