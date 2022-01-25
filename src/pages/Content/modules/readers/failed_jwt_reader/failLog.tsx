import React, { FunctionComponent } from 'react'

// import './failLog.css'

const JWTFailLog: FunctionComponent<{
  data: string[]
}> = ({ data }): JSX.Element => {
  const rows = (data: string[]) => {
    return data.map((row, i) => <div key={i}>{row}</div>)
  }

  return (
    <div>
      <h3>Fail log</h3>
      <div>{rows(data)}</div>
    </div>
  )
}

export default JWTFailLog
