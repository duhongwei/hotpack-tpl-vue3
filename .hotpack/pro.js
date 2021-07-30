import compress from '@duhongwei/hotpack-compress'
export default {
  render: {
    enable: true
  },
  dist: './dist',
  plugin: [

    {
      name: 'compress',
      use: compress
    }
  ]
}