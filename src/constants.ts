import { convertibles } from './unitConversion'
import countriesJSON from '../assets/countries.json';

interface Country {
  alpha2Code: string;
  alpha3Code: string;
  name: string;
  alternateNames: string[];
}

export const scopeOneCategories = [
  'non transport combustion',
  'transport combustion',
  'fugitive'
]

export const scopeTwoCategories = ['location based', 'market based']

export const scopeThreeCategories = [
  'purchased goods and services',
  'capital goods',
  'fuel and energy',
  'upstream transportation and distribution',
  'waste',
  'business travel',
  'employee commuting',
  'upstream leased assets',
  'downstream transportation and distribution',
  'processing of sold products',
  'use of sold products',
  'end-of-life treatment of sold products',
  'downstream leased assets',
  'franchises',
  'investments'
]

const updateCountryLookup = (countryLookup: { [key: string]: string }, countryJSON?: Country) => {
  if (!countryJSON?.name) {
    return;
  } else {
    countryLookup[countryJSON.name] = countryJSON.name;
  }
  if (countryJSON?.alpha2Code) {
    countryLookup[countryJSON.alpha2Code] = countryJSON.name;
  }
  if (countryJSON?.alpha3Code) {
    countryLookup[countryJSON.alpha3Code] = countryJSON.name;
  }
  if (countryJSON?.alternateNames?.length) {
    for (const alternateName of countryJSON.alternateNames) {
      if (alternateName) {
        countryLookup[alternateName] = countryJSON.name;
      }
    }
  }
};

const countriesLookup: { [key: string]: string } = {};
const supportedEnergyCountriesLookup: { [key: string]: string } = {};

for (const countryJSON of countriesJSON) {
  updateCountryLookup(countriesLookup, countryJSON);
}

const energyCountries = [
  'united states',
  'canada',
  'australia',
  'iceland',
  'hungary',
  'finland',
  'bulgaria',
  'portugal',
  'cyprus',
  'sweden',
  'denmark',
  'lithuania',
  'france',
  'romania',
  'bosnia and herzegovina',
  'italy',
  'germany',
  'poland',
  'croatia',
  'united kingdom',
  'slovenia',
  'luxembourg',
  'latvia',
  'estonia',
  'belgium',
  'greece',
  'netherlands',
  'norway',
  'ireland',
  'malta',
  'slovakia',
  'serbia',
  'montenegro',
  'austria',
  'czech republic',
  'spain',
  'switzerland',
  'argentina',
  'bangladesh',
  'brazil',
  'china',
  'colombia',
  'indonesia',
  'india',
  'japan',
  'south korea',
  'mexico',
  'nigeria',
  'nepal',
  'philippines',
  'pakistan',
  'russia',
  'saudi arabia',
  'turkey',
  'vietnam',
  'south africa'
];

for (const energyCountry of energyCountries) {
  const countryJSON = countriesJSON.find((countryJSON) => {
    return countryJSON.alpha2Code === energyCountry ||
      countryJSON.alpha3Code === energyCountry ||
      countryJSON.name === energyCountry ||
      countryJSON.alternateNames.indexOf(energyCountry) > -1
  });
  updateCountryLookup(supportedEnergyCountriesLookup, countryJSON);
}

export const scopeCategories = [
  scopeOneCategories,
  scopeTwoCategories,
  scopeThreeCategories
]

export const dateFormats = {
  DateFormatToBackend: 'DD-MMM-YYYY',
  YearFormat: 'YYYY',
  YearMonthFormat: 'YYYY-MM',
  MonthYearFormat: 'MM/YYYY'
}

export const supportedCurrencies = [
  'AED',
  'AUD',
  'AZN',
  'BGN',
  'BHD',
  'BND',
  'BRL',
  'CAD',
  'CHF',
  'CNY',
  'CZK',
  'DKK',
  'EGP',
  'EUR',
  'GBP',
  'HKD',
  'HUF',
  'IDR',
  'ILS',
  'INR',
  'JPY',
  'KRW',
  'KWD',
  'LKR',
  'MAD',
  'MGA',
  'MXN',
  'MYR',
  'NOK',
  'NZD',
  'OMR',
  'PEN',
  'PGK',
  'PHP',
  'PKR',
  'PLN',
  'SAR',
  'SBD',
  'SEK',
  'SCR',
  'SGD',
  'THB',
  'TRY',
  'TOP',
  'TWD',
  'TZS',
  'USD',
  'VND',
  'VUV',
  'WST',
  'XOF',
  'XPF',
  'ZAR'
]

export const supportedEnergyCountries: { [key: string]: string } = supportedEnergyCountriesLookup;
export const countries: { [key: string]: string } = countriesLookup;

export const supportedMassUnits = [
  ...convertibles('kL'),
  ...convertibles('kg'),
  ...convertibles('kWh')
]
export const supportedEnergyUnits = convertibles('kWh')
