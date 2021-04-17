const { jsonObjectToTable, tableToJsonObject } = require('tabularjson')
const questions = require('./sample/questions.json')

const tablular = jsonObjectToTable(questions)

console.table(tablular)

const obj = tableToJsonObject(tablular)

console.log(obj);