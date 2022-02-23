import React from 'react'
import Button from '@mui/material/Button'

import WarningReader from './detailModal'

import styles from './warningPanel.css'

import JWTTable from '../readers/jwt_reader/JWTTable'
import InsecureCookieTable from '../readers/insecure_cookie/insecureCookie'
import AntiClickjackTable from '../readers/antiClickjack/antiClickjackTable'
import CorsMisconfigTable from '../readers/cors_misconfig/CORSMisconfigTable'
import StorageReader, { IStorageReader } from '../storageReader'
import { JWTMessage } from '../../../Background/jwt'
import { InsecureCookieHeader } from '../../../Background/insecureCookies'
import { corsMisconfigWarning } from '../../../Background/corsMisconfig'
import { AntiClickjackWarning } from '../../../Background/antiClickjack'
import { BaseWarning } from '../../../Background/utilities'

type WarningType =
  | JWTMessage
  | InsecureCookieHeader
  | AntiClickjackWarning
  | corsMisconfigWarning

type ToWarningHandler<Type> = Type extends BaseWarning
  ? IStorageReader<Type>
  : never

type IWarningHandlers = ToWarningHandler<WarningType>

type WarningButtonProps = {
  name: string
  handler: IWarningHandlers
  rootRef: React.MutableRefObject<null>
  children: React.ReactNode
}

const WarningButton = ({
  name,
  handler,
  rootRef,
  children,
}: WarningButtonProps) => {
  return (
    <WarningReader name={name} count={handler.data.length} rootRef={rootRef}>
      {children}
      <Button variant="contained" color="primary" onClick={handler.clear}>
        Clear
      </Button>
    </WarningReader>
  )
}

type WarningProps = {
  rootRef: React.MutableRefObject<null>
}

const Warnings = ({ rootRef }: WarningProps) => {
  const JWTs = StorageReader<JWTMessage>('jwt')
  const vulnCook = StorageReader<InsecureCookieHeader>('insecure-cookie')
  const antiClickjack = StorageReader<AntiClickjackWarning>('anti-clickjack')
  const corsMis = StorageReader<corsMisconfigWarning>('cors-misconfig')

  return (
    <>
      <WarningButton name="JWT" handler={JWTs} rootRef={rootRef}>
        <JWTTable data={JWTs.data} />
      </WarningButton>
      <WarningButton
        name="Unsecure cookie"
        handler={vulnCook}
        rootRef={rootRef}
      >
        <InsecureCookieTable data={vulnCook.data} />
      </WarningButton>
      <WarningButton
        name="Anti Clickjack"
        handler={antiClickjack}
        rootRef={rootRef}
      >
        <AntiClickjackTable data={antiClickjack.data} />
      </WarningButton>
      <WarningButton name="CORS Misconfig" handler={corsMis} rootRef={rootRef}>
        <CorsMisconfigTable data={corsMis.data} />
      </WarningButton>
    </>
  )
}

type WarningPanelProps = {
  rootRef: React.MutableRefObject<null>
}

const WarningPanel = ({ rootRef }: WarningPanelProps) => {
  return (
    <div className="warning-panel">
      <Warnings rootRef={rootRef} />
      <style type="text/css">{styles}</style>
    </div>
  )
}

export default WarningPanel
