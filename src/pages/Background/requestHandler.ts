import { ourURL } from './utilities'
import { findJWT, saveJWT } from './jwt'

const enc = new TextDecoder('utf-8')

// TODO: check if decodedData actually needs decodingURIComponents applied
const decodeRaw = (raw: chrome.webRequest.UploadData[]) => {
  const decodedData = raw.map((data) => {
    return enc.decode(data.bytes)
  })
  return decodeURIComponent(decodedData.join(''))
}

const searchJWTInBody = (req: chrome.webRequest.WebRequestBodyDetails) => {
  if (req.requestBody?.formData) {
    console.log(
      'form data found',
      req.url,
      ' formData: ',
      req.requestBody.formData
    )
  }
  if (req.requestBody?.raw !== undefined) {
    let body: string
    try {
      body = decodeRaw(req.requestBody.raw)
    } catch (e) {
      console.error('Issue with request body decode: ', e)
      return
    }
    console.groupCollapsed('found a request body')
    console.log(req.url)
    console.log(body)
    console.groupEnd()
    const rawMatches = findJWT(body)
    for (const match of rawMatches) {
      saveJWT(req, match, req.type, 'R')
    }
  }
}

const searchJWTInURL = (req: chrome.webRequest.WebRequestBodyDetails) => {
  const urlMatches = findJWT(req.url)
  for (const match of urlMatches) {
    console.info('url might have a JWT', req.url)
    saveJWT(req, match, req.type, 'R')
  }
}

const onBeforeRequestHandler = (
  req: chrome.webRequest.WebRequestBodyDetails
) => {
  if (ourURL(req.url)) {
    return
  }
  searchJWTInURL(req)
  searchJWTInBody(req)
}

export default onBeforeRequestHandler
