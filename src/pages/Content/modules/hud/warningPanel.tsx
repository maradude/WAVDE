import React, { FunctionComponent } from 'react'
import Button from '@mui/material/Button'

import styles from './warningPanel.css'

import WarningReader from './detailModal'
import { IWarningHandlers } from '../warnings'

// type Keys = keyof IWarningReader;
// type Values = typeof KeyToVal[Keys]; //  "myValue1" | "myValue2"

const f = (name: string, handler: IWarningHandlers[keyof IWarningHandlers]) => {
  const { reader, presenter } = handler
  return (
    <WarningReader key={name} name={name} count={reader.data.length}>
      {/* {presenter({ data: reader.data })} */}
      {presenter()}
      <Button onClick={reader.clear}>Clear</Button>
    </WarningReader>
  )
}

const warnings = (handlers: IWarningHandlers) => {
  return Object.entries(handlers).map(([name, handler]) => f(name, handler))
}

const WarningPanel: FunctionComponent<{
  handlers: IWarningHandlers
}> = ({ handlers: readers }) => {
  return (
    <div className="warning-panel">
      {warnings(readers)}
      <style type="text/css">{styles}</style>
    </div>
  )
}

// const Button = ({
//   label,
//   action,
//   style,
// }: {
//   label: string
//   action: React.MouseEventHandler<HTMLDivElement>
//   style: string
// }) => {
//   return (
//     <div className={style} onClick={action}>
//       {label}
//     </div>
//   )
// }

export default WarningPanel
