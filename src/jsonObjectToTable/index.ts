import { numberToUint8Array, Uint8ArraytoNumber } from "./numberToUint8Array"

export type ObjectTuppleId = number
/**
 * @description [refer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
 */
export type typeOfTypes = 'undefined' | 'null' | 'boolean' | 'number' | 'bigint' | 'string' | 'array' | 'object' | 'symbol' | 'function' | 'uint8array'
export type ObjectTupple = {
    parentId: ObjectTuppleId,
    id: ObjectTuppleId,
    key: string,
    type: typeOfTypes,
    data: Uint8Array
}
export type ObjectTable = ObjectTupple[]

const tuppleFor = {
    "undefined": (id: ObjectTuppleId, parentId: ObjectTuppleId, key: string) => {
        const tupple: ObjectTupple = {
            parentId,
            id,
            key,
            type: 'undefined',
            data: new Uint8Array(0)
        }
        return tupple
    },
    "null": (id: ObjectTuppleId, parentId: ObjectTuppleId, key: string) => {
        const tupple: ObjectTupple = {
            parentId,
            id, key,
            type: 'null',
            data: new Uint8Array(0)
        }
        return tupple
    },
    "boolean": (id: ObjectTuppleId, parentId: ObjectTuppleId, key: string, value: boolean) => {
        const tupple: ObjectTupple = {
            parentId,
            id, key,
            type: 'boolean',
            data: new Uint8Array([value ? 1 : 0])
        }
        return tupple
    },
    "number": (id: ObjectTuppleId, parentId: ObjectTuppleId, key: string, value: number) => {
        const tupple: ObjectTupple = {
            parentId,
            id, key,
            type: 'number',
            data: numberToUint8Array(value)
        }
        return tupple
    },
    "bigint": (id: ObjectTuppleId, parentId: ObjectTuppleId, key: string, value: bigint | string) => {
        const tupple: ObjectTupple = {
            parentId,
            id, key,
            type: 'bigint',
            data: new Uint8Array(
                Buffer.from(
                    value.toString()
                )
            )
        }
        return tupple
    },
    "string": (id: ObjectTuppleId, parentId: ObjectTuppleId, key: string, value: string) => {
        const tupple: ObjectTupple = {
            parentId,
            id, key,
            type: 'string',
            data: new Uint8Array(
                Buffer.from(value)
            )
        }
        return tupple
    },
    "array": (id: ObjectTuppleId, parentId: ObjectTuppleId, key: string) => {
        const tupple: ObjectTupple = {
            parentId,
            id, key,
            type: 'array',
            data: new Uint8Array(0)
        }
        return tupple
    },
    "object": (id: ObjectTuppleId, parentId: ObjectTuppleId, key: string) => {
        const tupple: ObjectTupple = {
            parentId,
            id, key,
            type: 'object',
            data: new Uint8Array(0)
        }
        return tupple
    },
    "symbol": (id: ObjectTuppleId, parentId: ObjectTuppleId, key: string) => {
        const tupple: ObjectTupple = {
            parentId,
            id, key,
            type: 'symbol',
            data: new Uint8Array(0)
        }
        return tupple
    },
    "function": (id: ObjectTuppleId, parentId: ObjectTuppleId, key: string) => {
        const tupple: ObjectTupple = {
            parentId,
            id, key,
            type: 'function',
            data: new Uint8Array(0)
        }
        return tupple
    },
    "uint8array": (id: ObjectTuppleId, parentId: ObjectTuppleId, key: string, value: Buffer | Uint8Array) => {
        const tupple: ObjectTupple = {
            parentId,
            id, key,
            type: 'string',
            data: new Uint8Array(
                value
            )
        }
        return tupple
    }
}

class RecurseToTable {
    private indexUsed: number = 1

    public get newIndex(): number {
        return this.indexUsed++
    }

    private _table: ObjectTable = []

    public get table() {
        return this._table
    }

    addTupple(data: any, parentId = 0, key = '') {

        // identifing the type
        var type: typeOfTypes = typeof data
        if (typeof data === 'object') {
            if (data === null)
                type = 'null'
            if (Array.isArray(data))
                type = 'array'
            if (data instanceof Uint8Array)
                type = 'uint8array'
        }

        // setting the tupple
        const id = this.newIndex
        this._table.push(
            type === 'undefined'
                ? tuppleFor['undefined'](id, parentId, key) :
                type === 'null'
                    ? tuppleFor['null'](id, parentId, key) :
                    type === 'boolean'
                        ? tuppleFor['boolean'](id, parentId, key, data) :
                        type === 'number'
                            ? tuppleFor['number'](id, parentId, key, data) :
                            type === 'bigint'
                                ? tuppleFor['bigint'](id, parentId, key, data) :
                                type === 'string'
                                    ? tuppleFor['string'](id, parentId, key, data) :
                                    type === 'uint8array'
                                        ? tuppleFor['uint8array'](id, parentId, key, data) :
                                        type === 'symbol'
                                            ? tuppleFor['symbol'](id, parentId, key) :
                                            type === 'object'
                                                ? tuppleFor['object'](id, parentId, key) :
                                                type === 'array'
                                                    ? tuppleFor['array'](id, parentId, key) :
                                                    type === 'function'
                                                        ? tuppleFor['function'](id, parentId, key)
                                                        : tuppleFor['null'](id, parentId, key)
        )

        // continue nesting
        if (type === 'array' || type === 'object') {
            for (const i in data) {
                this.addTupple(
                    data[i], id, `${i}`
                )
            }
        }
    }

    constructor(data: any) {
        this.addTupple(data)
    }
}

/**
 * @description Converts js Object into binary format
 * @param data data as Object, Array, number, string, Buffer/Uint8Array
 * @returns data in Tabular format
 */
export const jsonObjectToTable: (data: any) => ObjectTable = (data: any) => {
    const table = (new RecurseToTable(
        data
    )).table
    return table
}

const objectFor = {
    "undefined": () => {
        return undefined
    },
    "null": () => {
        return null
    },
    "boolean": (value: Uint8Array) => {
        if (value.length !== 1) return undefined
        return value[0] !== 0
    },
    "number": (value: Uint8Array) => {
        return Uint8ArraytoNumber(value)
    },
    "bigint": (value: Uint8Array) => {
        const str = Buffer.from(value).toString()
        return BigInt(str)
    },
    "string": (value: Uint8Array) => {
        return Buffer.from(value).toString()
    },
    "array": () => {
        const array: any[] = []
        return array
    },
    "object": () => {
        return {}
    },
    "symbol": () => {
        return Symbol()
    },
    "function": () => {
        return function () { }
    },
    "uint8array": (value: Uint8Array) => {
        return value
    }
}

class RecurseToJsonObject {
    table: ObjectTable = []
    constructor(table: ObjectTable) {
        this.table = table
    }
    getObject: (_id: number) => any = (_id: number) => {
        const oRow = this.table.find(({ id }) => (id === _id))
        if (oRow === undefined) return oRow
        if (oRow.type === 'undefined') return objectFor['undefined']()
        if (oRow.type === 'null') return objectFor['null']()
        if (oRow.type === 'boolean') return objectFor['boolean'](oRow.data)
        if (oRow.type === 'number') return objectFor['number'](oRow.data)
        if (oRow.type === 'bigint') return objectFor['bigint'](oRow.data)
        if (oRow.type === 'string') return objectFor['string'](oRow.data)
        if (oRow.type === 'uint8array') return objectFor['uint8array'](oRow.data)
        if (oRow.type === 'function') return objectFor['function']()
        if (oRow.type === 'symbol') return objectFor['symbol']()
        if (oRow.type === 'array') {
            var arr = objectFor['array']()
            // filter child elements from the table
            this.table.filter(({ parentId }) => (parentId === oRow.id))
                // push parsed the filtered elements into the array
                .forEach(({ id }) => {
                    arr.push(
                        this.getObject(id)
                    )
                })

            return arr
        }
        if (oRow.type === 'object') {
            var obj = objectFor['object']()
            // filter child elements from the table
            this.table.filter(({ parentId }) => (parentId === oRow.id))
                // concat parsed the filtered elements into the object
                .forEach(({ id, key }) => {
                    obj[key] = this.getObject(id)
                })
            return obj
        }
        return undefined
    }
}

/**
 * @description Converts js Object into binary format
 * @param table Tabular data in ObjectTable format
 * @returns js object
 */
export const tableToJsonObject = <T>(table: ObjectTable) => {
    const rtjo = new RecurseToJsonObject(table)
    const result: T = rtjo.getObject(1)
    return result
}