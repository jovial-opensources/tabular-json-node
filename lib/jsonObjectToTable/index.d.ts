export declare type ObjectTuppleId = number;
/**
 * @description [refer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
 */
export declare type typeOfTypes = 'undefined' | 'null' | 'boolean' | 'number' | 'bigint' | 'string' | 'array' | 'object' | 'symbol' | 'function' | 'uint8array';
export declare type ObjectTupple = {
    /**
     * @description Id of the parent Object/Array in the Object table
     */
    parentId: ObjectTuppleId;
    /**
     * @description Unique serial Id of all the rows in Object table
     */
    id: ObjectTuppleId;
    /**
     * @description Unique key for child elements of an Array or Object
     */
    key: string;
    /**
     * @description Data type of data stored in the row
     */
    type: typeOfTypes;
    /**
     * @description Data parsed as Uint8Array using tuppleFor[] methods
     */
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
