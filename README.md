# tabularjson
Convert JSON Data into tabular format And convert from Tabular to Binary format

## How to use

```js
const {
    jsonObjectToBuffer,
    bufferToJsonObject
} = require('tabular-json-node')

const dataAsObject = { "Hello": { "World": [1,2,3,4] } }

// JS Object -> Buffer data
const dataAsBuffer = jsonObjectToBuffer(dataAsObject)

// Buffer data -> JS Object
const parsedObject = bufferToJsonObject(dataAsBuffer)
```

## Supported Data type

| Type Name    |
| ------------ |
| `undefined`  |
| `null`       |
| `boolean`    |
| `number`     |
| `bigint`     |
| `string`     |
| `array`      |
| `object`     |
| `symbol`     |
| `function`   |
| `uint8array` |

## Object to Tabular

To convert JS Object to Object table

```js
const {
    jsonObjectToTable
} = require('tabular-json-node')

const dataAsObject = { "Hello": { "World": [1,2,3,4] } }

// jsonObjectToTable function to convert JS Object to ObjectTable
const objectTable = jsonObjectToTable(dataAsObject)
```


## Tabular to Binary

To convert Object table to Binary format

```js
const {
    jsonObjectToTable,
    tableToBuffer
} = require('tabular-json-node')

const dataAsObject = { "Hello": { "World": [1,2,3,4] } }

const objectTable = jsonObjectToTable(dataAsObject)

// jsonObjectToTable function to convert ObjectTable to Binary format
const binaryObject = tableToBuffer(objectTable)
```

**Now we reverse**

## Binary to Table

To convert Binary data to JS Table

```js
/**
 * Binary representation of Object
 * ```
 * { hello: 'World' }
 * ```
 */
const binaryObject = new Buffer("020000000000000001000000070000000000000001000000020000000500050068656c6c6f05000000576f726c64", "hex")

const {
    bufferToTable
} = require('tabular-json-node')

// bufferToTable to convert Binary data/Buffer to JS Object
const objectTable = bufferToTable(binaryObject)
```

## Tabular to Object

To convert Object table to JS Object

```js
const binaryObject = new Buffer("020000000000000001000000070000000000000001000000020000000500050068656c6c6f05000000576f726c64", "hex")

const {
    bufferToTable,
    tableToJsonObject
} = require('tabular-json-node')

const objectTable = bufferToTable(binaryObject)

const parsedObject = tableToJsonObject(objectTable)
```