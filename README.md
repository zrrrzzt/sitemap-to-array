[![Build Status](https://travis-ci.org/zrrrzzt/sitemap-to-array.svg?branch=master)](https://travis-ci.org/zrrrzzt/sitemap-to-array)
[![Coverage Status](https://coveralls.io/repos/zrrrzzt/sitemap-to-array/badge.svg?branch=master&service=github)](https://coveralls.io/github/zrrrzzt/sitemap-to-array?branch=master)
# sitemap-to-array
Convert sitemap.xml to an array of objects.

## Installation

From npm

```sh
$ npm install sitemap-to-array
```

## Usage

Pass an options object with data or url to sitemap

```javascript
'use strict';

var fs = require('fs');
var smta = require('sitemap-to-array');
var data = fs.readFileSync('test/data/sitemap.xml', 'utf-8');
var options = {data:data};

smta(options, function(error, result){
  if (error) {
    console.error(error);
  } else {
    console.log(result);
  }
});
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

```javascript
'use strict';

var smta = require('sitemap-to-array');
var options = {url:'https://raw.githubusercontent.com/zrrrzzt/sitemap-to-array/master/test/data/sitemap.xml'};

smta(options, function(error, result){
  if (error) {
    console.error(error);
  } else {
    console.log(result);
  }
});
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