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
/**
 * @param table Object table to convert
 * @returns Return Buffer data of the table
 */
export declare const tableToBuffer: (table: ObjectTable) => Buffer;
/**
 * @param buffer Object Buffer to convert
 * @returns Object table parsed from the buffer data
 */
export declare const bufferToTable: (buffer: Buffer) => ObjectTable;
