import StorageReader from './storageReader'
import JWTTable from './readers/jwt_reader/JWTTable'
import InsecureCookieTable from './readers/insecure_cookie/insecureCookie'
import AntiClickjackTable from './readers/antiClickjack/antiClickjackTable'
import corsMisconfigTable from './readers/cors_misconfig/CORSMisconfigTable'

import type { FunctionComponent } from 'react'
import type { IStorageReader } from './storageReader'
import type { storageKey } from '../../Background/utilities'
import type { JWTMessage } from '../../Background/jwt'
import type { InsecureCookieHeader } from '../../Background/insecureCookies'
import type { AntiClickjackWarning } from '../../Background/antiClickjack'
import type { corsMisconfigWarning } from '../../Background/corsMisconfig'

type Handler<T> = {
  reader: IStorageReader<T>
  presenter: () => React.ReactNode
}

type jwtHandler = Handler<JWTMessage>

type insecureCookieHandler = Handler<InsecureCookieHeader>

type antiClickJackHandler = Handler<AntiClickjackWarning>

type corsMisconfigHandler = Handler<corsMisconfigWarning>

export type IWarningHandlers = {
  JWTs: jwtHandler
  'vulnerable cookie': insecureCookieHandler
  'anti clickjack': antiClickJackHandler
  'cors misconfig': corsMisconfigHandler
}

const warningHandlers = (): IWarningHandlers => {
  const handlerFactory = <T>(
    key: storageKey,
    presenterElement: FunctionComponent<{ data: T[] }>
  ): Handler<T> => {
    const reader = StorageReader<T>(key)
    const presenter = () => presenterElement({ data: reader.data })
    return { reader, presenter }
  }
  return {
    JWTs: handlerFactory<JWTMessage>('jwt', JWTTable),
    'vulnerable cookie': handlerFactory<InsecureCookieHeader>(
      'insecure-cookie',
      InsecureCookieTable
    ),
    'anti clickjack': handlerFactory<AntiClickjackWarning>(
      'anti-clickjack',
      AntiClickjackTable
    ),
    'cors misconfig': handlerFactory<corsMisconfigWarning>(
      'cors-misconfig',
      corsMisconfigTable
    ),
  }
}

export default warningHandlers
