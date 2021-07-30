import Koa from 'koa'
import { basename, join, resolve } from 'path'
import fs from 'fs-extra'
import send from 'koa-send'
//https://github.com/edorivai/koa-proxy
//import proxy from 'koa-proxy';
import { renderToString } from '@vue/server-renderer'

//执行两次，性能有点差，先用着
async function replace(str, regex, asyncFn) {
  const promises = [];
  str.replace(regex, (match, ...args) => {
    const promise = asyncFn(match, ...args);
    promises.push(promise);
  });
  const data = await Promise.all(promises);
  return str.replace(regex, () => data.shift());
}
global.__VUE_OPTIONS_API__ = true
global.__VUE_PROD_DEVTOOLS__ = false

async function init() {
  const root = process.cwd()
  let ssrConfig = await fs.readJSON(join(root, 'ssr.json'))
  process.env.NODE_ENV = ssrConfig['env'].NODE_ENV

  let configPath = null
  if (process.env.NODE_ENV == 'development') {
    configPath = './config-dev.js'
  }
  else if (ssrConfig['env'].DATA_ENV == 'test') {
    process.env.DATA_ENV = 'test'
    configPath = './config-test.js'
  }
  else {
    configPath = './config-pro.js'
  }

  let { default: config } = await import(configPath)

  let webApp = new Koa()
  //示例就不加proxy了。
  /* if (config.proxy) {
    webApp.use(proxy(config.proxy));
  }
 */
  webApp.use(async (ctx, next) => {
    //防止路径攻击
    if (ctx.path.indexOf('..') > -1) {
      ctx.response.type = 'text';
      ctx.response.body = 'invalid path';
      console.error('has .. in path!')
    }
    else {
      let path = join(root, ctx.path.substr(1))
      try {
        ctx.fileStats = await fs.stat(path)
        //如果是目录，跳到默认页面
        if (ctx.fileStats.isDirectory()) {
          let newUrl = ctx.path
          if (newUrl.endsWith('/')) {
            newUrl = `${ctx.path}index.html`
          }
          else {
            newUrl = `${ctx.path}/index.html`
          }
          path = join(path, 'index.html')

          ctx.fileStats = await fs.stat(path)
          ctx.path = newUrl
        }

        await next()
      }
      catch (e) {
        const notfound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR']

        if (notfound.includes(e.code)) {
          let resolved = false
          //粗略判断路径是不是有后缀 比如 index.html一般来说，这种不是单页面路径
          if (basename(ctx.path).includes('.')) {
            if (config.page[404]) {
              ctx.path = config.page[404]
              resolved = true
            }
          }
          else {
            if (config.page.single) {
              ctx.path = config.page.single
              resolved = true
            }
          }
          if (resolved) {
            await next()
          }
          else {
            ctx.type = 'text';
            ctx.body = `
              在路径 ${ctx.path} 没有找到相关内容
              为了避免出现这个错误提示，请在config-xx.js 中加上 配置 server{ page:{404'/404.html'}}
              如果这个路径是单页路径，请指定单页的html地址 比如  server{ page:{single:'/index.html}}'
              详情请见 https://github.com/duhongwei/hotpack/blob/master/doc/config.md
              `
          }
        }
        else {
          ctx.response.type = 'text';
          ctx.response.body = e.message;
          console.error(e)
        }
      }
    }
  })
  //304
  webApp.use(async (ctx, next) => {
    if (ctx.fileStats) {
      const ifModifiedSince = ctx.request.headers['if-modified-since'];
      const lastModified = ctx.fileStats.mtime.toGMTString();
      if (ifModifiedSince === lastModified) {
        ctx.response.status = 304;
        return
      }
    }
    await next();

  })
  // server render 
  webApp.use(async (ctx, next) => {
    if (/\.html$/.test(ctx.path)) {
      let path = join(root, ctx.path.substr(1))
      let content = await fs.readFile(path, 'utf8')

      content = await replace(content, /<div\+?.*?ssr.*?><\/div>/, async (holder) => {

        let m = holder.match(/\s+?id=['"]?(.+?)['"]?\s+?/)
        if (!m) throw 'ssr no id'
        let id = m[1]

        let controllerPath = ssrConfig[ctx.path.substr(1)]

        let { default: controller } = await import(controllerPath)

        //https://github.com/yahoo/serialize-javascript 可以考虑用它来处理下state
        const { app, state } = await controller(ctx)

        let s = await renderToString(app)
        s = `<div id='${id}'>${s}</div>`
        return `${s}<script>window.__state__=${JSON.stringify(state)};\n//published at: ${new Date().toLocaleString()}</script>`
      })
      ctx.response.type = 'html';
      ctx.response.body = content;
    }
    else {
      await next()
    }
  })

  webApp.use(async (ctx) => {

    await send(ctx, ctx.path, {
      root
    })

  })

  webApp.listen(config.port)
  console.log(`server run at ${config.port}`)
}
init()