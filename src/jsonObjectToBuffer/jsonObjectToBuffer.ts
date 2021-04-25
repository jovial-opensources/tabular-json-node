import { jsonObjectToTable } from ".."
import { tableToBuffer } from ".."

/**
 * @param data JSON Object to convert
 * @returns Buffer representation of JSON Object
 */
export const jsonObjectToBuffer: (data: any) => Buffer
    = (data: any) => tableToBuffer(
        jsonObjectToTable(data)
    )
