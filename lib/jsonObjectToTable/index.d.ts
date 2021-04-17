export declare type ObjectTuppleId = number;
/**
 * @description [refer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
 */
export declare type typeOfTypes = 'undefined' | 'null' | 'boolean' | 'number' | 'bigint' | 'string' | 'array' | 'object' | 'symbol' | 'function' | 'uint8array';
export declare type ObjectTupple = {
    parentId: ObjectTuppleId;
    id: ObjectTuppleId;
    key: string;
    type: typeOfTypes;
    data: Uint8Array;
};
export declare type ObjectTable = ObjectTupple[];
/**
 * @description Converts js Object into binary format
 * @param data data as Object, Array, number, string, Buffer/Uint8Array
 * @returns data in Tabular format
 */
export declare const jsonObjectToTable: (data: any) => ObjectTable;
/**
 * @description Converts js Object into binary format
 * @param table Tabular data in ObjectTable format
 * @returns js object
 */
export declare const tableToJsonObject: <T>(table: ObjectTable) => T;
