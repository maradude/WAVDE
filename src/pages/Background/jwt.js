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

const JWT = (value, {url, type, name, httpOnly = 'n/a'} = {}) => {
    return {
        value,
        url,
        type,
        name,
        httpOnly
    }
}

export {JWT, findJWT}