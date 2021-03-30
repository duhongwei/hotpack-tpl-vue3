function isMobile() {
  var ua = navigator.userAgent;
  var isAndroid = /Android/i.test(ua);
  var isBlackBerry = /BlackBerry/i.test(ua);
  var isWindowPhone = /IEMobile/i.test(ua);
  var isIOS = /iPhone|iPad|iPod/i.test(ua);
  return isAndroid || isBlackBerry || isWindowPhone || isIOS;
}
function fitDevicePage() {
  let { pathname } = location;
  if (isMobile()) {
 
    window.location.href = `/wap${pathname}`
  }
}
fitDevicePage();
