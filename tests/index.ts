// import { describe, it } from 'mocha'
import { numberToUint8Array, Uint8ArraytoNumber } from '../lib/jsonObjectToTable/numberToUint8Array'
import { jsonObjectToTable, tableToJsonObject, tableToBuffer, bufferToTable } from '../lib/index'
import { bufferToRow, rowToBuffer } from '../lib/tableToBuffer/rowToBuffer'
import { sampleData, sampleTable, biggerSampleData } from './sample'
const assert = require('assert')

describe("numberToUint8Array/Uint8ArraytoNumber", () => {
    it("numberToUint8Array", () => {
        const num = Math.random() * 10
        const u_int_8_array = numberToUint8Array(num)
    })
    it("Uint8ArraytoNumber", () => {
        /**
         * must have 8 bytes
         */
        const u_int_8_array = new Uint8Array([81, 111, 106, 0, 0, 0, 0, 0])
        const num = Uint8ArraytoNumber(u_int_8_array)
    })
    it("numberToUint8Array to Uint8ArraytoNumber", () => {
        const num = Math.floor(Math.random() * 10)
        const u_int_8_array = numberToUint8Array(num)
        const resNum = Uint8ArraytoNumber(u_int_8_array)
        assert.strictEqual(
            num, resNum
        )
    })
})

describe("jsonObjectToTable/", () => {
    it("jsonObjectToTable stability", () => {
        const table = jsonObjectToTable(sampleData).map((row) => (
            {
                parentId: row.parentId,
                id: row.id,
                key: row.key,
                type: row.type,
                data: Array.from(row.data)
            }
        ))
        assert.deepStrictEqual(table, sampleTable)
    })
    it("tableToJsonObject stability", () => {
        const obj = tableToJsonObject(
            sampleTable.map((row) => (
                {
                    parentId: row.parentId,
                    id: row.id,
                    key: row.key,
                    type: row.type,
                    data: new Uint8Array(row.data)
                }
            ))
        )
        assert.deepStrictEqual(obj, sampleData)
    })
    it("jsonObjectToTable - tableToJsonObject", () => {
        const table = jsonObjectToTable(biggerSampleData)
        const obj = tableToJsonObject(table)
        assert.deepStrictEqual(obj, biggerSampleData)
    })
})

describe("rowToBuffer/", () => {
    it("rowToBuffer", () => {
        const initTable = sampleTable.map((row) => (
            {
                parentId: row.parentId,
                id: row.id,
                key: row.key,
                type: row.type,
                data: new Uint8Array(row.data)
            }
        ))
        const testRow = initTable[1]
        const buffer = rowToBuffer(testRow)
        const res = bufferToRow(buffer, 0)
        assert.deepStrictEqual(res.row, testRow)
        assert.deepEqual(res.endIndex, buffer.length)
    })
})

describe("tableToBuffer/", () => {
    it("tableToBufferToTable", () => {
        const initTable = sampleTable.map((row) => (
            {
                parentId: row.parentId,
                id: row.id,
                key: row.key,
                type: row.type,
                data: new Uint8Array(row.data)
            }
        ))
        const buffer = tableToBuffer(initTable)
        const res = bufferToTable(buffer)
        assert.deepStrictEqual(res, initTable)
    })
    it("jsonTorowBufferToBufferTorowBufferTojson", () => {
        const initTable = jsonObjectToTable(biggerSampleData)
        const tableBuffer = tableToBuffer(initTable)
        const table = bufferToTable(tableBuffer)
        const obj = tableToJsonObject(table)
        assert.deepStrictEqual(obj, biggerSampleData)
    })
})