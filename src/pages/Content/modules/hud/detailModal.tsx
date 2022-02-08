import React, { useState, FunctionComponent } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'

const WarningReader: FunctionComponent<{
  name: string
  count: number
  children: React.ReactNode
  rootRef: React.MutableRefObject<null>
}> = ({ name, count, children, rootRef }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const warningButton = (name: string, count: number) => {
    const color = count > 0 ? 'warning' : 'info'
    const label = `${name}: ${count}`
    return (
      <Button
        sx={{ margin: '0.2em' }}
        variant="contained"
        onClick={handleOpen}
        color={color}
      >
        {label}
      </Button>
    )
  }
  return (
    <div style={{ direction: 'rtl' }} className="warning-reader">
      {warningButton(name, count)}
      <Dialog
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        container={rootRef.current}
        sx={{ maxWidth: 'none' }}
      >
        <Box maxWidth="lg" sx={{ width: 'fit-content' }}>
          {children}
        </Box>
      </Dialog>
    </div>
  )
}

export default WarningReader
