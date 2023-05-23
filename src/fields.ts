import { makeField, Message, OptionField, TextField } from '@flatfile/configure'
import {
  arrayToObject,
  getCategoryScope,
  getScopeCategories,
  isCountryValid,
  isCurrencyValid,
  isEmissionCategoryValid,
  isEnergyValid,
  isMassValid,
  normaliseAmount,
  toTitleCase,
  validateDate
} from './utils'
import {
  countries,
  supportedCurrencies,
  supportedEnergyUnits,
  supportedMassUnits
} from './constants'
import { EmissionScope } from './types'
type Value = string | null
function trimValue(caster: (value: Value) => Value) {
  return (value: Value) => {
    return caster(value?.trim() || value)
  }
}
function addWarningIfEmpty(validator: (value: Value) => undefined | Message[]) {
  return (value: Value) => {
    if (value === null || value?.trim() === '' || value === undefined) {
      return [new Message('Cell is empty', 'warn', 'validate')]
    }
    return validator(value)
  }
}

export const AvTextField = (
  props: { required?: boolean; label?: string } = {}
) =>
  makeField(TextField(), {
    cast: trimValue((value) => value)
    // enabling below will add a warning for when a field is not required, but it's left empty
    //...(props.required?{}:{validate:addWarningIfEmpty(()=>undefined)})
  })(props)

export const AvDateField = makeField(TextField({}), {
  cast: trimValue((value: string | null) => {
    if (!value) return value
    const casted = validateDate(value)
    if (!casted.error && casted.value) {
      return casted.value
    }
    return value
  }),
  validate: (value: string) => {
    const validated = validateDate(value)
    if (validated.error) {
      return validated.error
    }
  }
})
//export const AvCurrencyField = makeField(OptionField({options:arrayToObject(supportedCurrencies)}),{
export const AvCurrencyField = makeField(TextField({}), {
  cast: trimValue((value: Value) => {
    if (!value) return value
    const valid = isCurrencyValid(value)
    return valid ? value.toUpperCase() : value
  }),
  validate: (value: string) => {
    const valid = isCurrencyValid(value)
    if (!valid)
      return [
        new Message(
          `Currency must be one of [${supportedCurrencies.join(' / ')}]`,
          'error',
          'validate'
        )
      ]
  }
})

export const AvMassField = makeField(TextField({}), {
  cast: trimValue((value: Value) => {
    if (!value) return value
    const { valid, castedValue } = isMassValid(value)
    return valid ? castedValue : value
  }),
  validate: (value: string) => {
    const { valid } = isMassValid(value)
    if (!valid)
      return [
        new Message(
          `Supported units are: ${supportedMassUnits.join(' / ')}`,
          'error',
          'validate'
        )
      ]
  }
})
export const AvEnergyField = makeField(TextField({}), {
  cast: trimValue((value: Value) => {
    if (!value) return value
    const { valid, castedValue } = isEnergyValid(value)
    return valid ? castedValue : value
  }),
  validate: (value: string) => {
    const { valid } = isEnergyValid(value)
    if (!valid)
      return [
        new Message(
          `Supported units are: ${supportedEnergyUnits.join(' / ')}`,
          'error',
          'validate'
        )
      ]
  }
})

export const AvAmountField = makeField(TextField({}), {
  cast: trimValue((value: Value) => {
    if (!value) return value
    return normaliseAmount(value)
  })
})

//export const AvCountryField = makeField(OptionField({options:arrayToObject(countries,toTitleCase)}),{
export const AvCountryField = ({
  countries,
  errorMessage
}: {
  countries: string[]
  errorMessage: string
}) =>
  makeField(TextField(), {
    cast: trimValue((value: string | null) => {
      return value
    }),
    validate: addWarningIfEmpty((value: string | null) => {
      if (!value) return
      const valid = isCountryValid(value, countries)
      if (!valid) return [new Message(errorMessage, 'error', 'validate')]
    })
  })

export const AvEmissionCategoryTextField = (scope: EmissionScope) =>
  makeField(TextField({}), {
    cast: trimValue((value: string | null) => {
      return value
    }),
    validate: addWarningIfEmpty((value: Value) => {
      if (!value) return
      if (!isEmissionCategoryValid(value, scope)) {
        const categoryScope = getCategoryScope(value)
        const scopeCategories = getScopeCategories(scope)

        return [
          new Message(
            `Not a valid scope ${categoryScope} category. Valid categories are : [ ${scopeCategories.join(
              ' / '
            )}]`,
            'error',
            'validate'
          )
        ]
      }
    })
  })
