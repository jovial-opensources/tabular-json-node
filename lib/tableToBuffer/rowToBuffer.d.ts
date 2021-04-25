/// <reference types="node" />
import type { ObjectTupple } from "..";
/**
 * @param row ObjectTupple/ a Row from ObjectTable
 * @returns buffer representation of the row
 */
export declare const rowToBuffer: (row: ObjectTupple) => Buffer;
/**
 * @param buffer parent buffer data to parse from
 * @param startIndex starting index of the parent buffer to parse from
 * @returns parsed row data as ObjectTupple and endIndex where parsing ends
 */
export declare const bufferToRow: (buffer: Buffer, startIndex: number) => {
    row: ObjectTupple;
    endIndex: number;
};
