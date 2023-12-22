export const sheetEnergy = {
    name: "Energy",
    labels: ["pinned"],
    sheets: [
      {
        name: "Energy Sheet",
        slug: "AvEnergySheet",
        fields: [
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