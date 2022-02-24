import { ourURL } from './utilities'
import { saveURL } from './saveURL'

function onCompletionHandler(res: chrome.webRequest.WebResponseCacheDetails) {
  if (ourURL(res.url) || res.initiator !== undefined) {
    return
  }
  saveURL(res.url, res.timeStamp)
}
export default onCompletionHandler
