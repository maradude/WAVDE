import React from 'react'
import BasicTable from '../../../generic/basicTable'

type JWTFAilLogProps = {
  data: string[]
}

const JWTFailLog = ({ data }: JWTFAilLogProps): JSX.Element => {
  return (
    <div>
      <h3>Fail log</h3>
      <BasicTable rows={data.map((e) => ({ data: e }))} headers={['data']} />
    </div>
  )
}

export default JWTFailLog
