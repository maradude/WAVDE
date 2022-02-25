/**
 * check for CORS misconfiguration, mostly just overly permissiveness
 *
 * HTTP header called Access-Control-Allow-Origin is defined. With this header,
 * a Web server defines which other domains are allowed to access its domain
 * using cross-origin requests. However, exercise caution when defining the
 * header because an overly permissive CORS policy can enable a malicious
 * application to inappropriately communicate with the victim application,
 * which can lead to spoofing, data theft, relay, and other attacks.
 * [source](https://vulncat.fortify.com/en/detail?id=desc.config.dotnet.html5_overly_permissive_cors_policy)
 *
 * CWE 264: Permissions, Privileges, and Access Controls
 * WASC-14: Server Misconfiguration
 */

import { BaseWarning, save, storageKey } from './utilities'

const findCORSAllow = (
  res: chrome.webRequest.WebResponseHeadersDetails
): corsMisconfigWarning | undefined => {
  // check ACAO first for more likely early return
  const acao = res.responseHeaders?.find(
    (h) => h.name.toLowerCase() === 'access-control-allow-origin'
  )
  if (acao?.value === undefined) {
    return
  }
  // we only care about textual data
  const contentType = res.responseHeaders?.find(
    (h) => h.name.toLowerCase() === 'content-type'
  )
  const vuln = ['multipart', 'application', 'text']
  if (!vuln.some((x) => contentType?.value?.toLowerCase().includes(x))) {
    return
  }
  // check if ACAO allows all websites (essentially fully disable SOP)
  if (acao.value === '*') {
    return {
      url: res.url,
      requestType: res.type,
      error: 'SOP disabled',
      value: acao.value,
      initiator: res.initiator,
    }
  }
  return
}

type corsMisconfigError = 'overly permissive CORS allow' | 'SOP disabled'

interface corsMisconfigWarning extends BaseWarning {
  value: string
  error: corsMisconfigError
  requestType: string
}

const saveCorsMisconfig = (data: corsMisconfigWarning) => {
  console.log('Found CORS misconfig', data)
  save(data, storageKey.corsMisconfig)
}

export { saveCorsMisconfig, findCORSAllow }
export type { corsMisconfigWarning }
