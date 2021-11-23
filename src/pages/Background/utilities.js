const apiURL = "http://localhost:3001/"

const ourURL = url => url === apiURL

const send = async (data) => {
    try {
        const rawResponse = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jwt: data.value })
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

export { save, send, ourURL }