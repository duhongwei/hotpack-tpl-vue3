import compress from '@duhongwei/hotpack-compress'
import babel from '@duhongwei/hotpack-babel'
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
      name: 'babel',
      use: babel
    },
    {
      name: 'compress',
      use: compress
    }
  ]
}