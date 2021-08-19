import Koa from 'koa'
import { basename, join, resolve } from 'path'
import fs from 'fs-extra'
import send from 'koa-send'
import merge from 'deepmerge'
import { pathToFileURL } from 'url'

//https://github.com/edorivai/koa-proxy
//import proxy from 'koa-proxy';
import { ssr } from '@duhongwei/hotpack-vue3'

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

  let { default: configBase } = await import('./config-base.js')
  let { default: config } = await import(configPath)
  config = merge.all([configBase, config])
  let webApp = new Koa()
  /* if (config.proxy) {
    webApp.use(proxy(config.proxy));
  }
 */
  webApp.use(async (ctx, next) => {
    if (ctx.path.indexOf('..') > -1) {
      ctx.response.type = 'text';
      ctx.response.body = 'invalid path';
      console.error('has .. in path!')
    }
    else {
      let path = join(root, ctx.path.substr(1))
      try {
        ctx.fileStats = await fs.stat(path)

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
          //single page
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
              ${ctx.path} ,file not exist!
              to avoid error,please add  page:{404'/404.html'} in   .hotpack/base.js
              if you are using single page add page:{single:'/index.html'}
              more detail   https://github.com/duhongwei/hotpack/blob/master/doc/config.md
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
      path = ssrConfig[ctx.path.substr(1)]
      path = resolve(path)
      path = pathToFileURL(path).href
      content = await ssr({ content, path, ctx })

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