[![Build Status](https://travis-ci.org/zrrrzzt/sitemap-to-array.svg?branch=master)](https://travis-ci.org/zrrrzzt/sitemap-to-array)
[![Coverage Status](https://coveralls.io/repos/zrrrzzt/sitemap-to-array/badge.svg?branch=master&service=github)](https://coveralls.io/github/zrrrzzt/sitemap-to-array?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# sitemap-to-array

Convert a sitemap.xml to an array or stream of objects.

## Installation

From npm

```sh
$ npm install sitemap-to-array
```

From GitHub

```sh
$ git clone git@github.com:zrrrzzt/sitemap-to-array.git
```

cd into directory and install dependencies

```sh
$ npm install
```

## Usage - callback

Pass a sitemap, either as data or an URL to the sitemap.xml.

### Example with data
```javascript
'use strict'

const fs = require('fs')
const smta = require('sitemap-to-array')
const data = fs.readFileSync('test/data/sitemap.xml', 'utf-8')

smta(data, stream => {
  stream.on('error', error => {
    console.error(error)
  })
  stream.on('data', data => {
    console.log(data.toString())
  })
})
```

Returns

```javascript
{"loc":"http://www.telemark.no/Vaare-tjenester","lastmod":"2015-05-06T10:51:03+00:00"}
{"loc":"http://www.telemark.no/Vaare-tjenester/Kurs-og-konferanser","lastmod":"2014-10-06T11:40:22+00:00"}
{"loc":"http://www.telemark.no/Vaare-tjenester/Folkehelse","lastmod":"2015-03-13T07:35:30+00:00"}
{"loc":"http://www.telemark.no/Vaare-tjenester/Folkehelse/Tilbud-HEFRES/Paa-farta-til-skolen","lastmod":"2015-05-24T15:56:56+00:00"}
{"loc":"http://www.telemark.no/Vaare-tjenester/Folkehelse/Tilbud-HEFRES/Alle-barn-sykler","lastmod":"2015-05-22T13:46:26+00:00"}
```

### Example with URL

```javascript
'use strict'

const smta = require('sitemap-to-array')
const sitemapUrl = 'https://raw.githubusercontent.com/zrrrzzt/sitemap-to-array/master/test/data/sitemap.xml'

smta(sitemapUrl, stream => {
  stream.on('error', error => {
    console.error(error)
  })
  stream.on('data', data => {
    console.log(data.toString())
  })
})
```

Returns

```javascript
{"loc":"http://www.telemark.no/Vaare-tjenester","lastmod":"2015-05-06T10:51:03+00:00"}
{"loc":"http://www.telemark.no/Vaare-tjenester/Kurs-og-konferanser","lastmod":"2014-10-06T11:40:22+00:00"}
{"loc":"http://www.telemark.no/Vaare-tjenester/Folkehelse","lastmod":"2015-03-13T07:35:30+00:00"}
{"loc":"http://www.telemark.no/Vaare-tjenester/Folkehelse/Tilbud-HEFRES/Paa-farta-til-skolen","lastmod":"2015-05-24T15:56:56+00:00"}
{"loc":"http://www.telemark.no/Vaare-tjenester/Folkehelse/Tilbud-HEFRES/Alle-barn-sykler","lastmod":"2015-05-22T13:46:26+00:00"}
```
## Usage - callback - without stream

```javascript
'use strict'
const smta = require('sitemap-to-array')
const options = {
  returnOnComplete: true
}
const sitemapUrl = 'https://raw.githubusercontent.com/zrrrzzt/sitemap-to-array/master/test/data/sitemap.xml'

smta(sitemapUrl, options, (error, list) => {
  if (error) {
    console.error(error)
  } else {
    console.log(list)
  }
})
```

Returns

```javascript
[ 
  { loc: 'http://www.telemark.no/Vaare-tjenester',
    lastmod: '2015-05-06T10:51:03+00:00' },
  { loc: 'http://www.telemark.no/Vaare-tjenester/Kurs-og-konferanser',
    lastmod: '2014-10-06T11:40:22+00:00' },
  { loc: 'http://www.telemark.no/Vaare-tjenester/Folkehelse',
    lastmod: '2015-03-13T07:35:30+00:00' },
  { loc: 'http://www.telemark.no/Vaare-tjenester/Folkehelse/Tilbud-HEFRES/Paa-farta-til-skolen',
    lastmod: '2015-05-24T15:56:56+00:00' },
  { loc: 'http://www.telemark.no/Vaare-tjenester/Folkehelse/Tilbud-HEFRES/Alle-barn-sykler',
    lastmod: '2015-05-22T13:46:26+00:00' } 
]
```

## Usage - stream through

pipe a stream of sitemap.xml to the module

### - Example from url

```javascript
'use strict'

const smtaStream = require('sitemap-to-array').stream
const http = require('http')
const sitemap = 'https://raw.githubusercontent.com/zrrrzzt/sitemap-to-array/master/test/data/sitemap.xml'

smtaStream.on('data', data => {
  console.log(data.toString())
})

http.get(sitemap, response => {
  response
    .pipe(smtaStream)
})

```

returns

```javascript
{"loc":"http://www.telemark.no/Vaare-tjenester","lastmod":"2015-05-06T10:51:03+00:00"}
{"loc":"http://www.telemark.no/Vaare-tjenester/Kurs-og-konferanser","lastmod":"2014-10-06T11:40:22+00:00"}
{"loc":"http://www.telemark.no/Vaare-tjenester/Folkehelse","lastmod":"2015-03-13T07:35:30+00:00"}
{"loc":"http://www.telemark.no/Vaare-tjenester/Folkehelse/Tilbud-HEFRES/Paa-farta-til-skolen","lastmod":"2015-05-24T15:56:56+00:00"}
{"loc":"http://www.telemark.no/Vaare-tjenester/Folkehelse/Tilbud-HEFRES/Alle-barn-sykler","lastmod":"2015-05-22T13:46:26+00:00"}
```

### - Example from file

```javascript
'use strict'

const smtaStream = require('sitemap-to-array').stream
const fs = require('fs')
const sitemap = fs.createReadStream('test/data/sitemap.xml')

smtaStream.on('data', data => {
  console.log(data.toString())
})

sitemap
  .pipe(smtaStream)

```

returns

```javascript
{"loc":"http://www.telemark.no/Vaare-tjenester","lastmod":"2015-05-06T10:51:03+00:00"}
{"loc":"http://www.telemark.no/Vaare-tjenester/Kurs-og-konferanser","lastmod":"2014-10-06T11:40:22+00:00"}
{"loc":"http://www.telemark.no/Vaare-tjenester/Folkehelse","lastmod":"2015-03-13T07:35:30+00:00"}
{"loc":"http://www.telemark.no/Vaare-tjenester/Folkehelse/Tilbud-HEFRES/Paa-farta-til-skolen","lastmod":"2015-05-24T15:56:56+00:00"}
{"loc":"http://www.telemark.no/Vaare-tjenester/Folkehelse/Tilbud-HEFRES/Alle-barn-sykler","lastmod":"2015-05-22T13:46:26+00:00"} 
```

## License

[MIT](LICENSE)
