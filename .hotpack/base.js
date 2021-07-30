import babel from '@duhongwei/hotpack-babel'
import vue3 from '@duhongwei/hotpack-vue3'
import postcss from '@duhongwei/hotpack-postcss'
export default {
  src: 'src',

  ignoreFunc: (file, stats) => {
    //stats.isDirectory()
    //RegExp array
    let list = [
    ]
    return list.some(reg => reg.test(file))
  },
  plugin: [
    {
      name: 'vue3',
      use: vue3
    },
    {
      name: 'postcss',
      use: postcss,
      isH5: (key) => {
        return /^h5/.test(key)
      }
    },
    {
      name: 'babel',
      use: babel
    },
    {
      name: 'node',
      use: 'node',
      opt: {
        alias: {
          //example: no umd file，Manually specify the files available to the browser and export the global variables
          xss: {
            path: 'dist/xss.min.js',
            export: 'filterXSS'
          }
        }
      }
    }
  ],
  group: [
    [
      'js/util.js',
      'node/vue.js',
      'node/vuex.js',
      'node/vue-router.js',
    ],
    [
      'css/common.css'
    ],
  ],
  server: {
    page: {
      single: '/index.html'
    }
  }
}