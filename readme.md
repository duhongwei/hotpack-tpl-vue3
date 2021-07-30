# hotpack template of vue3

## dev

```bash
npm install
npm run start
```
localhost:3000

## production

```bash
npm install
# no server by default.  start server,  npm run build -s
npm run build
```
localhost:3000

## server render

```bash
npm install
npm run build
cd dist
npm install
node index.js
```
localhost:3000