import React, { FunctionComponent } from 'react'
import Button from '@mui/material/Button'

import WarningReader from './detailModal'
import { IWarningHandlers } from '../warnings'

import styles from './warningPanel.css'

const warningButton = (
  name: string,
  handler: IWarningHandlers[keyof IWarningHandlers],
  rootRef: React.MutableRefObject<null>
) => {
  const { reader, presenter } = handler
  return (
    <WarningReader
      key={name}
      name={name}
      count={reader.data.length}
      rootRef={rootRef}
    >
      {presenter()}
      <Button variant="contained" color="primary" onClick={reader.clear}>
        Clear
      </Button>
    </WarningReader>
  )
}

const warnings = (
  handlers: IWarningHandlers,
  rootRef: React.MutableRefObject<null>
) => {
  return Object.entries(handlers).map(([name, handler]) =>
    warningButton(name, handler, rootRef)
  )
}

const WarningPanel: FunctionComponent<{
  handlers: IWarningHandlers
  rootRef: React.MutableRefObject<null>
}> = ({ handlers, rootRef }) => {
  return (
    <div className="warning-panel">
      {warnings(handlers, rootRef)}
      <style type="text/css">{styles}</style>
    </div>
  )
}

export default WarningPanel
