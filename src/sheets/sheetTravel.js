export const sheetTravel = {
    name: "Travel",
    labels: [],
    sheets: [
      {
        name: "Travel Sheet",
        slug: "AvTravelSheet",
        fields: [
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