import { jsonObjectToTable } from ".."
import { tableToBuffer } from ".."

export const jsonObjectToBuffer: (data: any) => Buffer
    = (data: any) => tableToBuffer(
        jsonObjectToTable(data)
    )
