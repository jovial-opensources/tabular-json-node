"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferToTable = exports.tableToBuffer = exports.tableToJsonObject = exports.jsonObjectToTable = void 0;
const jsonObjectToTable_1 = require("./jsonObjectToTable");
Object.defineProperty(exports, "jsonObjectToTable", { enumerable: true, get: function () { return jsonObjectToTable_1.jsonObjectToTable; } });
Object.defineProperty(exports, "tableToJsonObject", { enumerable: true, get: function () { return jsonObjectToTable_1.tableToJsonObject; } });
const tableToBuffer_1 = require("./tableToBuffer");
Object.defineProperty(exports, "tableToBuffer", { enumerable: true, get: function () { return tableToBuffer_1.tableToBuffer; } });
Object.defineProperty(exports, "bufferToTable", { enumerable: true, get: function () { return tableToBuffer_1.bufferToTable; } });
