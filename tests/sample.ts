export const sampleTable = JSON.parse(`
[{"parentId":0,"id":1,"key":"","type":"object","data":[]},{"parentId":1,"id":2,"key":"glossary","type":"object","data":[]},{"parentId":2,"id":3,"key":"title","type":"string","data":[101,120,97,109,112,108,101,32,103,108,111,115,115,97,114,121]},{"parentId":2,"id":4,"key":"GlossDiv","type":"object","data":[]},{"parentId":4,"id":5,"key":"title","type":"string","data":[83]},{"parentId":4,"id":6,"key":"GlossList","type":"object","data":[]},{"parentId":6,"id":7,"key":"GlossEntry","type":"object","data":[]},{"parentId":7,"id":8,"key":"ID","type":"string","data":[83,71,77,76]},{"parentId":7,"id":9,"key":"SortAs","type":"string","data":[83,71,77,76]},{"parentId":7,"id":10,"key":"GlossTerm","type":"string","data":[83,116,97,110,100,97,114,100,32,71,101,110,101,114,97,108,105,122,101,100,32,77,97,114,107,117,112,32,76,97,110,103,117,97,103,101]},{"parentId":7,"id":11,"key":"Acronym","type":"string","data":[83,71,77,76]},{"parentId":7,"id":12,"key":"Abbrev","type":"string","data":[73,83,79,32,56,56,55,57,58,49,57,56,54]},{"parentId":7,"id":13,"key":"GlossDef","type":"object","data":[]},{"parentId":13,"id":14,"key":"para","type":"string","data":[65,32,109,101,116,97,45,109,97,114,107,117,112,32,108,97,110,103,117,97,103,101,44,32,117,115,101,100,32,116,111,32,99,114,101,97,116,101,32,109,97,114,107,117,112,32,108,97,110,103,117,97,103,101,115,32,115,117,99,104,32,97,115,32,68,111,99,66,111,111,107,46]},{"parentId":13,"id":15,"key":"GlossSeeAlso","type":"array","data":[]},{"parentId":15,"id":16,"key":"0","type":"string","data":[71,77,76]},{"parentId":15,"id":17,"key":"1","type":"string","data":[88,77,76]},{"parentId":7,"id":18,"key":"GlossSee","type":"string","data":[109,97,114,107,117,112]}]
`)

export const sampleData = JSON.parse(`
{
    "glossary": {
        "title": "example glossary",
		"GlossDiv": {
            "title": "S",
			"GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
					"SortAs": "SGML",
					"GlossTerm": "Standard Generalized Markup Language",
					"Acronym": "SGML",
					"Abbrev": "ISO 8879:1986",
					"GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
						"GlossSeeAlso": ["GML", "XML"]
                    },
					"GlossSee": "markup"
                }
            }
        }
    }
}
`)

export const biggerSampleData = JSON.parse(`
[
	{
		"id": "0001",
		"type": "donut",
		"name": "Cake",
		"ppu": 0.000155,
		"batters":
			{
				"batter":
					[
						{ "id": "1001", "type": "Regular" },
						{ "id": "1002", "type": "Chocolate" },
						{ "id": "1003", "type": "Blueberry" },
						{ "id": "1004", "type": "Devil's Food" }
					]
			},
		"topping":
			[
				{ "id": "5001", "type": "None" },
				{ "id": "5002", "type": "Glazed" },
				{ "id": "5005", "type": "Sugar" },
				{ "id": "5007", "type": "Powdered Sugar" },
				{ "id": "5006", "type": "Chocolate with Sprinkles" },
				{ "id": "5003", "type": "Chocolate" },
				{ "id": "5004", "type": "Maple" }
			]
	},
	{
		"id": "0002",
		"type": "donut",
		"name": "Raised",
		"ppu": 55,
		"batters":
			{
				"batter":
					[
						{ "id": "1001", "type": "Regular" }
					]
			},
		"topping":
			[
				{ "id": "5001", "type": "None" },
				{ "id": "5002", "type": "Glazed" },
				{ "id": "5005", "type": "Sugar" },
				{ "id": "5003", "type": "Chocolate" },
				{ "id": "5004", "type": "Maple" }
			]
	},
	{
		"id": "0003",
		"type": "donut",
		"name": "Old Fashioned",
		"ppu": 55,
		"batters":
			{
				"batter":
					[
						{ "id": "1001", "type": "Regular" },
						{ "id": "1002", "type": "Chocolate" }
					]
			},
		"topping":
			[
				{ "id": "5001", "type": "None" },
				{ "id": "5002", "type": "Glazed" },
				{ "id": "5003", "type": "Chocolate" },
				{ "id": "5004", "type": "Maple" }
			]
	}
]
`)