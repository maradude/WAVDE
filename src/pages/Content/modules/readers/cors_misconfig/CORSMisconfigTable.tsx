import React, { FunctionComponent } from 'react'

import type { corsMisconfigWarning } from '../../../../Background/corsMisconfig'

import BasicTable from '../../../generic/basicTable'

const corsMisconfigTable: FunctionComponent<{
  data: corsMisconfigWarning[]
}> = ({ data }) => {
  return (
    <div>
      <span>Looking for overly permissive CORS allow headers</span>
      <BasicTable rows={data} headers={['url', 'error', 'value']} />
    </div>
  )
}

export default corsMisconfigTable
