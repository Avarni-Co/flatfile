import { startCase, toLower, toUpper } from 'lodash';
import {
  GhgCategory,
  dateFormats,
  scopeOneCategories,
  scopeOneCategoriesv2,
  scopeThreeCategories,
  scopeThreeCategoriesv2,
  scopeTwoCategories,
  scopeTwoCategoriesv2,
  supportedCurrencies,
  supportedEnergyUnits,
  supportedMassUnits,
} from './constants';
import { EmissionCategories, EmissionScope, Scope, SubOrg } from './types';
import { Message } from '@flatfile/configure';
import moment from 'moment';
import { FlatfileRecord, FlatfileSession } from '@flatfile/hooks';

export function toTitleCase(str: string) {
  return startCase(toLower(str));
}

export function isCountryValid(countryVal: string, countryList: { [key: string]: string }) {
  const countryValLowercase = countryVal.toLowerCase();
  return countryValLowercase === '' || !!countryList[countryValLowercase];
}

export function isEmissionCategoryValid(value: string, scope: EmissionScope) {
  const emissionValLowercase = value?.trim().toLowerCase();
  return emissionValLowercase === '' || getScopeCategories(scope).includes(emissionValLowercase);
}

export function isCurrencyValid(value: string) {
  const currencyValLowercase = value?.trim().toUpperCase();
  return currencyValLowercase === '' || supportedCurrencies.indexOf(currencyValLowercase) > -1;
}

export const getCategoryScope = (category: EmissionCategories): EmissionScope | undefined => {
  if (scopeOneCategories.indexOf(category) > -1) {
    return 1;
  }
  if (scopeTwoCategories.indexOf(category) > -1) {
    return 2;
  }
  if (scopeThreeCategories.indexOf(category) > -1) {
    return 3;
  }
  return undefined;
};

export const getScopeCategories = (scope: number) => {
  if (scope === 1) {
    return scopeOneCategories;
  }
  if (scope === 2) {
    return scopeTwoCategories;
  }
  return scopeThreeCategories;
};

export function arrayToObject(strings: string[], transformer: (str: string) => string = toUpper) {
  const result: any = {};
  strings.forEach((str) => {
    result[str] = transformer(str);
  });

  return result;
}

export const validateDate = (dateValue: string): { value: string | null; error: null | Array<Message> } => {
  let validDateFormats: string[] | undefined;

  // Check for month and YY format
  if (dateValue.match(/^[a-zA-Z0-9]+[\s/\-.][0-9]{2}$/)) {
    validDateFormats = ['MMMM/YY', 'MMM/YY', 'MM/YY', 'M/YY', 'MMMM YY', 'MMM YY', 'MM YY', 'M YY'];
  }

  // Check for MM/YYYY format
  if (dateValue.match(/^(0[1-9]|1[0-2])(\/|-|\.)[0-9]{4}$/)) {
    validDateFormats = ['MM/YYYY'];
  }

  if (dateValue.match(/^[0-9]{1,2}(\/|-|\.)[0-9]{1,2}(\/|-|\.)[0-9]+$/)) {
    validDateFormats = ['DD/MM/YYYY', 'DD/MM/YY', 'D/MM/YYYY', 'D/MM/YY', 'D/M/YYYY', 'D/M/YY', 'YYYY'];
  }

  // ! Removed support for MM/DD/YYYY format until we can get it re-implemented with an org setting
  if (dateValue.match(/^((0?[1-9])|10|11|12){1,2}(\/|-|\.)((1[3-9])|(2[0-9])|(3[0-1])){1,2}(\/|-|\.).+$/)) {
    // Putting the same date formats as the condition above so users can see which date formats they should put instead
    validDateFormats = ['DD/MM/YYYY', 'DD/MM/YY', 'D/MM/YYYY', 'D/MM/YY', 'D/M/YYYY', 'D/M/YY']; //['MM/DD/YYYY', 'MM/DD/YY', 'MM/D/YYYY', 'MM/D/YY', 'M/D/YYYY', 'M/D/YY', 'YYYY'];
  }

  if (validDateFormats) {
    const validDateFormatsDash = validDateFormats.map((f) => f.replace(/\//g, '-'));
    const validDateFormatsDot = validDateFormats.map((f) => f.replace(/\//g, '.'));
    validDateFormats = [...validDateFormats, ...validDateFormatsDot, ...validDateFormatsDash];
  }

  const dateObject = moment(dateValue, validDateFormats, validDateFormats !== undefined);

  const now = moment();

  const minDate = '2010-01-01';
  const pastMessage = 'This date is very far in the past/does not have a year';
  const futureMessage = 'This date is in the future';

  if (dateObject.isValid()) {
    if (dateObject.isAfter(now, 'year')) {
      return {
        value: dateValue,
        error: [new Message(futureMessage, 'error', 'validate')],
      };
    }
    if (dateObject.isBefore(minDate, 'day')) {
      return {
        value: dateValue,
        error: [new Message(pastMessage, 'error', 'validate')],
      };
    }
    return {
      value: dateObject.format('DD-MMM-YYYY'),
      error: null,
    };
  } else if (moment(dateValue, dateFormats.YearFormat, true).isValid()) {
    const yearDateObject = moment(dateValue, dateFormats.YearFormat, true);
    if (yearDateObject.isAfter(now, 'year')) {
      return {
        value: dateValue,
        error: [new Message(futureMessage, 'error', 'validate')],
      };
    }
    if (yearDateObject.isBefore(minDate, 'day')) {
      return {
        value: dateValue,
        error: [new Message(pastMessage, 'error', 'validate')],
      };
    }
    return {
      value: dateValue,
      error: null,
    };
  } else {
    const message = `Could not process date. Date must be in one of the following formats: ${
      validDateFormats ? validDateFormats.join(', ') : 'DD/MM/YYYY, MM/YYYY, YYYY'
    }`;
    return {
      value: dateValue,
      error: [new Message(message, 'error', 'validate')],
    };
  }
};

export function extractDelimiter(dateString: string) {
  const delimiter = dateString.split(/[\d\w]+/).find((element) => element.length > 0);
  return delimiter?.[0] || null;
}

/*
 * @normaliseCountry()
 * Extracts the country value from the input string and ensures that the returned value transformed on the applicable countries
 * */
export function normaliseCountry(value: string | null, countryList: { [key: string]: string }) {
  if (!value) return value;
  const valueLowerCase = value.toLowerCase();
  const findCountry = countryList[valueLowerCase];
  let finalCountry = findCountry || value;

  // Hack to make sure the behaviour in V1 stays consistent with the full string countries
  // vs keeping the country code as is in V2
  finalCountry = finalCountry.length === 2 ? finalCountry : toTitleCase(finalCountry);
  return finalCountry;
}

/*
 * @normaliseAmount()
 * Extracts the numeric value from the input string and ensures that the returned value always has two decimal points
 * */
export function normaliseAmount(value: string) {
  if (!value) return value;
  // Remove commas from the input string
  const cleanedInput = value.replace(/[$€£¥₹,]/g, '').trim();

  // Match a sequence of digits (optionally preceded by a negative sign and followed by a decimal point and more digits)
  const regex = /^(-?\d+(\.\d+)?)/;
  const match = cleanedInput.match(regex);

  if (match) {
    const number = parseFloat(match[0]);
    return number.toFixed(2);
  }

  return null;
}

export function isSubOrgValid(subOrgs: SubOrg[], value: string | null) {
  if (!value) return false;
  return !!subOrgs.find((org) => value.toLowerCase() === org.name.toLowerCase());
}

export function computeSubOrg(record: FlatfileRecord, session: FlatfileSession, logger: any) {
  const subOrgs: SubOrg[] = JSON.parse((session?.env?.subOrgs as string) || '[]');
  if (subOrgs) {
    const subOrgValue = record.get('subOrganisation');
    if (subOrgValue && !isSubOrgValid(subOrgs, subOrgValue as string)) {
      let message = 'Organisation does not have any sub-organisations';
      if (subOrgs.length > 1) {
        message = `Sub-organisation must be one of [${subOrgs.map((so) => so.name).join(' | ')}]`;
      } else if (subOrgs.length > 0) {
        message = `Sub-organisation must be ${subOrgs[0].name}`;
      }
      record.addError(['subOrganisation'], message);
    }
  } else {
    logger?.error('Expected subOrgs variables is not coming through');
  }
}

export function checkValidEmissionCategory(record: FlatfileRecord) {
  const scope = record.get('scope');
  const emissionCategory = record.get('emissionCategory');
  if (scope && emissionCategory) {
    if (!isEmissionCategoryValid(emissionCategory as string, scope as EmissionScope)) {
      record.addError(
        ['emissionCategory'],
        `Emission category must be one of [${getScopeCategories(scope as EmissionScope).join(' | ')}]`,
      );
    }
  }
}

export function unitMappings(unit: string) {
  let finalUnit = unit;

  // Exclude units where casing matters
  if (!['Ml', 'Gl', 'Tbs', 'MMBTU'].includes(unit)) {
    finalUnit = unit.toLowerCase();
  }

  if (unit.toLowerCase() === 'mmbtu') {
    finalUnit = 'MMBTU';
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
    'gigawatt hours': 'GWh',
  };

  if (mappings[finalUnit] !== undefined) {
    return mappings[finalUnit];
  }

  return finalUnit;
}

export function isMassValid(value: string) {
  let inputUnitValue = value?.trim() as string;

  if (supportedMassUnits.indexOf(inputUnitValue) === -1) {
    inputUnitValue = unitMappings(inputUnitValue);
  }

  if (supportedMassUnits.includes(inputUnitValue)) {
    return { valid: true, castedValue: inputUnitValue };
  } else {
    return { valid: false, castedValue: null };
  }
}

export function isEnergyValid(value: string) {
  let inputUnitValue = value?.trim() as string;
  if (supportedEnergyUnits.indexOf(inputUnitValue) > -1) {
    return { valid: true, castedValue: inputUnitValue };
  } else {
    return { valid: false, castedValue: null };
  }
}

// Avarni V2 specific utils

export function validateInputUnit(record: FlatfileRecord, session: FlatfileSession) {
  const validInputUnits: string[] = JSON.parse((session?.env?.validInputUnits as string) || '[]');
  const inputUnitType = session?.env?.inputUnitType as string;
  const validInputUnitsSet = new Set(validInputUnits);

  const inputUnit = record.get('inputUnit');
  if (inputUnit) {
    let valid = false;
    const inputUnitStr = inputUnit as string;
    let castedValue = '';

    // Helper function to check and set valid unit
    const checkAndSetValidUnit = (unit: string) => {
      if (validInputUnitsSet.has(unit)) {
        castedValue = unit;
        valid = true;
      }
    };

    // If the input is an exact match then its valid
    checkAndSetValidUnit(inputUnitStr);

    // If the input is a valid unit when lowercased then its valid
    if (!valid) {
      checkAndSetValidUnit(inputUnitStr.toLowerCase());
    }
    // If the input is a valid unit when uppercased then its valid
    if (!valid) {
      checkAndSetValidUnit(inputUnitStr.toUpperCase());
    }
    // If the input has an s (plural) at the end and the singular is valid then its valid
    if (!valid && inputUnitStr.endsWith('s')) {
      checkAndSetValidUnit(inputUnitStr.slice(0, -1));
    }
    // If the input has spaces or a dash and the spaces/dashes are removed and the result is valid then its valid
    // If the input has spaces or a dash and the spaces/dashes are replaced with the other and the result is valid then its valid
    if (!valid) {
      const transformations = [
        inputUnitStr.replace(/ /g, ''),
        inputUnitStr.replace(/-/g, ''),
        inputUnitStr.replace(/ /g, '-'),
        inputUnitStr.replace(/-/g, ' '),
      ];
      transformations.forEach(checkAndSetValidUnit);
    }

    if (!valid) {
      record.addError(['inputUnit'], `Valid units for type ${inputUnitType} are: ${validInputUnits.join(' / ')}`);
    } else {
      record.set('inputUnit', castedValue);
    }
  }
}

const getScopeCategoriesv2 = (scope: Scope) => {
  if (scope === Scope.Scope1) {
    return scopeOneCategoriesv2;
  }
  if (scope === Scope.Scope2) {
    return scopeTwoCategoriesv2;
  }
  return scopeThreeCategoriesv2;
};

export const validateGhgCategory = (record: FlatfileRecord, session: FlatfileSession) => {
  const scope: Scope = session?.env?.scope as Scope;
  const validGhgCategories = getScopeCategoriesv2(scope);
  const ghgCategory = record.get('ghgCategory');
  if (ghgCategory) {
    let castedValue: string | undefined;

    const categoryMap: Record<string, GhgCategory> = {};
    validGhgCategories.forEach((category) => {
      const categoryKey = (category as string).toLowerCase().replace(/ /g, '').replace(/-/g, '');
      categoryMap[categoryKey] = category;
    });

    const ghgCategoryNormalised = (ghgCategory as string).toLowerCase().replace(/ /g, '').replace(/-/g, '');
    castedValue = categoryMap[ghgCategoryNormalised];

    const MIN_SUBSTRING_LENGTH = 4;

    // If not valid at this stage, check if either the ghgCategory is a substring of a valid category or vice versa
    // We have a simple guard for short strings (MIN_SUBSTRING_LENGTH) to avoid false positives
    if (!castedValue && ghgCategoryNormalised.length >= MIN_SUBSTRING_LENGTH) {
      for (const categoryKey in categoryMap) {
        if (categoryKey.includes(ghgCategoryNormalised) || ghgCategoryNormalised.includes(categoryKey)) {
          castedValue = categoryMap[categoryKey];
          break;
        }
      }
    }
    if (!castedValue) {
      record.addError(
        ['ghgCategory'],
        `Valid categories for Scope ${scope[scope.length - 1]} are: ${validGhgCategories.join(' / ')}`,
      );
    } else {
      record.set('ghgCategory', castedValue);
    }
  }
};
