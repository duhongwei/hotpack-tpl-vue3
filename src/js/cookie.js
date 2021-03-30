

/**
* @class Cookie Cookie类
* @namespace QW
* @param {Json} options (Optional) Cookie参数配置，目前支持以下配置
*  {string} path path，默认为'/' 
*  {string} domain domain 
*  {int} expires 过期毫秒数，默认为一年
*  {string} secure 
*/
function Cookie(options) {
  options = options || {};
  this.path = options.path || '/';
  this.domain = options.domain || '';
  this.expires = options.expires || 3600000 * 24 * 365;
  this.secure = options.secure || '';
}

Cookie.prototype = {
  /**
  * 存储
  * @method set
  * @param {string} key
  * @param {string} value
  * @return void
  */
  set: function (key, value) {
    var now = new Date();
    if (typeof (this.expires) == 'number') {
      now.setTime(now.getTime() + this.expires);
    }
    document.cookie =
      key + '=' + encodeURIComponent(value)
      + ';expires=' + now.toGMTString()
      + ';path=' + this.path
      + (this.domain == '' ? '' : ('; domain=' + this.domain))
      + (this.secure ? '; secure' : '');
  },
  /**
  * 读取
  * @method get
  * @param {string} key
  * @return string
  */
  get: function (key) {
    var a, reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
    a = document.cookie.match(reg)
    if (a) {
      return decodeURIComponent(a[2]);
    } else {
      return '';
    }
  },
  has: function (key) {
    if (this.get(key) === '') {
      return false;
    }
    else {
      return true;
    }
  },
  /*
  * 移除
  * @method remove
  * @param {string} key
  * @return void
  */
  remove: function (key) {
    var old = this.expires;
    this.expires = -3600000 * 24 * 365;
    this.set(key, '');
    this.expires = old;
  }
};


/**
* 存储
* @method set
* @static
* @param {string} key
* @param {string} value
* @param {Json} options (Optional) 更多cookie参数
* @return void
*/
Cookie.set = function (key, value, options) {
  new Cookie(options).set(key, value);
};

/**
* 读取
* @method get
* @static
* @param {string} key
* @param {Json} options (Optional) 更多cookie参数
* @return string
*/
Cookie.get = function (key, options) {
  return new Cookie(options).get(key);
};

/**
* 移除
* @method set
* @static
* @param {string} key
* @param {Json} options (Optional) 更多cookie参数
* @return void
*/
Cookie.remove = function (key, options) {
  new Cookie(options).remove(key);
};
Cookie.has = function (key) {
  return new Cookie().has(key);
};
export default Cookie;
