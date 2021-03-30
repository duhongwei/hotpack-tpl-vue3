import vue from '@q/hotpack-vue';
import buble from '@q/hotpack-buble';
import eslint from '@q/hotpack-eslint';
import postcss from '@q/hotpack-postcss';

import polyfill from '@q/hotpack-polyfill'
export default {
  render: false,
  dist: './dev',
  proxy: {
    host: 'http://qaapi.isc.360.com',
    //host: 'http://api.isc.360.com',
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
      name: 'postcss',
      use: postcss,
    },

    {
      name: 'buble',
      use: buble,
    },
    {
      name: 'vue',
      use: vue,
    }
  ]
};
