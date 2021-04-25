"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferToRow = exports.rowToBuffer = void 0;
const _1 = require(".");
/**
 * @param row ObjectTupple/ a Row from ObjectTable
 * @returns buffer representation of the row
 */
const rowToBuffer = (row) => {
    /**
     * @description parentId as Buffer in 32bits LittleEndian
     * @description UInt32LE
     */
    const parentIdBufferValue = Buffer.alloc(4);
    parentIdBufferValue.writeUInt32LE(row.parentId);
    /**
     * @description id as Buffer in 32bits LittleEndian
     * @description UInt32LE
     */
    const idBufferValue = Buffer.alloc(4);
    idBufferValue.writeUInt32LE(row.id);
    /**
     * @description type enum value as Buffer in 16bits LittleEndian
     * @description UInt16LE
     */
    const typeEnumBufferValue = Buffer.alloc(2);
    typeEnumBufferValue.writeUInt16LE(_1.typeOfTypesEmum[row.type]);
    /**
     * @description key length as Buffer in 16bits LittleEndian
     * @description UInt16LE
     */
    const keyLengthBufferValue = Buffer.alloc(2);
    keyLengthBufferValue.writeUInt16LE(row.key.length);
    /**
     * @description key as Buffer
     */
    const keyStringBufferValue = Buffer.from(row.key);
    /**
     * @description data length as Buffer in 32bits LittleEndian
     * @description UInt32LE
     */
    const dataLengthBufferValue = Buffer.alloc(4);
    dataLengthBufferValue.writeUInt32LE(row.data.length);
    return Buffer.concat([
        parentIdBufferValue,
        idBufferValue,
        typeEnumBufferValue,
        keyLengthBufferValue,
        keyStringBufferValue,
        dataLengthBufferValue,
        row.data // 0 to 2^32 bytes
    ]);
};
exports.rowToBuffer = rowToBuffer;
/**
 * @param typeEnumValue positive integer value as number from enum `typeOfTypesEmum`
 * @returns type name
 */
const toType = (typeEnumValue) => {
    const res = _1.typeOfTypesEmum[typeEnumValue];
    const type = res;
    return type;
};
/**
 * @param buffer parent buffer data to parse from
 * @param startIndex starting index of the parent buffer to parse from
 * @returns parsed row data as ObjectTupple and endIndex where parsing ends
 */
const bufferToRow = (buffer, startIndex) => {
    var bufferIndex = startIndex;
    /**
     * @description parentId as number from UInt32LE Buffer
     */
    const parentId = buffer.slice(bufferIndex, bufferIndex + 4).readUInt32LE();
    bufferIndex += 4;
    /**
     * @description id as number
     */
    const id = buffer.slice(bufferIndex, bufferIndex + 4).readUInt32LE();
    bufferIndex += 4;
    /**
     * @description type enum value as number
     */
    const typeEnumValue = buffer.slice(bufferIndex, bufferIndex + 2).readUInt16LE();
    bufferIndex += 2;
    /**
     * @description type as string
     */
    const type = toType(typeEnumValue);
    /**
     * @description key length as number
     */
    const keyLength = buffer.slice(bufferIndex, bufferIndex + 2).readUInt16LE();
    bufferIndex += 2;
    /**
     * @description key as Buffer
     */
    const key = buffer.slice(bufferIndex, bufferIndex + keyLength).toString();
    bufferIndex += keyLength;
    /**
     * @description data length as number
     */
    const dataLength = buffer.slice(bufferIndex, bufferIndex + 4).readUInt32LE();
    bufferIndex += 4;
    /**
     * @description data as Uint8Array
     */
    const data = new Uint8Array(buffer.slice(bufferIndex, bufferIndex + dataLength));
    bufferIndex += dataLength;
    const row = {
        parentId,
        id,
        key,
        type,
        data
    };
    return {
        row, endIndex: bufferIndex
    };
};
exports.bufferToRow = bufferToRow;
