import { BaseWarning, save, storageKey } from './utilities'

const JWTRe = /([A-Za-z0-9-_]{4,})\.([A-Za-z0-9-_]{3,})\.([A-Za-z0-9-_]{3,})/g // match JWT, group by section, only header mandatory

const isURIEncoded = (uri: string) => {
  try {
    return uri !== decodeURIComponent(uri || '')
  } catch (error) {
    if (error instanceof URIError) {
      return false
    }
    throw error
  }
}

const tryToDecodeURI = (url: string) => {
  let tries = 0
  while (isURIEncoded(url) && tries++ < 30) {
    url = decodeURIComponent(url)
  }
  return url
}

const findJWT = (candidate: string) => {
  if (isURIEncoded(candidate)) {
    candidate = tryToDecodeURI(candidate)
  }

  const res: JWT[] = []
  let match
  while ((match = JWTRe.exec(candidate)) !== null) {
    try {
      JSON.parse(atob(match[1]))
      res.push({ header: match[1], body: match[2], signature: match[3] })
    } catch (e) {
      console.debug(`----`)
      console.debug(`failed match: ${match[0].slice(0, 25)} ...`)
      console.debug('full: ', candidate)
      console.debug(e)
      console.debug(`----`)
    }
  }
  return res
}

const saveJWT = (
  req:
    | chrome.webRequest.WebRequestBodyDetails
    | chrome.webRequest.ResourceRequest,
  match: JWT,
  name: string,
  type: HeaderMarker
) => {
  const data: JWTMessage = {
    jwt: match,
    url: req.url,
    type,
    name,
    initiator: req.initiator,
  }
  console.log('JWT FOUND', data)
  save(data, storageKey.jwt)
}
type HeaderMarker = 'R' | 'H'

type JWT = { header: string; body: string; signature: string }

interface JWTMessage extends BaseWarning {
  jwt: JWT
  type: HeaderMarker
  name: string
}

export { findJWT, saveJWT }
export type { JWTMessage, JWT }
