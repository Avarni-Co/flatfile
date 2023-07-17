import {
  AvCountryField,
  AvDateField,
  AvEmissionCategoryTextField,
  AvTextField
} from '../fields'
import { AnyField, Portal, Sheet } from '@flatfile/configure'
import { countries } from '../constants'
import { FlatfileRecord, FlatfileSession } from '@flatfile/hooks'
import { computeSubOrg } from '../utils'

export interface TravelEntryFlatfileRecord {
  category: string
  description?: string
  date: string
  originLoc?: string
  destLoc?: string
  distance?: string
  country: string
  emissionCategory: string
}

export type TravelEntryFlatfileRecordKeys = keyof TravelEntryFlatfileRecord
const travelBaseFields = {
  category: AvTextField({ required: true, label: 'Category' }),
  description: AvTextField({ required: false, label: 'Description' }),
  date: AvDateField({ required: true, label: 'Date' }),
  originLoc: AvTextField({ required: false, label: 'Start Location' }),
  destLoc: AvTextField({ required: false, label: 'End Location' }),
  distance: AvTextField({ required: false, label: 'Distance (km)' }),
  country: AvCountryField({
    countries,
    errorMessage:
      'Could not validate this country. Please check the guide for a list of valid country names.'
  })({ required: false, label: 'Country' }),
  emissionCategory: AvEmissionCategoryTextField(3)({
    required: false,
    label: 'GHG Emission Category'
  })
} as { [index in TravelEntryFlatfileRecordKeys]: AnyField }

export const AvTravelSheet = new Sheet('Travel Sheet', travelBaseFields, {
  recordCompute: (record: FlatfileRecord, session: FlatfileSession, logger) => {
    const originLoc = record.get('originLoc')
    const destLoc = record.get('destLoc')
    const distance = record.get('distance')
    if (originLoc && !destLoc) {
      record.addError(['destLoc'], 'End Location is required')
    } else if (!originLoc && destLoc) {
      record.addError(['originLoc'], 'Start Location is required')
    } else if (!originLoc && !destLoc && !distance) {
      record.addError(
        ['distance'],
        'Distance is required if start location and end location are not provided.'
      )
    }
  }
})

export const AvTravelPortal = new Portal({
  name: 'Travel Portal',
  sheet: 'AvTravelSheet'
})
