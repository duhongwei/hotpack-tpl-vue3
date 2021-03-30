
import RequestBrowser from './request.browser.js'
import RequestServer from './request.server.js'
let Request =  typeof global === 'undefined'?RequestBrowser:RequestServer
export default Request
