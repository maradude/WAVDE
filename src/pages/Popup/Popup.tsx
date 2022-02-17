import React, { useState } from 'react'
import { downloadJSON } from './download'
import { Button } from '@mui/material'
import './Popup.css'

const Status = ({ status }: { status?: boolean }) => {
  return <h2>{status ? 'Success' : 'Fail'}</h2>
}

const buttonHandler =
  (callback: CallableFunction) =>
  (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    callback()
  }

const Popup = () => {
  const [status, setStatus] = useState<boolean | undefined>(undefined)

  const download = async () => {
    const data = await chrome.storage.local.get(null)
    downloadJSON(data, setStatus)
    setTimeout(() => {
      setStatus(undefined)
    }, 4000)
  }

  return (
    <div className="App">
      <Button onClick={buttonHandler(download)}>Download Storage</Button>
      {status !== undefined && <Status status={status} />}
    </div>
  )
}

export default Popup
