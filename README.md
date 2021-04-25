# tabularjson
Convert JSON Data into tabular format And convert from Tabular to Binary format

## How to use

```js
const {
    jsonObjectToBuffer,
    bufferToJsonObject
} = require('tabular-json-node')

const dataAsObject = { "Hello": { "World": [1,2,3,4] } }

const dataAsBuffer = jsonObjectToBuffer(dataAsObject)
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

## Tabular to Binary