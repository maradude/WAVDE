import React, { FunctionComponent } from 'react'
import BasicTable from '../../../generic/basicTable'

// import './failLog.css'

const JWTFailLog: FunctionComponent<{
  data: string[]
}> = ({ data }): JSX.Element => {
  return (
    <div>
      <h3>Fail log</h3>
      <BasicTable rows={data.map((e) => ({ data: e }))} headers={['data']} />
    </div>
  )
}

export default JWTFailLog
