export default {
  src: 'src',
  ignoreFunc: (file, stats) => {
    //stats.isDirectory()
    let list = [
    ]
    return list.some(reg => reg.test(file))
  },
  group: [
    [
      'css/common.css'
    ],
    [
      'js/util.js',
      'js/cookie.js',
      'js/request-browser.js',
      'js/request.js'
    ]
  ]
}