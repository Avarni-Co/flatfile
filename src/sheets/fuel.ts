import {
  AvAmountField,
  AvCountryField,
  AvDateField,
  AvEmissionCategoryTextField,
  AvMassField,
  AvScopeField,
  AvTextField
} from '../fields'
import { AnyField, Portal, Sheet } from '@flatfile/configure'
import { FlatfileRecord, FlatfileSession } from '@flatfile/hooks'
import { checkValidEmissionCategory, computeSubOrg } from '../utils'
import { countries } from '../constants'

export interface FuelEntryFlatfileRecord {
  amount: string
  inputUnit: string
  date: string
  category: string
  country: string
  scope?: number
  emissionCategory?: string
  subOrganisation?: string
}
export type FuelEntryFlatfileRecordKeys = keyof FuelEntryFlatfileRecord
const fuelBaseFields = {
  amount: AvAmountField({ required: true, label: 'Amount' }),
  inputUnit: AvMassField({ required: true, label: 'Input Unit' }),
  date: AvDateField({ required: true, label: 'Date' }),
  category: AvTextField({ required: true, label: 'Fuel Type' }),
  scope: AvScopeField({ required: false, label: 'Scope' }),
  emissionCategory: AvTextField({
    required: false,
    label: 'GHG Emission Category'
  }),
  country: AvCountryField({
    countries,
    errorMessage: `This country is not currently supported. Support for other countries coming soon.`
  })({ required: true, label: 'Country' }),
  subOrganisation: AvTextField({ required: false, label: 'Sub-Organisation' })
} as { [index in FuelEntryFlatfileRecordKeys]: AnyField }

export const AvFuelSheet = new Sheet('Fuel Sheet', fuelBaseFields, {
  allowCustomFields: true,
  recordCompute: (record: FlatfileRecord, session: FlatfileSession, logger) => {
    const { emissionCategory, scope } = record.value
    const isEmpty = (val: any) =>
      val === null || val === undefined || val === ''
    if (
      (isEmpty(emissionCategory) && !isEmpty(scope)) ||
      (!isEmpty(emissionCategory) && isEmpty(scope))
    ) {
      record.addError(
        ['emissionCategory', 'scope'],
        `Both emission category and scope must be filled in`
      )
    }
    computeSubOrg(record, session, logger)
    checkValidEmissionCategory(record)
  }
})

export const AvFuelPortal = new Portal({
  name: 'Fuel Portal',
  sheet: 'AvFuelSheet'
})
