var sqlite3 = require("sqlite3")

const openDB = () => new sqlite3.Database("jwts.sqlite3")

const db = openDB()

db.serialize(function () {
  db.run(`CREATE TABLE IF NOT EXISTS jwts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip TEXT,
            jwt TEXT,
            type TEXT,
            name TEXT,
            url TEXT
            );`)
})

db.close()

module.exports = openDB
