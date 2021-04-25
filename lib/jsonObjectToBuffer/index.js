"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonObjectToBuffer = void 0;
const jsonObjectToTable_1 = require("../jsonObjectToTable");
const tableToBuffer_1 = require("../tableToBuffer");
const jsonObjectToBuffer = (data) => tableToBuffer_1.tableToBuffer(jsonObjectToTable_1.jsonObjectToTable(data));
exports.jsonObjectToBuffer = jsonObjectToBuffer;
