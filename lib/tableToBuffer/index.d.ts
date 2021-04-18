/// <reference types="node" />
import type { ObjectTable } from "..";
export declare enum typeOfTypesEmum {
    undefined = 0,
    null = 1,
    boolean = 2,
    number = 3,
    bigint = 4,
    string = 5,
    array = 6,
    object = 7,
    symbol = 8,
    function = 9,
    uint8array = 10
}
export declare const tableToBuffer: (table: ObjectTable) => Buffer;
export declare const bufferToTable: (buffer: Buffer) => ObjectTable;
