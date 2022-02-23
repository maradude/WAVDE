import React, { FunctionComponent } from 'react'

import type { corsMisconfigWarning } from '../../../../Background/corsMisconfig'

import BasicTable from '../../../generic/basicTable'

/**
 * @param param0 aka. `corsMisconfigWarning`
 * @returns `React.JSXElement`
 *
 * See BasicTable FIXME for explanation for
 * why data is not set to `corsMisconfigWarning[]`
 */
const corsMisconfigTable: FunctionComponent<{
  data: {
    value: string
    error: corsMisconfigWarning['error']
    requestType: string
    initiator: string | null
    url: string
  }[]
}> = ({ data }) => {
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

export default corsMisconfigTable
