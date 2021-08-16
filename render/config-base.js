export default {
  port: 3000,
  page: {
      single: '/single.html',
  }
  //一般是需要代理的，作为示例就先加这个了。
 /*  proxy: {
      host: 'http://xxx,
      match: /\/webapi\//,
      map: function (path) {
          return path.replace('/webapi', '');
      },
  } */
}