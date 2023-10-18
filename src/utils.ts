import { startCase, toLower, toUpper } from 'lodash'
import {
  dateFormats,
  scopeOneCategories,
  scopeThreeCategories,
  scopeTwoCategories,
  supportedCurrencies,
  supportedEnergyUnits,
  supportedMassUnits
} from './constants'
import { EmissionCategories, EmissionScope, SubOrg } from './types'
import { Message } from '@flatfile/configure'
import moment from 'moment'
import { FlatfileRecord, FlatfileSession } from '@flatfile/hooks'

export function toTitleCase(str: string) {
  return startCase(toLower(str))
}

export function isCountryValid(
  countryVal: string,
  countryList: { [key: string]: string }
) {
  const countryValLowercase = countryVal.toLowerCase()
  return countryValLowercase === '' || !!countryList[countryValLowercase]
}

export function isEmissionCategoryValid(value: string, scope: EmissionScope) {
  const emissionValLowercase = value?.trim().toLowerCase()
  return (
    emissionValLowercase === '' ||
    getScopeCategories(scope).includes(emissionValLowercase)
  )
}

export function isCurrencyValid(value: string) {
  const currencyValLowercase = value?.trim().toUpperCase()
  return (
    currencyValLowercase === '' ||
    supportedCurrencies.indexOf(currencyValLowercase) > -1
  )
}

export const getCategoryScope = (
  category: EmissionCategories
): EmissionScope | undefined => {
  if (scopeOneCategories.indexOf(category) > -1) {
    return 1
  }
  if (scopeTwoCategories.indexOf(category) > -1) {
    return 2
  }
  if (scopeThreeCategories.indexOf(category) > -1) {
    return 3
  }
  return undefined
}

export const getScopeCategories = (scope: number) => {
  if (scope === 1) {
    return scopeOneCategories
  }
  if (scope === 2) {
    return scopeTwoCategories
  }
  return scopeThreeCategories
}

export function arrayToObject(
  strings: string[],
  transformer: (str: string) => string = toUpper
) {
  const result: any = {}
  strings.forEach((str) => {
    result[str] = transformer(str)
  })

  return result
}

export const validateDate = (
  dateValue: string
): { value: string | null; error: null | Array<Message> } => {
  let validDateFormats: string[] | undefined

  // Check for month and YY format
  if (dateValue.match(/^[a-zA-Z0-9]+[\s/\-.][0-9]{2}$/)) {
    validDateFormats = [
      'MMMM/YY',
      'MMM/YY',
      'MM/YY',
      'M/YY',
      'MMMM YY',
      'MMM YY',
      'MM YY',
      'M YY'
    ]
  }

  // Check for MM/YYYY format
  if (dateValue.match(/^(0[1-9]|1[0-2])(\/|-|\.)[0-9]{4}$/)) {
    validDateFormats = ['MM/YYYY']
  }

  if (dateValue.match(/^[0-9]{1,2}(\/|-|\.)[0-9]{1,2}(\/|-|\.)[0-9]+$/)) {
    validDateFormats = [
      'DD/MM/YYYY',
      'DD/MM/YY',
      'D/MM/YYYY',
      'D/MM/YY',
      'D/M/YYYY',
      'D/M/YY',
      'YYYY'
    ]
  }

  if (
    dateValue.match(
      /^((0?[1-9])|10|11|12)(\/|-|\.)((1[3-9])|(2[0-9])|(3[0-1]))(\/|-|\.).+$/
    )
  ) {
    validDateFormats = [
      'MM/DD/YYYY',
      'MM/DD/YY',
      'MM/D/YYYY',
      'MM/D/YY',
      'M/D/YYYY',
      'M/D/YY',
      'YYYY'
    ]
  }

  if (validDateFormats) {
    const validDateFormatsDash = validDateFormats.map((f) =>
      f.replace(/\//g, '-')
    )
    const validDateFormatsDot = validDateFormats.map((f) =>
      f.replace(/\//g, '.')
    )
    validDateFormats = [
      ...validDateFormats,
      ...validDateFormatsDot,
      ...validDateFormatsDash
    ]
  }

  const dateObject = moment(
    dateValue,
    validDateFormats,
    validDateFormats !== undefined
  )

  const now = moment()

  const minDate = '2010-01-01'
  const pastMessage = 'This date is very far in the past'
  const futureMessage = 'This date is in the future'

  if (dateObject.isValid()) {
    if (dateObject.isAfter(now, 'year')) {
      return {
        value: dateValue,
        error: [new Message(futureMessage, 'error', 'validate')]
      }
    }
    if (dateObject.isBefore(minDate, 'day')) {
      return {
        value: dateValue,
        error: [new Message(pastMessage, 'warn', 'validate')]
      }
    }
    return {
      value: dateValue,
      error: null
    }
  } else if (moment(dateValue, dateFormats.YearFormat, true).isValid()) {
    const yearDateObject = moment(dateValue, dateFormats.YearFormat, true)
    if (yearDateObject.isAfter(now, 'year')) {
      return {
        value: dateValue,
        error: [new Message(futureMessage, 'warn', 'validate')]
      }
    }
    if (yearDateObject.isBefore(minDate, 'day')) {
      return {
        value: dateValue,
        error: [new Message(pastMessage, 'warn', 'validate')]
      }
    }
    return {
      value: dateValue,
      error: null
    }
  } else {
    const message = `Could not process date. Date must be in one of the following formats: ${
      validDateFormats ? validDateFormats.join(', ') : ''
    }`
    return {
      value: null,
      error: [new Message(message, 'error', 'validate')]
    }
  }
}

export function extractDelimiter(dateString: string) {
  const delimiter = dateString
    .split(/[\d\w]+/)
    .find((element) => element.length > 0)
  return delimiter?.[0] || null
}

/*
 * @normaliseCountry()
 * Extracts the country value from the input string and ensures that the returned value transformed on the applicable countries
 * */
export function normaliseCountry(
  value: string | null,
  countryList: { [key: string]: string }
) {
  if (!value) return value
  const valueLowerCase = value.toLowerCase()
  const findCountry = countryList[valueLowerCase]
  return toTitleCase(findCountry || value)
}

/*
 * @normaliseAmount()
 * Extracts the numeric value from the input string and ensures that the returned value always has two decimal points
 * */
export function normaliseAmount(value: string) {
  if (!value) return value
  // Remove commas from the input string
  const cleanedInput = value.replace(/[$€£¥₹,]/g, '').trim()

  // Match a sequence of digits (optionally preceded by a negative sign and followed by a decimal point and more digits)
  const regex = /^(-?\d+(\.\d+)?)/
  const match = cleanedInput.match(regex)

  if (match) {
    const number = parseFloat(match[0])
    return number.toFixed(2)
  }

  return null
}

export function isSubOrgValid(subOrgs: SubOrg[], value: string | null) {
  if (!value) return false
  return !!subOrgs.find((org) => value.toLowerCase() === org.name.toLowerCase())
}

export function computeSubOrg(
  record: FlatfileRecord,
  session: FlatfileSession,
  logger: any
) {
  const subOrgs: SubOrg[] = JSON.parse(
    (session?.env?.subOrgs as string) || '[]'
  )
  if (subOrgs) {
    const subOrgValue = record.get('subOrganisation')
    if (subOrgValue && !isSubOrgValid(subOrgs, subOrgValue as string)) {
      let message = 'Organisation does not have any sub-organisations'
      if (subOrgs.length > 1) {
        message = `Sub-organisation must be one of [${subOrgs
          .map((so) => so.name)
          .join(' | ')}]`
      } else if (subOrgs.length > 0) {
        message = `Sub-organisation must be ${subOrgs[0].name}`
      }
      record.addError(['subOrganisation'], message)
    }
  } else {
    logger?.error('Expected subOrgs variables is not coming through')
  }
}

export function checkValidEmissionCategory(record: FlatfileRecord) {
  const scope = record.get('scope')
  const emissionCategory = record.get('emissionCategory')
  if (scope && emissionCategory) {
    if (
      !isEmissionCategoryValid(
        emissionCategory as string,
        scope as EmissionScope
      )
    ) {
      record.addError(
        ['emissionCategory'],
        `Emission category must be one of [${getScopeCategories(
          scope as EmissionScope
        ).join(' | ')}]`
      )
    }
  }
}

export function unitMappings(unit: string) {
  let finalUnit = unit

  // Exclude units where casing matters
  if (!['Ml', 'Gl', 'Tbs', 'MMBTU'].includes(unit)) {
    finalUnit = unit.toLowerCase()
  }

  if (unit.toLowerCase() === 'mmbtu') {
    finalUnit = 'MMBTU'
  }

  const mappings: Record<string, string> = {
    gals: 'gal',
    gallon: 'gal',
    gallons: 'gal',
    kgs: 'kg',
    kilogram: 'kg',
    kilograms: 'kg',
    lbs: 'lb',
    pound: 'lb',
    pounds: 'lb',
    tonnes: 'tonne',
    liter: 'l',
    liters: 'l',
    litre: 'l',
    litres: 'l',
    kiloliters: 'kL',
    kilolitres: 'kL',
    kilolitre: 'kL',
    kiloliter: 'kL',
    megaliters: 'Ml',
    megalitres: 'Ml',
    megalitre: 'Ml',
    megaliter: 'Ml',
    therms: 'thm',
    therm: 'thm',
    'kilowatt hours': 'kWh',
    'megawatt hours': 'MWh',
    'gigawatt hours': 'GWh'
  }

  if (mappings[finalUnit] !== undefined) {
    return mappings[finalUnit]
  }

  return finalUnit
}

export function isMassValid(value: string) {
  let inputUnitValue = value?.trim() as string

  if (supportedMassUnits.indexOf(inputUnitValue) === -1) {
    inputUnitValue = unitMappings(inputUnitValue)
  }

  if (supportedMassUnits.includes(inputUnitValue)) {
    return { valid: true, castedValue: inputUnitValue }
  } else {
    return { valid: false, castedValue: null }
  }
}

export function isEnergyValid(value: string) {
  let inputUnitValue = value?.trim() as string
  if (supportedEnergyUnits.indexOf(inputUnitValue) > -1) {
    return { valid: true, castedValue: inputUnitValue }
  } else {
    return { valid: false, castedValue: null }
  }
}
