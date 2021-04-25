import { bufferToTable, tableToJsonObject } from ".."

/**
 * @param buffer Buffer data to convert to JSON object
 * @returns parsed JSON Object
 */
export const bufferToJsonObject = <T>(buffer: Buffer) => {
    const object: T = tableToJsonObject(
        bufferToTable(buffer)
    )
    return object
}