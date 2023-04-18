import {
    AvAmountField,
    AvCountryField,
    AvDateField,
    AvEnergyField,
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
import { computeSubOrg } from '../utils';

export interface EnergyEntryFlatfileRecord {
    amount:string,
    inputUnit:string,
    date: string,
    category:string,
    country:string,
    subOrganisation?:string,
}
export type  EnergyEntryFlatfileRecordKeys = keyof EnergyEntryFlatfileRecord
const energyBaseFields = {
    amount:AvAmountField({required:true,label:"Amount",}),
    inputUnit:AvEnergyField({required:true,label:"Input Unit"}),
    date: AvDateField({required:true,label:'Date'}),
    category: AvTextField({required:true,label:"Location",}),
    country:AvCountryField({countries:['united states', 'canada'], errorMessage:`Only "United States" and "Canada" are currently supported. Support for other countries coming soon.`})({required:true,label:"Country",}),
} as {[index in EnergyEntryFlatfileRecordKeys]:AnyField};



export const AvEnergySheet = new Sheet('Energy Sheet',energyBaseFields  )

export const AvEnergyWithSubOrgSheet = new Sheet('Energy With SubOrg Sheet', {
    ...energyBaseFields,
    subOrganisation:AvTextField({required:false,label:"Sub-Organisation",}),
} as {[index in keyof EnergyEntryFlatfileRecord]:AnyField}, {
    recordCompute: (record: FlatfileRecord, session: FlatfileSession,logger) => {
        computeSubOrg(record,session,logger)
    },
})


export const AvEnergyPortal = new Portal({
    name: 'Energy Portal',
    sheet: 'AvEnergySheet',
})
export const AvEnergyWithSubOrgPortal = new Portal({
    name: 'Energy With SubOrg Portal',
    sheet: 'AvEnergyWithSubOrgSheet',
})