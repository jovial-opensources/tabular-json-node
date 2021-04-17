"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableToJsonObject = exports.jsonObjectToTable = void 0;
const numberToUint8Array_1 = require("./numberToUint8Array");
const tuppleFor = {
    "undefined": (id, parentId, key) => {
        const tupple = {
            parentId,
            id,
            key,
            type: 'undefined',
            data: new Uint8Array(0)
        };
        return tupple;
    },
    "null": (id, parentId, key) => {
        const tupple = {
            parentId,
            id, key,
            type: 'null',
            data: new Uint8Array(0)
        };
        return tupple;
    },
    "boolean": (id, parentId, key, value) => {
        const tupple = {
            parentId,
            id, key,
            type: 'boolean',
            data: new Uint8Array([value ? 1 : 0])
        };
        return tupple;
    },
    "number": (id, parentId, key, value) => {
        const tupple = {
            parentId,
            id, key,
            type: 'number',
            data: numberToUint8Array_1.numberToUint8Array(value)
        };
        return tupple;
    },
    "bigint": (id, parentId, key, value) => {
        const tupple = {
            parentId,
            id, key,
            type: 'bigint',
            data: new Uint8Array(Buffer.from(value.toString()))
        };
        return tupple;
    },
    "string": (id, parentId, key, value) => {
        const tupple = {
            parentId,
            id, key,
            type: 'string',
            data: new Uint8Array(Buffer.from(value))
        };
        return tupple;
    },
    "array": (id, parentId, key) => {
        const tupple = {
            parentId,
            id, key,
            type: 'array',
            data: new Uint8Array(0)
        };
        return tupple;
    },
    "object": (id, parentId, key) => {
        const tupple = {
            parentId,
            id, key,
            type: 'object',
            data: new Uint8Array(0)
        };
        return tupple;
    },
    "symbol": (id, parentId, key) => {
        const tupple = {
            parentId,
            id, key,
            type: 'symbol',
            data: new Uint8Array(0)
        };
        return tupple;
    },
    "function": (id, parentId, key) => {
        const tupple = {
            parentId,
            id, key,
            type: 'function',
            data: new Uint8Array(0)
        };
        return tupple;
    },
    "uint8array": (id, parentId, key, value) => {
        const tupple = {
            parentId,
            id, key,
            type: 'string',
            data: new Uint8Array(value)
        };
        return tupple;
    }
};
class RecurseToTable {
    constructor(data) {
        this.indexUsed = 1;
        this._table = [];
        this.addTupple(data);
    }
    get newIndex() {
        return this.indexUsed++;
    }
    get table() {
        return this._table;
    }
    addTupple(data, parentId = 0, key = '') {
        // identifing the type
        var type = typeof data;
        if (typeof data === 'object') {
            if (data === null)
                type = 'null';
            if (Array.isArray(data))
                type = 'array';
            if (data instanceof Uint8Array)
                type = 'uint8array';
        }
        // setting the tupple
        const id = this.newIndex;
        this._table.push(type === 'undefined'
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
                                                    : tuppleFor['null'](id, parentId, key));
        // continue nesting
        if (type === 'array' || type === 'object') {
            for (const i in data) {
                this.addTupple(data[i], id, `${i}`);
            }
        }
    }
}
/**
 * @description Converts js Object into binary format
 * @param data data as Object, Array, number, string, Buffer/Uint8Array
 * @returns data in Tabular format
 */
const jsonObjectToTable = (data) => {
    const table = (new RecurseToTable(data)).table;
    return table;
};
exports.jsonObjectToTable = jsonObjectToTable;
const objectFor = {
    "undefined": () => {
        return undefined;
    },
    "null": () => {
        return null;
    },
    "boolean": (value) => {
        if (value.length !== 1)
            return undefined;
        return value[0] !== 0;
    },
    "number": (value) => {
        return numberToUint8Array_1.Uint8ArraytoNumber(value);
    },
    "bigint": (value) => {
        const str = Buffer.from(value).toString();
        return BigInt(str);
    },
    "string": (value) => {
        return Buffer.from(value).toString();
    },
    "array": () => {
        const array = [];
        return array;
    },
    "object": () => {
        return {};
    },
    "symbol": () => {
        return Symbol();
    },
    "function": () => {
        return function () { };
    },
    "uint8array": (value) => {
        return value;
    }
};
class RecurseToJsonObject {
    constructor(table) {
        this.table = [];
        this.getObject = (_id) => {
            const oRow = this.table.find(({ id }) => (id === _id));
            if (oRow === undefined)
                return oRow;
            if (oRow.type === 'undefined')
                return objectFor['undefined']();
            if (oRow.type === 'null')
                return objectFor['null']();
            if (oRow.type === 'boolean')
                return objectFor['boolean'](oRow.data);
            if (oRow.type === 'number')
                return objectFor['number'](oRow.data);
            if (oRow.type === 'bigint')
                return objectFor['bigint'](oRow.data);
            if (oRow.type === 'string')
                return objectFor['string'](oRow.data);
            if (oRow.type === 'uint8array')
                return objectFor['uint8array'](oRow.data);
            if (oRow.type === 'function')
                return objectFor['function']();
            if (oRow.type === 'symbol')
                return objectFor['symbol']();
            if (oRow.type === 'array') {
                var arr = objectFor['array']();
                // filter child elements from the table
                this.table.filter(({ parentId }) => (parentId === oRow.id))
                    // push parsed the filtered elements into the array
                    .forEach(({ id }) => {
                    arr.push(this.getObject(id));
                });
                return arr;
            }
            if (oRow.type === 'object') {
                var obj = objectFor['object']();
                // filter child elements from the table
                this.table.filter(({ parentId }) => (parentId === oRow.id))
                    // concat parsed the filtered elements into the object
                    .forEach(({ id, key }) => {
                    obj[key] = this.getObject(id);
                });
                return obj;
            }
            return undefined;
        };
        this.table = table;
    }
}
/**
 * @description Converts js Object into binary format
 * @param table Tabular data in ObjectTable format
 * @returns js object
 */
const tableToJsonObject = (table) => {
    const rtjo = new RecurseToJsonObject(table);
    const result = rtjo.getObject(1);
    return result;
};
exports.tableToJsonObject = tableToJsonObject;
