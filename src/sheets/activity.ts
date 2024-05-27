import { AvAmountField, AvCountryField, AvDateField, AvDateFieldv2, AvTextField } from '../fields';
import { countriesv2 } from '../constants';

import { AnyField, Portal, Sheet } from '@flatfile/configure';
import { FlatfileRecord, FlatfileSession } from '@flatfile/hooks';
import { computeSubOrg, validateGhgCategory, validateInputUnit } from '../utils';

export type ActivityEntryFlatfileRecordKeys = keyof ActivityEntryFlatfileRecord;
export interface ActivityEntryFlatfileRecord {
  activityClass: string;
  description?: string;
  supplierName?: string;
  amount: string;
  inputUnit?: string;
  date: string;
  countryCode?: string;
  // subOrganisation?: string // needs to be re-implemented
  ghgCategory?: string;
}
const activityBaseFields = {
  activityClass: AvTextField({ required: true, label: 'Activity Class' }),
  description: AvTextField({ required: false, label: 'Description' }),
  supplierName: AvTextField({ required: false, label: 'Supplier Name' }),
  amount: AvAmountField({ required: true, label: 'Amount' }),
  inputUnit: AvTextField({
    required: false,
    label: 'Input Unit',
  }),
  date: AvDateFieldv2,
  ghgCategory: AvTextField({
    required: false,
    label: 'GHG Emission Category',
  }),
  countryCode: AvCountryField({
    countries: countriesv2,
    errorMessage: 'Could not validate this country. Please check the guide for a list of valid country names.',
  })({ required: false, label: 'Country' }),
  subOrganisation: AvTextField({ required: false, label: 'Sub-Organisation' }),
} as { [index in ActivityEntryFlatfileRecordKeys]: AnyField };

export const AvActivitySheet = new Sheet('Activity Sheet', activityBaseFields, {
  allowCustomFields: true,
  recordCompute: (record: FlatfileRecord, session: FlatfileSession, logger) => {
    validateInputUnit(record, session);
    validateGhgCategory(record, session);
    computeSubOrg(record, session, logger);
  },
});

export const AvActivityPortal = new Portal({
  name: 'Activity Portal',
  sheet: 'AvActivitySheet',
});
