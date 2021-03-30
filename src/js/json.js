
function jsonp(url, data = {}) {
    return new Promise((resolve, reject) => {
      let dataString = url.indexOf('?') === -1 ? '?' : '&'
      let callbackName = `jsonpCB_${Date.now()}`
      url += `${dataString}callback=${callbackName}`
      if (data) {
        for (let k in data) {
          url += `&${k}=${data[k]}`
        }
      }
      let jsNode = document.createElement('script')
      jsNode.src = url
      window[callbackName] = res => {
        delete window[callbackName]
        document.body.removeChild(jsNode)
        if (res.errno === 0) {
          resolve(res.data)
        } else {
          reject(res.errmsg)
        }
      }
      jsNode.addEventListener('error', () => {
        delete window[callbackName]
        document.body.removeChild(jsNode)
        reject('js加载资源失败')
      }, false)
      document.body.appendChild(jsNode)
    })
  }
  
export default jsonp