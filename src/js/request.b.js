class requestError extends Error {
  constructor({ errno, msg }) {
    super(msg)
    this.errno = errno
    this.msg = msg
  }
}

function strinify(data) {
  let result = []
  for (const key in data) {
    if (!Object.hasOwnProperty.call(data, key)) continue
    let v = data[key]
    if (v === null || v === undefined) {
      continue
    }

    result.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
  }
  return result.join('&')
}

function makeUrl(url, data = {}) {
  data.t = new Date().getTime()

  let join = url.indexOf('?') > 0 ? '&' : '?'
  url = `${url}${join}${strinify(data)}`
  return url
}

function qsTransform(data) {
  let str = ''
  if (typeof data !== 'object' && !Array.isArray(data)) {
    return ''
  }

  Object.keys(data).forEach((key, index, arr) => {
    if (index === arr.length - 1) {
      str += `${key}=${qsString(data[key])}`
    } else {
      str += `${key}=${qsString(data[key])}&`
    }
  })

  return str
}

function qsString(data) {
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }
  return encodeURIComponent(data)
}


function proxyUrl(url) {
  return `/webapi${url}`
}

class Request {
  constructor({ timeout = 5000 } = {}) {
    let xhr = new XMLHttpRequest()
    this.timeout = timeout
    this.xhr = xhr
    this.hasAborted = false
  }
  _getResponse() {
    let xhr = this.xhr
    return new Promise((resolve, reject) => {
      xhr.ontimeout = function () {
        reject(
          new requestError({
            errno: 1,
            msg: 'timeout',
          })
        )
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200 || xhr.status === 304) {
            let d = JSON.parse(xhr.responseText)
            if (d.errno === 0) {
              resolve(d)
            }
            //not login
            else if (d.errno == 100102) {
             
              reject(
                new requestError({
                  errno: 2,
                  msg: 'nologin',
                })
              )
              return
            } else {
              reject(
                new requestError({
                  errno: d.errno,
                  msg: d.msg,
                })
              )
            }
          } else if (xhr.status != 0) {
            reject(
              new requestError({
                errno: 3,
                msg: '网络错误',
              })
            )
          } else if (!this.hasAborted) {
            console.error(
              '系统开了个小差，请稍候重试',
              `xhr.status ${xhr.status}`
            )
            reject(
              new requestError({
                errno: 101,
                msg: '未知错误',
              })
            )
          }
        }
      }.bind(this)
    })
  }

  get({ url, data = {} }) {
   
    url = proxyUrl(url)
    let xhr = this.xhr

    url = makeUrl(url, data)

    xhr.open('GET', url)
 
    xhr.withCredentials = true
    let res = this._getResponse()
    xhr.send()
    return res
  }

  post({ url, data = {} }) {

    url = proxyUrl(url)
    let xhr = this.xhr
    xhr.open('POST', url)

    xhr.withCredentials = true
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    let res = this._getResponse()
    xhr.send(qsTransform(data))
    return res
  }

  abort() {
    this.hasAborted = true
    this.xhr.abort()
  }
}
export default Request