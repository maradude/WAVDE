import { save, send } from './utilities'
import {JWT, findJWT } from './jwt'

const isHttpOnly = value => {
    // case insensitive as per: https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.6
    return value.toLowerCase().includes('httponly')
}

const processHeader = (req, header, match) => {
    let name = header.name
    if (name.toLowerCase() === 'set-cookie') {
        const httpOnly = isHttpOnly(header.value)
        name += `; httpOnly=${httpOnly.toString()}`

    }
    const data = JWT(match, {url: req.url, type: 'H', name: name})
    console.log('JWT FOUND', data)
    save(data)
    send(data)
}

const onHeaderHandler = (req, headers) => {
    headers.forEach(header => {
        const matches = findJWT(header.value)
        for (const match of matches) {
            processHeader(req, header, match)
        }
    })
}

const onSendHeadersHandler = req => {
    if (void 0 !== req.requestHeaders) {
        onHeaderHandler(req, req.requestHeaders)
    }
}

const onHeadersReceivedHandler = req => {
    if (void 0 !== req.responseHeaders) {
        onHeaderHandler(req, req.responseHeaders)
    }
}

export { onSendHeadersHandler, onHeadersReceivedHandler }