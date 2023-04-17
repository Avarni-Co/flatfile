import {
    AvAmountField,
    AvCountryField,
    AvDateField,
    AvMassField,
    AvTextField
} from '../fields';
import {
    AnyField,
    Portal,
    Sheet
} from '@flatfile/configure';
import {
    FlatfileRecord,
    FlatfileSession
} from '@flatfile/hooks';
import { validateSubOrg } from '../utils';

export interface FuelEntryFlatfileRecord {
    amount:string,
    inputUnit:string,
    date: string,
    category:string,
    country:string,
    subOrganisation?:string,
}
export type  FuelEntryFlatfileRecordKeys = keyof FuelEntryFlatfileRecord
const fuelBaseFields = {
    amount:AvAmountField({required:true,label:"Amount",}),
    inputUnit:AvMassField({required:true,label:"Input Unit"}),
    date: AvDateField({required:true,label:'Date'}),
    category: AvTextField({required:true,label:"Fuel Type",}),
    country:AvCountryField({countries:["united states"], errorMessage:`Only "United States" is currently supported. Support for other countries coming soon.`})({required:true,label:"Country",}),
} as {[index in FuelEntryFlatfileRecordKeys]:AnyField};



export const AvFuelSheet = new Sheet('Fuel Sheet',fuelBaseFields  )

export const AvFuelWithSubOrgSheet = new Sheet('Fuel With SubOrg Sheet', {
    ...fuelBaseFields,
    subOrganisation:AvTextField({required:false,label:"Sub-Organisation",}),
} as {[index in keyof FuelEntryFlatfileRecord]:AnyField}, {
    recordCompute: (record: FlatfileRecord, session: FlatfileSession,logger) => {
        validateSubOrg(record,session,logger)
    },
})


export const AvFuelPortal = new Portal({
    name: 'Fuel Portal',
    sheet: 'AvFuelSheet',
})
export const AvFuelWithSubOrgPortal = new Portal({
    name: 'Fuel With SubOrg Portal',
    sheet: 'AvFuelWithSubOrgSheet',
})