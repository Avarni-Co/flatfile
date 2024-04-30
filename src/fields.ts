import { makeField, Message, OptionField, TextField, NumberField, DateField } from '@flatfile/configure';
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
  normaliseCountry,
  validateDate,
  validateDatev2,
} from './utils';
import { dateFormats, supportedCurrencies, supportedEnergyUnits, supportedMassUnits } from './constants';
import { EmissionScope } from './types';
import moment from 'moment';

type Value = string | null;

function trimValue(caster: (value: Value) => Value) {
  return (value: Value) => {
    return caster(value?.trim() || value);
  };
}

function addWarningIfEmpty(validator: (value: Value) => undefined | Message[]) {
  return (value: Value) => {
    if (value === null || value?.trim() === '' || value === undefined) {
      return [new Message('Cell is empty', 'warn', 'validate')];
    }
    return validator(value);
  };
}

export const AvTextField = (props: { required?: boolean; label?: string } = {}) =>
  makeField(TextField(), {
    cast: trimValue((value) => value),
    // enabling below will add a warning for when a field is not required, but it's left empty
    //...(props.required?{}:{validate:addWarningIfEmpty(()=>undefined)})
  })(props);

export const AvDateField = makeField(TextField({}), {
  cast: trimValue((value: string | null) => {
    if (!value) return value;
    const casted = validateDate(value);
    if (!casted.error && casted.value) {
      return casted.value;
    }
    return value;
  }),
  validate: (value: string) => {
    const validated = validateDate(value);
    if (validated.error) {
      return validated.error;
    }
  },
});

export const AvDateFieldv2 = DateField({
  label: 'Date',
  required: true,
  egressFormat: (value: Date) => {
    return moment(value).format(dateFormats.DateFormatToBackend);
  },
  validate: (value: Date) => {
    const validated = validateDatev2(value);
    if (validated.error) {
      return validated.error;
    }
  },
});

//export const AvCurrencyField = makeField(OptionField({options:arrayToObject(supportedCurrencies)}),{
export const AvCurrencyField = makeField(TextField({}), {
  cast: trimValue((value: Value) => {
    if (!value) return value;
    const valid = isCurrencyValid(value);
    return valid ? value.toUpperCase() : value;
  }),
  validate: (value: string) => {
    const valid = isCurrencyValid(value);
    if (!valid)
      return [new Message(`Currency must be one of [${supportedCurrencies.join(' / ')}]`, 'error', 'validate')];
  },
});

export const AvMassField = makeField(TextField({}), {
  cast: trimValue((value: Value) => {
    if (!value) return value;
    const { valid, castedValue } = isMassValid(value);
    return valid ? castedValue : value;
  }),
  validate: (value: string) => {
    const { valid } = isMassValid(value);
    if (!valid) return [new Message(`Supported units are: ${supportedMassUnits.join(' / ')}`, 'error', 'validate')];
  },
});
export const AvEnergyField = makeField(TextField({}), {
  cast: trimValue((value: Value) => {
    if (!value) return value;
    const { valid, castedValue } = isEnergyValid(value);
    return valid ? castedValue : value;
  }),
  validate: (value: string) => {
    const { valid } = isEnergyValid(value);
    if (!valid) return [new Message(`Supported units are: ${supportedEnergyUnits.join(' / ')}`, 'error', 'validate')];
  },
});

export const AvTravelUnitField = makeField(TextField({}), {
  cast: trimValue((value: Value) => {
    if (!value) return value;
    const miles = ['miles', 'mile'];
    const kilometers = ['kilometers', 'kilometer'];
    let newVal = value.trim().toLowerCase();
    if (miles.includes(newVal)) newVal = 'mi';
    if (kilometers.includes(newVal)) newVal = 'km';
    const valid = newVal === 'km' || newVal === 'mi';
    return valid ? newVal : value;
  }),
  validate: (value?: string) => {
    const valid = !value || value === 'km' || value === 'mi';
    if (!valid) return [new Message(`Unit must be one of [km, mi]`, 'error', 'validate')];
  },
});

export const AvAmountField = makeField(TextField({}), {
  cast: trimValue((value: Value) => {
    if (!value) return value;
    return normaliseAmount(value);
  }),
});

export const AvCountryField = ({
  countries,
  errorMessage,
}: {
  countries: { [key: string]: string };
  errorMessage: string;
}) =>
  makeField(TextField(), {
    cast: trimValue((value: string | null) => {
      return normaliseCountry(value, countries);
    }),
    validate: (value: string | null) => {
      if (!value) return;
      const valid = isCountryValid(value, countries);
      if (!valid) return [new Message(errorMessage, 'error', 'validate')];
    },
  });

export const AvScopeField = makeField(NumberField({}), {
  cast: (value) => {
    if (typeof value === 'string') {
      value = value.trim().toLowerCase();
      switch (value) {
        case '1':
        case 'scope 1':
          return 1;
        case '2':
        case 'scope 2':
          return 2;
        case '3':
        case 'scope 3':
          return 3;
        default:
          return null;
      }
    }
    if (!value) return null;
    return Number(value);
  },
  validate: (value: number) => {
    if (value < 1 || value > 3) {
      return [new Message('Scope must be between 1 and 3', 'error', 'validate')];
    }
  },
});

export const AvEmissionCategoryTextField = (scope: EmissionScope) =>
  makeField(TextField({}), {
    cast: trimValue((value: string | null) => {
      return value;
    }),
    validate: addWarningIfEmpty((value: Value) => {
      if (!value) return;
      if (!isEmissionCategoryValid(value, scope)) {
        const categoryScope = getCategoryScope(value);
        const scopeCategories = getScopeCategories(scope);

        return [
          new Message(
            `Not a valid scope ${categoryScope} category. Valid categories are : [ ${scopeCategories.join(' / ')}]`,
            'error',
            'validate',
          ),
        ];
      }
    }),
  });
