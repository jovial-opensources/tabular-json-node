"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferToTable = exports.tableToBuffer = exports.typeOfTypesEmum = void 0;
require("../jsonObjectToTable/numberToUint8Array");
const rowToBuffer_1 = require("./rowToBuffer");
var typeOfTypesEmum;
(function (typeOfTypesEmum) {
    typeOfTypesEmum[typeOfTypesEmum["undefined"] = 0] = "undefined";
    typeOfTypesEmum[typeOfTypesEmum["null"] = 1] = "null";
    typeOfTypesEmum[typeOfTypesEmum["boolean"] = 2] = "boolean";
    typeOfTypesEmum[typeOfTypesEmum["number"] = 3] = "number";
    typeOfTypesEmum[typeOfTypesEmum["bigint"] = 4] = "bigint";
    typeOfTypesEmum[typeOfTypesEmum["string"] = 5] = "string";
    typeOfTypesEmum[typeOfTypesEmum["array"] = 6] = "array";
    typeOfTypesEmum[typeOfTypesEmum["object"] = 7] = "object";
    typeOfTypesEmum[typeOfTypesEmum["symbol"] = 8] = "symbol";
    typeOfTypesEmum[typeOfTypesEmum["function"] = 9] = "function";
    typeOfTypesEmum[typeOfTypesEmum["uint8array"] = 10] = "uint8array";
})(typeOfTypesEmum = exports.typeOfTypesEmum || (exports.typeOfTypesEmum = {}));
const tableToBuffer = (table) => {
    /**
     * @description number as rows in the table stored as Buffer in 32bit LittleEndian format
     */
    const tableLengthBufferValue = Buffer.alloc(32);
    tableLengthBufferValue.readUInt32LE(table.length);
    const rowBufferCollection = table.map(row => rowToBuffer_1.rowToBuffer(row));
    return Buffer.concat([
        tableLengthBufferValue,
        Buffer.concat(rowBufferCollection)
    ]);
};
exports.tableToBuffer = tableToBuffer;
const bufferToTable = (buffer) => {
    /**
     * @description number as rows in the table stored as Buffer in 32bit LittleEndian format
     */
    const tableLength = buffer.slice(0, 4).readUInt32LE();
    var bufferIndex = 4;
    var table = [];
    for (var i = 0; i < tableLength; i++) {
        const { row, endIndex } = rowToBuffer_1.bufferToRow(buffer, bufferIndex);
        bufferIndex = endIndex;
        table.push(row);
    }
    return table;
};
exports.bufferToTable = bufferToTable;
