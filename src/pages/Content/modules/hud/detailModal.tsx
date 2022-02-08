import React, { useState, FunctionComponent } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button, { ButtonProps } from '@mui/material/Button'

const WarningReader: FunctionComponent<{
  name: string
  count: number
  children: React.ReactNode
  rootRef: React.MutableRefObject<null>
}> = ({ name, count, children, rootRef }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const WarningButton = ({ name, count }: { name: string; count: number }) => {
    let color: ButtonProps['color'], variant: ButtonProps['variant']
    const style: ButtonProps['sx'] = { margin: '0.2em' }
    if (count > 0) {
      color = 'warning'
      variant = 'contained'
    } else {
      color = 'primary'
      variant = 'outlined'
      style['bgcolor'] = '#FFF'
      const whiteBG = {
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
        '&:active': {
          backgroundColor: '#f5f5f5',
        },
        '&:focus': {
          backgroundColor: '#FFF',
        },
        bgcolor: 'white',
      }
      Object.assign(style, whiteBG)
    }
    return (
      <Button sx={style} variant={variant} onClick={handleOpen} color={color}>
        {`${name}: ${count}`}
      </Button>
    )
  }
  return (
    <div style={{ direction: 'rtl' }} className="warning-reader">
      <WarningButton name={name} count={count} />
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
