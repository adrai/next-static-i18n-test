Originally "inspired" by: https://github.com/leerob/leerob.io

can handle i18next stuff in react...
and language specific markdown files...

check this out: https://github.com/adrai/next-static-i18n-test/blob/main/pages/%5Blocale%5D/index.js


---

The proof this works on a static server (SSG):

```sh
npm i
npm run out
```

then copy the out folder to a static server or run one locally, i.e. with [http-server](https://github.com/http-party/http-server), like: `http-server -s -p 5000 out`