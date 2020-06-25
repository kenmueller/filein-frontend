# Filein

<https://file-in.web.app>

> Super fast file hosting, one drag away

## Install

```bash
npm i filein
```

## Import

```js
const Filein = require('filein')

// or...

import * as Filein from 'filein'
```

## Methods

### `upload`

```js
const file = await Filein.upload(Buffer.from('Hello!'))

file.id // string
file.url // string
file.data // Buffer

// Pass in an optional Content-Type as a fallback:
const file = await Filein.upload(Buffer.from('Hello!'), 'text/plain')

// You can also call `Filein` directly:
const file = await Filein(Buffer.from('Hello!'))
```

### `download`

```js
// Pass in a file ID
const file = await Filein.download('a32bads3')

file.id // string
file.url // string
file.data // Buffer
```

### `idToUrl`

```js
const url = Filein.idToUrl('a32bads3')

url // string
```

### `urlToId`

```js
const id = Filein.urlToId('https://storage.googleapis.com/file-in.appspot.com/files/abc')

id // string
```
