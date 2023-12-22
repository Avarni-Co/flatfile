{
    "data": [
        {
            "id": "us_wb_k6f880EB",
            "name": "Entry Workbook",
            "labels": [],
            "spaceId": "us_sp_7txTjrkC",
            "environmentId": "us_env_tYFWfxQn",
            "createdAt": "2023-12-06T22:31:59.795Z",
            "updatedAt": "2023-12-06T22:31:59.795Z",
            "sheets": [
                {
                    "id": "us_sh_DKIlQozy",
                    "workbookId": "us_wb_k6f880EB",
                    "name": "Spend Sheet",
                    "config": {
                        "name": "Spend Sheet",
                        "slug": "entry-workbook/AvSpendSheet",
                        "readonly": false,
                        "mappingConfidenceThreshold": 0.5,
                        "access": [
                            "*"
                        ],
                        "fields": [
                            {
                                "key": "vendor",
                                "type": "string",
                                "label": "Vendor",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            },
                            {
                                "key": "account",
                                "type": "string",
                                "label": "Account",
                                "description": "",
                                "constraints": [
                                    {
                                        "type": "required"
                                    }
                                ],
                                "readonly": false
                            },
                            {
                                "key": "description",
                                "type": "string",
                                "label": "Description",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            },
                            {
                                "key": "amount",
                                "type": "string",
                                "label": "Amount",
                                "description": "",
                                "constraints": [
                                    {
                                        "type": "required"
                                    }
                                ],
                                "readonly": false
                            },
                            {
                                "key": "inputUnit",
                                "type": "string",
                                "label": "Input Unit",
                                "description": "The currency of the amount, can be one of [AED | AUD | CAD | CHF | CNY | CZK | DKK | EUR | GBP | HKD | HUF | IDR | ILS | INR | JPY | MXN | MYR | NOK | NZD | PHP | PKR | PLN | SAR | SBD | SEK | SGD | THB | TRY | TOP | USD | VUV | WST | XPF | ZAR | LKR]",
                                "constraints": [
                                    {
                                        "type": "required"
                                    }
                                ],
                                "readonly": false
                            },
                            {
                                "key": "date",
                                "type": "string",
                                "label": "Date",
                                "description": "",
                                "constraints": [
                                    {
                                        "type": "required"
                                    }
                                ],
                                "readonly": false
                            },
                            {
                                "key": "emissionCategory",
                                "type": "string",
                                "label": "GHG Emission Category",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            },
                            {
                                "key": "country",
                                "type": "string",
                                "label": "Country",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            },
                            {
                                "key": "subOrganisation",
                                "type": "string",
                                "label": "Sub-Organisation",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            }
                        ],
                        "actions": []
                    },
                    "countRecords": {
                        "total": 0,
                        "error": 0,
                        "valid": 0
                    },
                    "createdAt": "2023-12-06T22:31:59.795Z",
                    "updatedAt": "2023-12-06T22:31:59.795Z"
                },
                {
                    "id": "us_sh_0EmT6EvD",
                    "workbookId": "us_wb_k6f880EB",
                    "name": "Fuel Sheet",
                    "config": {
                        "name": "Fuel Sheet",
                        "slug": "entry-workbook/AvFuelSheet",
                        "readonly": false,
                        "mappingConfidenceThreshold": 0.5,
                        "access": [
                            "*"
                        ],
                        "fields": [
                            {
                                "key": "amount",
                                "type": "string",
                                "label": "Amount",
                                "description": "",
                                "constraints": [
                                    {
                                        "type": "required"
                                    }
                                ],
                                "readonly": false
                            },
                            {
                                "key": "inputUnit",
                                "type": "string",
                                "label": "Input Unit",
                                "description": "",
                                "constraints": [
                                    {
                                        "type": "required"
                                    }
                                ],
                                "readonly": false
                            },
                            {
                                "key": "date",
                                "type": "string",
                                "label": "Date",
                                "description": "",
                                "constraints": [
                                    {
                                        "type": "required"
                                    }
                                ],
                                "readonly": false
                            },
                            {
                                "key": "category",
                                "type": "string",
                                "label": "Fuel Type",
                                "description": "",
                                "constraints": [
                                    {
                                        "type": "required"
                                    }
                                ],
                                "readonly": false
                            },
                            {
                                "key": "scope",
                                "type": "number",
                                "label": "Scope",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            },
                            {
                                "key": "emissionCategory",
                                "type": "string",
                                "label": "GHG Emission Category",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            },
                            {
                                "key": "country",
                                "type": "string",
                                "label": "Country",
                                "description": "",
                                "constraints": [
                                    {
                                        "type": "required"
                                    }
                                ],
                                "readonly": false
                            },
                            {
                                "key": "subOrganisation",
                                "type": "string",
                                "label": "Sub-Organisation",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            }
                        ],
                        "actions": []
                    },
                    "countRecords": {
                        "total": 0,
                        "error": 0,
                        "valid": 0
                    },
                    "createdAt": "2023-12-06T22:31:59.795Z",
                    "updatedAt": "2023-12-06T22:31:59.795Z"
                },
                {
                    "id": "us_sh_yDTuSpIc",
                    "workbookId": "us_wb_k6f880EB",
                    "name": "Energy Sheet",
                    "config": {
                        "name": "Energy Sheet",
                        "slug": "entry-workbook/AvEnergySheet",
                        "readonly": false,
                        "mappingConfidenceThreshold": 0.5,
                        "access": [
                            "*"
                        ],
                        "fields": [
                            {
                                "key": "amount",
                                "type": "string",
                                "label": "Amount",
                                "description": "",
                                "constraints": [
                                    {
                                        "type": "required"
                                    }
                                ],
                                "readonly": false
                            },
                            {
                                "key": "inputUnit",
                                "type": "string",
                                "label": "Input Unit",
                                "description": "",
                                "constraints": [
                                    {
                                        "type": "required"
                                    }
                                ],
                                "readonly": false
                            },
                            {
                                "key": "date",
                                "type": "string",
                                "label": "Date",
                                "description": "",
                                "constraints": [
                                    {
                                        "type": "required"
                                    }
                                ],
                                "readonly": false
                            },
                            {
                                "key": "category",
                                "type": "string",
                                "label": "Location",
                                "description": "",
                                "constraints": [
                                    {
                                        "type": "required"
                                    }
                                ],
                                "readonly": false
                            },
                            {
                                "key": "scope",
                                "type": "number",
                                "label": "Scope",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            },
                            {
                                "key": "emissionCategory",
                                "type": "string",
                                "label": "GHG Emission Category",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            },
                            {
                                "key": "country",
                                "type": "string",
                                "label": "Country",
                                "description": "",
                                "constraints": [
                                    {
                                        "type": "required"
                                    }
                                ],
                                "readonly": false
                            },
                            {
                                "key": "subOrganisation",
                                "type": "string",
                                "label": "Sub-Organisation",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            }
                        ],
                        "actions": []
                    },
                    "countRecords": {
                        "total": 0,
                        "error": 0,
                        "valid": 0
                    },
                    "createdAt": "2023-12-06T22:31:59.795Z",
                    "updatedAt": "2023-12-06T22:31:59.795Z"
                },
                {
                    "id": "us_sh_WsJRoGhQ",
                    "workbookId": "us_wb_k6f880EB",
                    "name": "Travel Sheet",
                    "config": {
                        "name": "Travel Sheet",
                        "slug": "entry-workbook/AvTravelSheet",
                        "readonly": false,
                        "mappingConfidenceThreshold": 0.5,
                        "access": [
                            "*"
                        ],
                        "fields": [
                            {
                                "key": "category",
                                "type": "string",
                                "label": "Category",
                                "description": "",
                                "constraints": [
                                    {
                                        "type": "required"
                                    }
                                ],
                                "readonly": false
                            },
                            {
                                "key": "description",
                                "type": "string",
                                "label": "Description",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            },
                            {
                                "key": "date",
                                "type": "string",
                                "label": "Date",
                                "description": "",
                                "constraints": [
                                    {
                                        "type": "required"
                                    }
                                ],
                                "readonly": false
                            },
                            {
                                "key": "originLoc",
                                "type": "string",
                                "label": "Start Location",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            },
                            {
                                "key": "destLoc",
                                "type": "string",
                                "label": "End Location",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            },
                            {
                                "key": "distance",
                                "type": "string",
                                "label": "Distance (km)",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            },
                            {
                                "key": "country",
                                "type": "string",
                                "label": "Country",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            },
                            {
                                "key": "emissionCategory",
                                "type": "string",
                                "label": "GHG Emission Category",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            },
                            {
                                "key": "subOrganisation",
                                "type": "string",
                                "label": "Sub-Organisation",
                                "description": "",
                                "constraints": [],
                                "readonly": false
                            }
                        ],
                        "actions": []
                    },
                    "countRecords": {
                        "total": 0,
                        "error": 0,
                        "valid": 0
                    },
                    "createdAt": "2023-12-06T22:31:59.795Z",
                    "updatedAt": "2023-12-06T22:31:59.795Z"
                }
            ]
        },
        {
            "id": "us_wb_rYQ51Zaz",
            "name": "[file] General Ledger Data_Upload (1).xlsx",
            "labels": [
                "file"
            ],
            "spaceId": "us_sp_7txTjrkC",
            "environmentId": "us_env_tYFWfxQn",
            "createdAt": "2023-12-06T22:33:07.891Z",
            "updatedAt": "2023-12-06T22:33:07.891Z",
            "sheets": [
                {
                    "id": "us_sh_AXOhjLR0",
                    "workbookId": "us_wb_rYQ51Zaz",
                    "name": "Ledger Data Final for Avarni",
                    "config": {
                        "name": "Ledger Data Final for Avarni",
                        "mappingConfidenceThreshold": 0.5,
                        "fields": [
                            {
                                "key": "Account",
                                "type": "string",
                                "label": "Account",
                                "description": "",
                                "constraints": []
                            },
                            {
                                "key": "Account Name",
                                "type": "string",
                                "label": "Account Name",
                                "description": "",
                                "constraints": []
                            },
                            {
                                "key": "MARSHA",
                                "type": "string",
                                "label": "MARSHA",
                                "description": "",
                                "constraints": []
                            },
                            {
                                "key": "Amount",
                                "type": "string",
                                "label": "Amount",
                                "description": "",
                                "constraints": []
                            },
                            {
                                "key": "Source",
                                "type": "string",
                                "label": "Source",
                                "description": "",
                                "constraints": []
                            },
                            {
                                "key": "Description",
                                "type": "string",
                                "label": "Description",
                                "description": "",
                                "constraints": []
                            },
                            {
                                "key": "Unit",
                                "type": "string",
                                "label": "Unit",
                                "description": "",
                                "constraints": []
                            },
                            {
                                "key": "Date",
                                "type": "string",
                                "label": "Date",
                                "description": "",
                                "constraints": []
                            }
                        ]
                    },
                    "countRecords": {
                        "total": 0,
                        "error": 0,
                        "valid": 0
                    },
                    "createdAt": "2023-12-06T22:33:07.891Z",
                    "updatedAt": "2023-12-06T22:33:07.891Z"
                }
            ]
        }
    ]
}