"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonObjectToBuffer = void 0;
const __1 = require("..");
const __2 = require("..");
/**
 * @param data JSON Object to convert
 * @returns Buffer representation of JSON Object
 */
const jsonObjectToBuffer = (data) => __2.tableToBuffer(__1.jsonObjectToTable(data));
exports.jsonObjectToBuffer = jsonObjectToBuffer;
