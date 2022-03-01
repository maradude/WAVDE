import React from 'react'

import type { corsMisconfigWarning } from '../../../../Background/corsMisconfig'

import BasicTable from '../../../generic/basicTable'

type corsMisconfigTableProps = {
  data: {
    value: string
    error: corsMisconfigWarning['error']
    initiator?: string
    url: string
  }[]
}

/**
 * @param param0 aka. `corsMisconfigWarning`
 * @returns `React.JSXElement`
 *
 * See BasicTable FIXME for explanation for
 * why data is not set to `corsMisconfigWarning[]`
 */
const CorsMisconfigTable = ({ data }: corsMisconfigTableProps) => {
  return (
    <div>
      <span>Looking for overly permissive CORS allow headers</span>
      <BasicTable
        rows={data}
        headers={['initiator', 'url', 'error', 'value']}
      />
    </div>
  )
}

export default CorsMisconfigTable
