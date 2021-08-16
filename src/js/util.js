/**
 * 工具方法
 */
function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
function formatNumber(n) {
  if (n < 0) return `0${n}`
  else return `${n}`
}
function getUrlParam() {
  let result = {};
  let search = window.location.href.split('?')[1]
  if (!search) return result;
  search = search.split('#')[0]
  search = search.split('&');
  for (let i = 0; i < search.length; i++) {
    let item = search[i].split('=');
    result[window.decodeURIComponent(item[0])] = window.decodeURIComponent(
      item[1]
    );
  }
  return result;
}
export {
  getUrlParam,
  formatTime
};