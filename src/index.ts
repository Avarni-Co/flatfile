/**
 * This is a scaffold for defining a Workbook with Sheets and Portals.
 * Test this scaffold using the sample file in examples/sample-uploads/my-sheet-sample.csv.
 *
 * See examples/workbooks/FullExample.ts for a full, working example of a Workbook.
 */

import { Workbook, } from '@flatfile/configure'
// import {portals, sheets} from './sheets';

import { AvSpendPortal, AvSpendSheet } from "./sheets/spend"
import { AvFuelPortal, AvFuelSheet } from "./sheets/fuel"
import { AvEnergyPortal, AvEnergySheet } from './sheets/energy';
import { AvTravelPortal, AvTravelSheet } from './sheets/travel';

// export const MyWorkbook = new Workbook( {
//     name : 'Entry Workbook',
//     namespace : 'entry-workbook',
//     portals,
//     sheets,
// })

export const spendWorkbook = new Workbook({

    name: "Spend Workbook",
    namespace: "spendNamespace",
    portals: [AvSpendPortal],
    sheets: { AvSpendSheet }
    
})

export const fuelWorkbook = new Workbook({

    name: "Fuel Workbook",
    namespace: "fuelNamespace",
    portals: [AvFuelPortal],
    sheets: { AvFuelSheet }

})

export const energyWorkbook = new Workbook({

    name: "Energy Workbook",
    namespace: "energyNamespace",
    portals: [AvEnergyPortal],
    sheets: { AvEnergySheet }

})

export const travelWorkbook = new Workbook({

    name: "Travel Workbook",
    namespace: "travelNamespace",
    portals: [AvTravelPortal],
    sheets: { AvTravelSheet }

})