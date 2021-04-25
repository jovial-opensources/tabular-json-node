import type { ObjectTable } from "..";
import { numberToUint8Array } from "../jsonObjectToTable/numberToUint8Array";
import { bufferToRow, rowToBuffer } from "./rowToBuffer"

export enum typeOfTypesEmum { undefined, null, boolean, number, bigint, string, array, object, symbol, function, uint8array }

/**
 * @param table Object table to convert
 * @returns Return Buffer data of the table
 */
export const tableToBuffer = (table: ObjectTable) => {
    /**
     * @description number as rows in the table stored as Buffer in 32bit LittleEndian format
     */
    const tableLengthBufferValue = Buffer.alloc(4)
    tableLengthBufferValue.writeUInt32LE(table.length)
    const rowBufferCollection = table.map(row => rowToBuffer(row))
    return Buffer.concat([
        tableLengthBufferValue,             // 32 bits = 4 bytes
        Buffer.concat(rowBufferCollection)
    ])
}

/**
 * @param buffer Object Buffer to convert
 * @returns Object table parsed from the buffer data
 */
export const bufferToTable = (buffer: Buffer) => {
    /**
     * @description number as rows in the table stored as Buffer in 32bit LittleEndian format
     */
    const tableLength = buffer.slice(0, 4).readUInt32LE()
    var bufferIndex = 4
    
    var table: ObjectTable = []

    for (var i = 0; i < tableLength; i++) {
        const { row, endIndex } = bufferToRow(
            buffer,
            bufferIndex
        )
        
        bufferIndex = endIndex
        table.push(row)
    }

    return table
}