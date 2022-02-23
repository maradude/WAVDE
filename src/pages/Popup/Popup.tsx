import React, { useState } from 'react'
import { downloadJSON } from './download'
import { Button } from '@mui/material'
import './Popup.css'

type DlStatusProps = {
  dlStatus?: boolean
}

const DlStatus = ({ dlStatus }: DlStatusProps) => {
  return <h2>{dlStatus ? 'storage downloaded' : 'issue with download'}</h2>
}
const ClStatus = () => {
  return <h2>Storage cleared</h2>
}

const buttonHandler =
  (callback: CallableFunction) =>
  (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    callback()
  }

const Popup = () => {
  const [dlStatus, setDlStatus] = useState<boolean | undefined>(undefined)
  const [clStatus, setClStatus] = useState<boolean | undefined>(undefined)

  const download = async () => {
    const data = await chrome.storage.local.get(null)
    downloadJSON(data, setDlStatus)
    setTimeout(() => {
      setDlStatus(undefined)
    }, 4000)
  }

  const clear = async () => {
    await chrome.storage.local.clear()
    setClStatus(true)
    setTimeout(() => {
      setClStatus(undefined)
    }, 4000)
  }

  const KeyboardShortcutKeys = () => (
    <>
      <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd>
    </>
  )

  const KeyboardShortcutInfo = () => (
    <div>
      If not already bound to something else, <KeyboardShortcutKeys /> will also
      download storage
    </div>
  )

  return (
    <div className="App">
      <KeyboardShortcutInfo />
      <Button onClick={buttonHandler(download)}>Download Storage</Button>
      <Button onClick={buttonHandler(clear)}>clear Storage</Button>
      {dlStatus !== undefined && <DlStatus dlStatus={dlStatus} />}
      {clStatus !== undefined && <ClStatus />}
    </div>
  )
}

export default Popup
