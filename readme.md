# Hotpack example project
Hotpack vue3 example

## Environmental preparation

node > 14  hotpack >= 12.0

```bash
npm install -g hotpack
git clone https://github.com/duhongwei/hotpack-tpl-vue3.git my-app
cd my-app/main
npm install

```

The environment is ready, please make sure to execute subsequent commands in the main directory of the my-app project

## Multi-page browser rendering

```bash
hotpack dev
```
`hotpack dev` Start the development environment，port 3000 is used by default

> hotpack dev -p 3001 is designated as port 3001

> The default command of hotpack is dev, so hotpack dev can also be written as hotpack

Open the browser and enter the URL localhost:3000 

View page source code

```html
<div id='app' pre-ssr></div>
```
`pre-ssr` means **you can** use pre-rendering. But it hasn't worked yet.

## Multi-page pre-rendering

Pre-rendering does not compile HTML on the fly like server rendering, it only generates specific static pages for specific routes at build time

In the development environment, even if there is a `pre-ssr` mark, pre-rendering is not turned on (the development environment configuration file is generally configured to not be turned on, because when we develop the page, pre-rendering is not required). To be enabled in the development environment Pre-rendering is simple

```bash
hotpack dev -r
```
View page source code

```html
<div id='app'><div class="index"><h1>Hotpack Vue3 Multi Page Egxample</h1>...
```
Vue3 is different from vue2 in that there is no rendering mark on the div

## Multi-page server rendering

Unlike pre-rendering, server-side rendering compiles and generates HTML from time to time, and renders the page in real time according to the path and data.

open page/index/index.html

```html
<div id='app' pre-ssr ></div>
```
Modify pre-ssr to ssr

```html
<div id='app' ssr ></div>
```
`ssr` means **you can** use server-side rendering. In the development environment, even with the `ssr` mark, the server-side rendering is not enabled for the same reason as the pre-rendering. The development environment uses browser rendering by default, so the development efficiency is higher. Add `-r` to the command line to enable server-side rendering

```
hotpack dev -rs
cp -r dev ../
cd ../dev
npm install
node index.js
```

Because server-side rendering requires a pure environment, copy to the upper-level directory

view page source code, and it really has been rendered.

```bash
<div id='app'><div class="index"><h1>Hotpack Vue3 Multi Page Egxample</h1>...

## Single page browser rendering

http://localhost:3000/single

> Note <div id=“app ssr”>Don't put any content here</div>

## reference

- [hotpack](https://github.com/duhongwei/hotpack) 
- [hotpack-vue3](https://github.com/duhongwei/hotpack-vue3) 
