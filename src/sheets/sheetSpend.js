export const sheetSpend = {
    name: "Spend",
    labels: [],
    sheets: [
      {
        name: "Spend Sheet",
        slug: "AvSpendSheet",
        fields: [
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
      },
    ],
    actions: [
      {
        operation: "submitActionFg",
        mode: "foreground",
        label: "Save rows",
        description: "Submit data to webhook.site",
        primary: true,
      },
    ],
    metadata: {},
  };