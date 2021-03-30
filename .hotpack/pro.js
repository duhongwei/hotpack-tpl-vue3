import cdn from '@q/hotpack-cdn'
import vue from '@q/hotpack-vue'
import postcss from '@q/hotpack-postcss'
import buble from '@q/hotpack-buble'
import polyfill from '@q/hotpack-polyfill'
import eslint from '@q/hotpack-eslint';
export default {
  render: true,
  cdn,
  dist: './dist',
  proxy: {
    //host: 'http://qaapi.isc.360.com',
    host: 'http://api.isc.360.com',
    match: /\/webapi\//,
    map: function (path) {
      return path.replace('/webapi', '');
    },
  },
  plugin: [
    
    {
      name: 'polyfill',
      use: polyfill
    },
    {
      name: 'eslint',
      use: eslint,
      opt: {
        errorBreak: false,
      },
    },
    {
      name: 'vue',
      use: vue
    },
    {
      name: 'postcss',
      use: postcss
    },
    
    {
      name: 'buble',
      use: buble
    }
  ]
}