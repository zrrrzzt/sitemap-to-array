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

cd into directory and run setup

```sh
$ npm run setup
```


## Usage - callback

Pass a sitemap, either as data or an URL to the sitemap.xml.

### Example with data
```javascript
'use strict'

var fs = require('fs')
var smta = require('sitemap-to-array')
var data = fs.readFileSync('test/data/sitemap.xml', 'utf-8')

smta(data, function (error, result) {
  if (error) {
    console.error(error)
  } else {
    console.log(result)
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

### Example with URL

```javascript
'use strict'

var smta = require('sitemap-to-array')
var sitemapUrl = 'https://raw.githubusercontent.com/zrrrzzt/sitemap-to-array/master/test/data/sitemap.xml'

smta(sitemapUrl, function (error, result) {
  if (error) {
    console.error(error)
  } else {
    console.log(result)
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

## Usage - stream

pipe a stream of sitemap.xml to the module

### - Example from url

```javascript
'use strict'

var smtaStream = require('sitemap-to-array').stream
var http = require('http')
var sitemap = 'https://raw.githubusercontent.com/zrrrzzt/sitemap-to-array/master/test/data/sitemap.xml'

smtaStream.on('data', function (data) {
  console.log(data.toString())
})

http.get(sitemap, function (response) {
  response
    .pipe(smtaStream)
})

```

returns

```javascript
{ loc: 'http://www.telemark.no/Vaare-tjenester',
  lastmod: '2015-05-06T10:51:03+00:00' }
{ loc: 'http://www.telemark.no/Vaare-tjenester/Kurs-og-konferanser',
  lastmod: '2014-10-06T11:40:22+00:00' }
{ loc: 'http://www.telemark.no/Vaare-tjenester/Folkehelse',
  lastmod: '2015-03-13T07:35:30+00:00' }
{ loc: 'http://www.telemark.no/Vaare-tjenester/Folkehelse/Tilbud-HEFRES/Paa-farta-til-skolen',
  lastmod: '2015-05-24T15:56:56+00:00' }
{ loc: 'http://www.telemark.no/Vaare-tjenester/Folkehelse/Tilbud-HEFRES/Alle-barn-sykler',
  lastmod: '2015-05-22T13:46:26+00:00' } 
```

### - Example from file

```javascript
'use strict'

var smtaStream = require('sitemap-to-array').stream
var fs = require('fs')
var sitemap = fs.createReadStream('test/data/sitemap.xml')

smtaStream.on('data', function (data) {
  console.log(data.toString())
})

sitemap
  .pipe(smtaStream)

```

returns

```javascript
{ loc: 'http://www.telemark.no/Vaare-tjenester',
  lastmod: '2015-05-06T10:51:03+00:00' }
{ loc: 'http://www.telemark.no/Vaare-tjenester/Kurs-og-konferanser',
  lastmod: '2014-10-06T11:40:22+00:00' }
{ loc: 'http://www.telemark.no/Vaare-tjenester/Folkehelse',
  lastmod: '2015-03-13T07:35:30+00:00' }
{ loc: 'http://www.telemark.no/Vaare-tjenester/Folkehelse/Tilbud-HEFRES/Paa-farta-til-skolen',
  lastmod: '2015-05-24T15:56:56+00:00' }
{ loc: 'http://www.telemark.no/Vaare-tjenester/Folkehelse/Tilbud-HEFRES/Alle-barn-sykler',
  lastmod: '2015-05-22T13:46:26+00:00' } 
```