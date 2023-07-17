import {
  AvAmountField,
  AvCountryField,
  AvCurrencyField,
  AvDateField,
  AvEmissionCategoryTextField,
  AvTextField
} from '../fields'
import { countries, supportedCurrencies } from '../constants'

import { AnyField, Portal, Sheet } from '@flatfile/configure'
import { FlatfileRecord, FlatfileSession } from '@flatfile/hooks'
import { computeSubOrg } from '../utils'

export type SpendEntryFlatfileRecordKeys = keyof SpendEntryFlatfileRecord
export interface SpendEntryFlatfileRecord {
  vendor?: string
  account: string
  description?: string
  amount: string
  inputUnit: string
  date: string
  emissionCategory?: string
  country?: string
  subOrganisation?: string
}
const spendBaseFields = {
  vendor: AvTextField({ required: false, label: 'Vendor' }),
  account: AvTextField({ required: true, label: 'Account' }),
  description: AvTextField({ required: false, label: 'Description' }),
  amount: AvAmountField({ required: true, label: 'Amount' }),
  inputUnit: AvCurrencyField({
    required: true,
    label: 'Input Unit',
    description: `The currency of the amount, can be one of [${supportedCurrencies.join(
      ' | '
    )}]`
  }),
  date: AvDateField({ required: true, label: 'Date' }),
  emissionCategory: AvEmissionCategoryTextField(3)({
    required: false,
    label: 'GHG Emission Category'
  }),
  country: AvCountryField({
    countries,
    errorMessage:
      'Could not validate this country. Please check the guide for a list of valid country names.'
  })({ required: false, label: 'Country' })
} as { [index in SpendEntryFlatfileRecordKeys]: AnyField }

export const AvSpendWithSubOrgSheet = new Sheet(
  'Spend With SubOrg Sheet',
  {
    ...spendBaseFields,
    subOrganisation: AvTextField({ required: false, label: 'Sub-Organisation' })
  } as { [index in keyof SpendEntryFlatfileRecord]: AnyField },
  {
    recordCompute: (
      record: FlatfileRecord,
      session: FlatfileSession,
      logger
    ) => {
      computeSubOrg(record, session, logger)
    }
  }
)

export const AvSpendSheet = new Sheet('Spend Sheet', spendBaseFields)

export const AvSpendPortal = new Portal({
  name: 'Spend Portal',
  sheet: 'AvSpendSheet'
})
export const AvSpendWithSubOrgPortal = new Portal({
  name: 'Spend With SubOrg Portal',
  sheet: 'AvSpendWithSubOrgSheet'
})
