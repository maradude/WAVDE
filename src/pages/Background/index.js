console.log('This is the background page.');
console.log('Put the background scripts here.');

const JWTRe = /([A-Za-z0-9-_]{10,})\.([A-Za-z0-9-_]*)\.([A-Za-z0-9-_]*)/ // match JWT, group by section, only header mandatory
const apiURL = "http://localhost:3001/"

const send = async (data) => {
    const rawResponse = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jwt: data[3] })
    })
    console.log(await rawResponse.text())
}

const findJWT = (candidate) => {
    try {
        const match = JWTRe.exec(candidate)
        if (match !== null) {
            JSON.parse(atob(match[1]))
            return match[0]
        }
    } catch (e) {
        console.log(`failed candidate: "${candidate}"`)
        console.log(e)
    }
    return null
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

const save = async (tabId, data) => {
    send(data)
    const stored = await chrome.storage.local.get({ 'bening': [] })
    stored['bening'].push(data)
    chrome.storage.local.set(stored)
}

const onHeaderHandler = (req, headers) => {
    headers.forEach(header => {
        const match = findJWT(header.value)
        if (match !== null) {
            console.log('JWT FOUND', req.url, header.name, match)
            save(req.tabId, [req.url, 'H', header.name, match])
        }
    })
}

const parseRaw = (raw) => {
    return raw.map(data => {
        return decodeURIComponent(String.fromCharCode.apply(null, new Uint8Array(data.bytes)));
    }).join('')
}

const onBeforeRequestHandler = req => {
    if (req.url === apiURL) {
        return
    }
    if (req.requestBody?.raw) {
        const match = findJWT(parseRaw(req.requestBody.raw))
        if (match !== null) {
            console.log('JWT FOUND', req.url, match)
            save(req.tabId, [req.url, 'P', req.type, match])
        }
    }
}

const networkFilters = {
    urls: [
        "<all_urls>"
    ]
};

chrome.webRequest.onHeadersReceived.addListener(onHeadersReceivedHandler, networkFilters, ["responseHeaders", "extraHeaders"])

chrome.webRequest.onSendHeaders.addListener(onSendHeadersHandler, networkFilters, ["requestHeaders", "extraHeaders"])

chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestHandler, networkFilters, ["requestBody"]);