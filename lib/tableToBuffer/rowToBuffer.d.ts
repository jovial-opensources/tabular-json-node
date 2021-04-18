/// <reference types="node" />
import type { ObjectTupple } from "..";
export declare const rowToBuffer: (row: ObjectTupple) => Buffer;
export declare const bufferToRow: (buffer: Buffer, startIndex: number) => {
    row: ObjectTupple;
    endIndex: number;
};
