//author : duhongwei

let win = window
let doc = document

//节流简化版本，默认保证一定时间内必须触发一次。fun不带参数
function throttle(fun, owner, wait = 200) {
  let handler = null
  let time = false
  return function () {
    if (handler) {
      win.clearTimeout(handler)
      handler = null
      if (new Date().getTime() - time > wait) {
        fun.call(owner)
        time = time = new Date().getTime()
      }
    }
    else {
      time = new Date().getTime()
    }
    handler = win.setTimeout(() => {
      fun.call(owner)
      time = false
      handler = null
    }, wait)
  }
}

class Lazy {
  constructor(opts = {}) {
    this.root = opts.root || doc.body
    this.cb = opts.cb || function () { }
    this.ammend = opts.ammend || 150
    this._elems = []
    this._running = false
    this._group = {}
  }
  //为window对象绑定事件
  _on(evt, fun) {
    let obj = this.root
    if (this.root === doc.body) {
      obj = win
    }
    if (obj.addEventListener) {
      obj.addEventListener(evt, fun)
    }
    else {
      obj.attachEvent('on' + evt, fun)
    }
  }
  //为window对象解绑事件
  _off(evt, fun) {
    let obj = this.root
    if (this.root === doc.body) {
      obj = win
    }
    if (obj.removeEventListener) {
      obj.removeEventListener(evt, fun)
    }
    else {
      obj.detachEvent('on' + evt, fun)
    }
  }
  _start() {

    this._resizeLoad = throttle(this.load, this)
    this._scrollLoad = throttle(this.load, this)

    this._on('resize', this._resizeLoad)
    this._on('scroll', this._scrollLoad)
  }
  _stop() {
    this._off('resize', this._resizeLoad)
    this._off('scroll', this._scrollLoad)
  }
  loadItem(elem, cb = function () { }) {
    let src = elem.getAttribute('data-src');
    if (src) {
      elem.setAttribute('src', src);
      elem.removeAttribute('data-src')
    }
    let srcset = elem.getAttribute('data-srcset');

    if (srcset) {
      elem.setAttribute('srcset', srcset);
      elem.removeAttribute('data-srcset')
    }
    cb(elem)
  }

  _load() {
    //viewport
    let w, h;
    let rootRect = null
    if (this.root === doc.body) {
      w = win.innerWidth || doc.documentElement.clientWidth
      h = win.innerHeight || doc.documentElement.clientHeight

    }
    else {
      w = this.root.clientWidth
      h = this.root.clientHeight
      rootRect = this.root.getBoundingClientRect()
    }

    let i = this._elems.length
    let ammend = this.ammend
    while (i--) {
      let item = this._elems[i]
      let rect = item.getBoundingClientRect()
      let r = {}
      if (rootRect) {
        r.top = rect.top - rootRect.top
        r.bottom = rootRect.bottom - rect.bottom
        r.left = rect.left - rootRect.left
        r.right = rootRect.right - rect.right
      }
      else {
        r = rect
      }
      if (judge(r)) {
        let key = item.getAttribute('data-group')
        //如果不写这个if,会导到 this._group[null]=true,然后后面的所有图片都会加载了。
        if (key) {
          this._group[key] = true
        }
        this.loadItem(item, this.cb)
        this._elems.splice(i, 1)
      }
    }
    if (this._elems.length === 0 && this._running) {
      this._stop()
      this._running = false
    }
    //---------------------------------------
    function judge(rect) {
      //display:none 的元素
      if (rect.top + rect.bottom + rect.left + rect.right === 0) {
        return false
      }
      if (rect.right + ammend > 0 && rect.bottom + ammend > 0 && rect.left - ammend < w && rect.top - ammend < h) {
        return true
      }
      return false
    }
  }
  _loadGroup() {
    let i = this._elems.length
    //必须是 i--
    while (i--) {
      let item = this._elems[i]
      let key = item.getAttribute('data-group')
      if (this._group[key]) {
        this.loadItem(item, this.cb)
        this._elems.splice(i, 1)

      }
    }
    this._group = {}
  }
  load() {
    this._load()
    this._loadGroup()
  }
  add(elems) {
    //如果是一个集合，那个集合中的元素是准备执行load的元素
    if ('length' in elems) {
      for (let i = 0; i < elems.length; i++) {
        this._elems.push(elems[i])
      }
    }
    //如果不是一个集合，就是一个元素
    else {
      this._elems.push(elems)
    }
    this.load()
    if (!this._running && this._elems.length > 0) {
      this._start()
      this._running = true
    }
  }
}
Lazy.loadNow = function (elems) {
  const len = elems.length
  for (let i = 0; i < len; i++) {
    this.loadItem(elems[i], this.cb)
  }
}
export default Lazy