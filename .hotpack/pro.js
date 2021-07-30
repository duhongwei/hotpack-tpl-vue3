import compress from '@duhongwei/hotpack-compress'
export default {
  render: {
    //required
    src: "render",
    //required
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