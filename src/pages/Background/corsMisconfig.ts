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

import { save } from './utilities'

export const findCORSAllow = (
  res: chrome.webRequest.WebResponseHeadersDetails
): corsMisconfigWarning | undefined => {
  const corsAllow = res.responseHeaders?.find(
    (h) => h.name.toLowerCase() === 'access-control-allow-origin'
  )
  if (corsAllow?.value === undefined) {
    return
  }
  if (corsAllow.value === '*') {
    return {
      url: res.url,
      error: 'overly permissive CORS allow',
      value: corsAllow.value,
    }
  }
}

type corsMisconfigErrorMessage = 'overly permissive CORS allow'

export type corsMisconfigWarning = {
  url: string
  value: string
  error: corsMisconfigErrorMessage
}

export const saveCorsMisconfig = (data: corsMisconfigWarning) => {
  console.log('Found CORS misconfig', data)
  save(data, 'cors-misconfig')
}
