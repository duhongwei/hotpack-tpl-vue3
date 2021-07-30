//移动端的页面跳转。如果有服务端支持,效率更高的方式是在服务端跳转
function isMobile() {
  return /Android|Phone|iPad|iPod|Mobile/i.test(navigator.userAgent)
}
window.isMobile=isMobile