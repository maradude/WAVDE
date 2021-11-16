const db = require('../sqlite3')()


const save = (ip, jwt) => {
    db.run("INSERT INTO jwts (ip, jwt) VALUES (?, ?)", [ip, jwt])
}

module.exports = { save }