/**
 * payload: {<message>, <warning>}
 * message: {12ish response/request related properties}
 * warning: {the relevant material}
 */
import db from '../db'

const messageSTMT = db.prepare("INSERT INTO messages (message) VALUES (json(?))")
const warningSTMT = db.prepare(
  "INSERT INTO warnings (warning, message_id) VALUES (json(?), ?)"
)

type unknownProps = {[key:string]: unknown}
type saveWarningProps = {message: unknownProps, warning: unknownProps}

const saveWarning = db.transaction((payload: saveWarningProps) => {
    const messageJSON = JSON.stringify(payload.message)
    const warningJSON = JSON.stringify(payload.warning)

    const msgInsResult = messageSTMT.run(messageJSON)
    warningSTMT.run(warningJSON, msgInsResult.lastInsertRowid)
    return
})

export default saveWarning