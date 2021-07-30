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
export {
  formatTime
};