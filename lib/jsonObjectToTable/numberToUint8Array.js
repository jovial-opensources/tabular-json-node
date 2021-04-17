"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uint8ArraytoNumber = exports.numberToUint8Array = void 0;
const SIZE_OF_NUMBER = Math.ceil(Math.log(Number.MAX_SAFE_INTEGER) / Math.log(256));
const SIZE_OF_UINT8 = 255;
/**
 * @description convert a number into Uint8Array LittleEndian notation
 * @param n input number
 */
const numberToUint8Array = (num) => {
    const buffer = Buffer.alloc(8, 0);
    buffer.writeDoubleLE(Number(num));
    return new Uint8Array(buffer);
};
exports.numberToUint8Array = numberToUint8Array;
/**
 * @description convert Uint8Array in LittleEndian notation into a number
 * @param n input number
 */
const Uint8ArraytoNumber = (bytes) => {
    const buffer = Buffer.from(bytes);
    return buffer.readDoubleLE();
};
exports.Uint8ArraytoNumber = Uint8ArraytoNumber;
