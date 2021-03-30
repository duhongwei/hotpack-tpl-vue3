import monitor from './monitor.min.js'
import { getUrlParam } from './util.js'

let key = window.location.href.split('//')[1].split(/[#?]/)[0].split('/')
key.shift()
key = key.join('/')
if (key == '') {
  key = '/'
}

let p = getUrlParam()
if (p.channel) {
  key = `${key}/${p.channel}`
}
export default function () {
  monitor.setProject('QH_4649_1024')
    .setUrl(key)
    .getTrack()
    .getClickAndKeydown()
    .getClickHeatmap()

  var _getText = monitor.util.getText;
  monitor.util.getText = function (el) {
    var c = el.getAttribute('data-c')

    if (c) {
      return c
    }
    else {
      return _getText(el).replace(/\s+/g, '')
    }
  }

}
