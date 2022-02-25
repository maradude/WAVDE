import React from 'react'
import Button from '@mui/material/Button'

import WarningReader from './detailModal'

import styles from './warningPanel.css'

import JWTTable from '../readers/jwt_reader/JWTTable'
import InsecureCookieTable from '../readers/insecure_cookie/insecureCookie'
import AntiClickjackTable from '../readers/antiClickjack/antiClickjackTable'
import CorsMisconfigTable from '../readers/cors_misconfig/CORSMisconfigTable'
import SitesVisitedTable from '../readers/sitesVisited/SitesVisitedTable'
import StorageReader, { IStorageReader } from '../storageReader'
import { JWTMessage } from '../../../Background/jwt'
import { InsecureCookieHeader } from '../../../Background/insecureCookies'
import { corsMisconfigWarning } from '../../../Background/corsMisconfig'
import { AntiClickjackWarning } from '../../../Background/antiClickjack'
import { BaseWarning, storageKey } from '../../../Background/utilities'
import { mainFrameURL } from '../../../Background/saveURL'

type WarningType =
  | JWTMessage
  | InsecureCookieHeader
  | AntiClickjackWarning
  | corsMisconfigWarning
  | mainFrameURL

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

const Warning = ({ name, handler, rootRef, children }: WarningButtonProps) => {
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
  const JWTs = StorageReader<JWTMessage>(storageKey.jwt)
  const vulnCook = StorageReader<InsecureCookieHeader>(
    storageKey.insecureCookie
  )
  const antiClickjack = StorageReader<AntiClickjackWarning>(
    storageKey.antiClickjack
  )
  const corsMis = StorageReader<corsMisconfigWarning>(storageKey.corsMisconfig)
  const mainFrameURLs = StorageReader<mainFrameURL>(storageKey.mainFrame)

  return (
    <>
      <Warning name="JWT" handler={JWTs} rootRef={rootRef}>
        <JWTTable data={JWTs.data} />
      </Warning>
      <Warning name="Unsecure cookie" handler={vulnCook} rootRef={rootRef}>
        <InsecureCookieTable data={vulnCook.data} />
      </Warning>
      <Warning name="Anti Clickjack" handler={antiClickjack} rootRef={rootRef}>
        <AntiClickjackTable data={antiClickjack.data} />
      </Warning>
      <Warning name="CORS Misconfig" handler={corsMis} rootRef={rootRef}>
        <CorsMisconfigTable data={corsMis.data} />
      </Warning>
      <Warning name="URLs visited" handler={mainFrameURLs} rootRef={rootRef}>
        <SitesVisitedTable data={mainFrameURLs.data} />
      </Warning>
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
