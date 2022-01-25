import React, { useState, FunctionComponent } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

/*
property) presenter: React.FunctionComponent<{
    data: JWTMessage[];
    clear: () => void;
}> | React.FunctionComponent<{
    data: string[];
    clear: () => void;
}>
*/

const WarningReader: FunctionComponent<{
  name: string
  count: number
  children: React.ReactNode
}> = ({ name, count, children }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const warningButton = (name: string, count: number) => {
    const color = count > 0 ? 'warning' : 'info'
    const label = `${name}: ${count}`
    return (
      <Button onClick={handleOpen} color={color}>
        {label}
      </Button>
    )
  }
  return (
    <div>
      {warningButton(name, count)}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  )
}

export default WarningReader
