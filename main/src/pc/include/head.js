//The page jump on the mobile terminal. If there is server support, the more efficient way is to jump on the server
function isMobile() {
  return /Android|Phone|iPad|iPod|Mobile/i.test(navigator.userAgent)
}
window.isMobile=isMobile