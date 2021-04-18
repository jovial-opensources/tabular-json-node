import type { ObjectTupple, typeOfTypes } from "..";
import { typeOfTypesEmum } from '.'

export const rowToBuffer = (row: ObjectTupple) => {
    /**
     * @description parentId as Buffer in 32bits LittleEndian
     * @description UInt32LE
     */
    const parentIdBufferValue = Buffer.alloc(4)
    parentIdBufferValue.writeUInt32LE(row.parentId);

    /**
     * @description id as Buffer in 32bits LittleEndian
     * @description UInt32LE
     */
    const idBufferValue = Buffer.alloc(4)
    idBufferValue.writeUInt32LE(row.id);

    /**
     * @description type enum value as Buffer in 16bits LittleEndian
     * @description UInt16LE
     */
    const typeEnumBufferValue = Buffer.alloc(2)
    typeEnumBufferValue.writeUInt16LE(typeOfTypesEmum[row.type])
    /**
     * @description key length as Buffer in 16bits LittleEndian
     * @description UInt16LE
     */
    const keyLengthBufferValue = Buffer.alloc(2)
    keyLengthBufferValue.writeUInt16LE(row.key.length);
    /**
     * @description key as Buffer
     */
    const keyStringBufferValue = Buffer.from(row.key)
    /**
     * @description data length as Buffer in 32bits LittleEndian
     * @description UInt32LE
     */
    const dataLengthBufferValue = Buffer.alloc(4)
    dataLengthBufferValue.writeUInt32LE(row.data.length)

    return Buffer.concat([
        parentIdBufferValue,    // 32bits = 4bytes
        idBufferValue,          // 32bits = 4bytes
        typeEnumBufferValue,    // 16bits = 2bytes
        keyLengthBufferValue,   // 16bits = 2bytes
        keyStringBufferValue,   // 1 to 2^16 bytes
        dataLengthBufferValue,  // 32bits = 4bytes
        row.data                // 0 to 2^32 bytes
    ])
}

const toType = (typeEnumValue: number) => {
    const res: any = typeOfTypesEmum[typeEnumValue]
    const type: typeOfTypes = res
    return type
}

export const bufferToRow = (buffer: Buffer, startIndex: number) => {
    var bufferIndex = startIndex
    /**
     * @description parentId as number from UInt32LE Buffer
     */
    const parentId = buffer.slice(bufferIndex, bufferIndex + 4).readUInt32LE()
    bufferIndex += 4
    /**
     * @description id as number
     */
    const id = buffer.slice(bufferIndex, bufferIndex + 4).readUInt32LE()
    bufferIndex += 4
    /**
     * @description type enum value as number
     */
    const typeEnumValue = buffer.slice(bufferIndex, bufferIndex + 2).readUInt16LE()
    bufferIndex += 2
    /**
     * @description type as string
     */
    const type = toType(typeEnumValue)
    /**
     * @description key length as number
     */
    const keyLength = buffer.slice(bufferIndex, bufferIndex + 2).readUInt16LE()
    bufferIndex += 2
    /**
     * @description key as Buffer
     */
    const key = buffer.slice(bufferIndex, bufferIndex + keyLength).toString();

    bufferIndex += keyLength
    /**
     * @description data length as number
     */
    const dataLength = buffer.slice(bufferIndex, bufferIndex + 4).readUInt32LE()
    bufferIndex += 4
    /**
     * @description data as Uint8Array
     */
    const data = new Uint8Array(
        buffer.slice(bufferIndex, bufferIndex + dataLength)
    )
    bufferIndex += dataLength
    const row: ObjectTupple = {
        parentId,
        id,
        key,
        type,
        data
    }

    return {
        row, endIndex: bufferIndex
    }
}