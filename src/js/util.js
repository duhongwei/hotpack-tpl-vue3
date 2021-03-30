/**
 * 工具方法
 */
import Vue from 'vue';
import monitor from './monitor.min.js';

function getUrlParam() {
  let result = {};
  let search = window.location.search.substr(1);
  if (search == '') return result;
  search = search.split('&');
  for (let i = 0; i < search.length; i++) {
    let item = search[i].split('=');
    result[window.decodeURIComponent(item[0])] = window.decodeURIComponent(
      item[1]
    );
  }
  return result;
}
function fastDeepClone(obj) {
  let s = JSON.stringify(obj);
  return JSON.parse(s);
}


function slimImage(imgUrl, width = 750) {
  if (!imgUrl) return imgUrl
  let reg = /(https:\/\/.*qhimg.*.com\/)(.*)/;
  let result = imgUrl.replace(reg, function () {
    let args = arguments;
    return `${args[1]}dr/${width}__/${args[2]}`;
  });
  return result;
}

function sendClick(text, opts = {}) {
  var params = Object.assign({
    c: text,
  },
    opts
  );
  monitor.log(params, 'click'); //发送点击统计
}

function deffer() {
  let resolve = null, reject = null;
  let promise = new Promise((_resolve_, _reject_) => {
    resolve = _resolve_
    reject = _reject_
  })
  return {
    promise,
    resolve,
    reject
  }
}
function isIos() {
   return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
function isWeixin() {
  return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) === "micromessenger" 
}

const eventBus = new Vue();

export {
  getUrlParam,
  fastDeepClone,
  slimImage,
  sendClick,
  deffer,
  isIos,
  isWeixin,
  eventBus
};