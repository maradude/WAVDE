import React from 'react'
import { mainFrameURL } from '../../../../Background/saveURL'
import BasicTable from '../../../generic/basicTable'

type SitesVisitedTableProps = {
  data: mainFrameURL[]
}

const SitesVisitedTable = ({ data }: SitesVisitedTableProps): JSX.Element => {
  const rows = data.map(props => ({...props}))
  return (
    <div>
      <h3>Sites visited</h3>
      <BasicTable rows={rows} headers={['url', 'timeStamp']} />
    </div>
  )
}

export default SitesVisitedTable
