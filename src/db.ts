/**
 * NOTE: due to the use of json arrow operators (i.e. -> and ->>), minimum SQLITE version
 * needed is 3.38
 *
 * Most likely need to install from source.
 * [More info](https://github.com/mapbox/node-sqlite3#source-install)
 */
import Database from 'better-sqlite3'

type DBOps = Database.Options

const options: DBOps = {}
const db = new Database('benign-warnings.sqlite3', options)
db.pragma('foreign_keys = ON')


const createMessagesTableSQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message TEXT,
  request_id TEXT GENERATED ALWAYS AS (message ->> '$.requestId') VIRTUAL NOT NULL,
  url TEXT GENERATED ALWAYS AS (message ->> '$.url') VIRTUAL NOT NULL,
  time_stamp REAL GENERATED ALWAYS AS (message ->> '$.timeStamp') VIRTUAL NOT NULL,
  initiator TEXT GENERATED ALWAYS AS (message ->> '$.initiator') VIRTUAL
);`

const createWarningTableSQL = `
CREATE TABLE IF NOT EXISTS warnings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  warning TEXT,
  message_id INTEGER NOT NULL REFERENCES messages
);`
function createTables() {
  return db.exec(createMessagesTableSQL + createWarningTableSQL)

}

createTables()
export default db
