import { bufferToTable, tableToJsonObject } from ".."

export const bufferToJsonObject = <T>(buffer: Buffer) => {
    const object: T = tableToJsonObject(
        bufferToTable(buffer)
    )
    return object
}