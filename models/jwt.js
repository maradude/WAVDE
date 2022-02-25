const db = require("../sqlite3")()

const save = (ip, jwt, type, name, url) => {
  db.run("INSERT INTO jwts (ip, jwt, type, name, url) VALUES (?, ?, ?, ?, ?)", [
    ip,
    jwt,
    type,
    name,
    url,
  ])
}

module.exports = { save }
