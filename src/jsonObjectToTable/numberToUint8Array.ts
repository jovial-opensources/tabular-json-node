const SIZE_OF_NUMBER = Math.ceil(Math.log(Number.MAX_SAFE_INTEGER) / Math.log(256))
const SIZE_OF_UINT8 = 255
/**
 * @description convert a number into Uint8Array LittleEndian notation
 * @param n input number
 */
export const numberToUint8Array = (num: number | string) => {
    const buffer = Buffer.alloc(8, 0)
    buffer.writeDoubleLE(Number(num))
    return new Uint8Array(buffer)
}

/**
 * @description convert Uint8Array in LittleEndian notation into a number
 * @param n input number
 */
export const Uint8ArraytoNumber = (bytes: Uint8Array) => {
    const buffer = Buffer.from(bytes)
    return buffer.readDoubleLE()
}
