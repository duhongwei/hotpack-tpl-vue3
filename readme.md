# hotpack 项目
## 支持编译时拼装
```html
  <!---ssr-static-begin[[app|app.js]]-->
   <div id='app'></div>
   <!--ssr-static-end-->
```
一个页面可以分成多个部分。每个部分用一个id, `[[app|app.js]]` 表示 `app`模块用`app.js`来渲染

这种用注释的方式来标记编译时拼装，是为了方便回退，如果有问题，去掉拼装标记即可，毕竟这只是一个提高体验的功能，并不是必须。

在`app.js`中

```js
//浏览器执行
if (typeof global === 'undefined') {
    app.$mount('#app')
}
//导出给服务端用的
export default function(){
    return app
}
```
## h5,pc在一个项目中
如果h5,pc项目分开，会导致复用变得困难。遇到h5,pc相互切换的时候，调试难度也会增大。所以最后把他们放在一起。但分成两个文件 夹。pc,h5。

## 文件作用域
每个文件的作用域是它的同级文件和它的子级文件。
