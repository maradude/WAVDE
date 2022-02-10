import StorageReader from './storageReader'
import JWTTable from './readers/jwt_reader/JWTTable'
import InsecureCookieTable from './readers/insecure_cookie/insecureCookie'
import JWTFailLog from './readers/failed_jwt_reader/failLog'
import AntiClickjackTable from './readers/antiClickjack/antiClickjackTable'

import type { FunctionComponent } from 'react'
import type { JWTMessage } from '../../Background/jwt'
import type { IStorageReader } from './storageReader'
import type { InsecureCookieHeader } from '../../Background/insecureCookies'
import type { AntiClickjackWarning } from '../../Background/missingAntiClickJackHeader'
import type { storageKey } from '../../Background/utilities'

type Handler<T> = {
  reader: IStorageReader<T>
  presenter: () => React.ReactNode
}

type jwtHandler = Handler<JWTMessage>

type jwtFailHandler = Handler<string>

type insecureCookieHandler = Handler<InsecureCookieHeader>

type antiClickJackHandler = Handler<AntiClickjackWarning>

export type IWarningHandlers = {
  JWTs: jwtHandler
  'False+': jwtFailHandler
  'vulnerable cookie': insecureCookieHandler
  'anti clickjack': antiClickJackHandler
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
    'False+': handlerFactory<string>('jwt-fail', JWTFailLog),
    'vulnerable cookie': handlerFactory<InsecureCookieHeader>(
      'insecure-cookie',
      InsecureCookieTable
    ),
    'anti clickjack': handlerFactory<AntiClickjackWarning>(
      'missing-anti-clickjack',
      AntiClickjackTable
    ),
  }
}

export default warningHandlers
