import {save} from './utilities'

const JWTRe = /([A-Za-z0-9-_]{4,})\.([A-Za-z0-9-_]*)\.([A-Za-z0-9-_]*)/g // match JWT, group by section, only header mandatory

const bareminimum = /(\..*\..*)/


const isURIEncoded = uri => {
    try {
        return uri !== decodeURIComponent(uri || '')
    } catch (error) {
        if (error instanceof URIError) {
            return false
        }
        throw error
    }
}

const tryToDecodeURI = url => {
    let tries = 0;
    while (isURIEncoded(url) && tries++ < 30) {
        url = decodeURIComponent(url)
    }
    return url
}

const findJWT = (candidate) => {
    if (isURIEncoded(candidate)) {
        candidate = tryToDecodeURI(candidate)
    }

    const res = []
    let match;
    while ((match = JWTRe.exec(candidate)) !== null) {
        try {
            JSON.parse(atob(match[1]))
            res.push(match[0])
        } catch (e) {
            console.groupCollapsed(`failed match: ${match[0].slice(0, 25)} ...`)
            console.log("full: ", candidate)
            console.debug(e)
            console.groupEnd()
        }
    }
    if (res.length === 0) {
        save(candidate, 'benign-fail')
    }
    return res
}

const JWT = (value, { url, type, name } = {}) => {
    return {
        value,
        url,
        type,
        name,
    }
}

export { JWT, findJWT }