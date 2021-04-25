"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferToJsonObject = void 0;
const __1 = require("..");
/**
 * @param buffer Buffer data to convert to JSON object
 * @returns parsed JSON Object
 */
const bufferToJsonObject = (buffer) => {
    const object = __1.tableToJsonObject(__1.bufferToTable(buffer));
    return object;
};
exports.bufferToJsonObject = bufferToJsonObject;
