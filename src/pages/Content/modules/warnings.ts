import type { FunctionComponent } from 'react'
import StorageReader from './storageReader'
import type { JWTMessage } from '../../Background/jwt'
import type { IStorageReader } from './storageReader'
import JWTTable from './readers/jwt_reader/JWTTable'
import JWTFailLog from './readers/failed_jwt_reader/failLog'

import type { storageKey } from '../../Background/utilities'
// import { JsonValue } from 'type-fest'
// type warning<U extends JsonValue> = {
//   [K in U]: warning<K>
// }[U]
// type x = warning<JsonValue>
// type warning<T> = T extends JsonValue ? warning<T> : never
// type y = warning<JsonValue>

// type Generic<T> = { something: T }
// type GenericOfUnion<U extends string> = { [K in U]: Generic<K> }[U]
// type Foo = GenericOfUnion<NonNullable<JsonValue>>

// type warning<T extends JsonValue> = {
// reader: IStorageReader<T>
// presenter: FunctionComponent<{ data: T[] }>
// }
// type DistributeWarning<U> = U extends JsonValue ? warning<U> : never
// export type WarningHandler = DistributeWarning<JsonValue | JWTMessage>

// const warnings = (): { [key: string]: WarningHandler } => {
// TODO: clean this mess
// const jwts: warning<{ [key: string]: JsonValue }> = {
//   reader: StorageReader<{ [key: string]: JsonValue }>('benign-success'),
//   presenter: JWTTable as FunctionComponent<{
//     data: { [key: string]: JsonValue }[]
//     clear: () => void
//   }>,
// }

type Handler<T> = {
  reader: IStorageReader<T>
  presenter: () => React.ReactNode
}

type jwtHandler = Handler<JWTMessage>

type jwtFailHandler = Handler<string>

// Includes<jwtFailHandler.presenter IStorageReader<string>>

export type IWarningHandlers = { JWTs: jwtHandler; 'False+': jwtFailHandler }

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
    JWTs: handlerFactory<JWTMessage>('benign-success', JWTTable),
    'False+': handlerFactory<string>('benign-fail', JWTFailLog),
  }
}

export default warningHandlers
