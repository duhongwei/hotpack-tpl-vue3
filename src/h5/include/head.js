function controlRem() {
  var clientWidth = document.documentElement.clientWidth;
  var clientHeight = document.documentElement.clientHeight;
  let client = clientWidth < clientHeight ? clientWidth : clientHeight;
  document.getElementsByTagName('html')[0].style.fontSize = client * 100 / 750 + 'px'
  adjustFontSize()
  fix()
}
controlRem()
window.addEventListener('DOMContentLoaded', controlRem, false)

function adjustFontSize() {
  var html = document.getElementsByTagName('html')[0];
  var settingFs
  var settedFs = settingFs = parseInt(html.style.fontSize);
  var whileCount = 0;
  /* eslint-disable-next-line */
  while (true) {
    var realFs = parseInt(window.getComputedStyle(html).fontSize);
    var delta = realFs - settedFs;
    if (Math.abs(delta) >= 1) //不相等
    {
      if (delta > 0) settingFs--;
      else settingFs++;
      html.setAttribute('style', 'font-size:' + settingFs + 'px!important');

    } else
      break;
    if (whileCount++ > 100) //之所以弄个100的循环跳出的原因，在于实在无法预判设备是否能计算得到36px，比如设备只能计算35px，37px，这样会死循环只能跳出了
      break
  }
}

function fix() {

  var SCREEN_WIDTH = window.innerWidth

  var ua = window.navigator.userAgent;
  var isIOS = /(iPhone|iPad|iPod)/.test(ua);
  if (!isIOS) {
    var div = document.createElement('div');
    div.style.width = '3.75rem';
    if (!document.body) { return false }
    document.body.appendChild(div);
    var getWidth = parseFloat(getComputedStyle(div, false).width);
    if (getWidth > SCREEN_WIDTH) {
      var ratio = getWidth / SCREEN_WIDTH;
      var BASE_FONT_SIZE = parseFloat(document.getElementsByTagName('html')[0].style.fontSize)
      document.getElementsByTagName('html')[0].style.fontSize = (BASE_FONT_SIZE / ratio).toFixed(4) + 'px';
    }
    document.body.removeChild(div)
  }
}

//移动端的页面跳转。如果有服务端支持,效率更高的方式是在服务端跳转
function isMobile() {
  return /Android|Phone|iPad|iPod|Mobile/i.test(navigator.userAgent)
}
window.isMobile=isMobile