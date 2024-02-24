import { convertibles } from './unitConversion';
import countriesJSON from '../assets/countries.json';

interface Country {
    alpha2Code: string;
    alpha3Code: string;
    name: string;
    alternateNames: string[];
}

export const scopeOneCategories = ['non transport combustion', 'transport combustion', 'fugitive'];

export const scopeTwoCategories = ['location based', 'market based'];

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
    'investments',
];

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
    'south africa',
    'united arab emirates',
];

for (const energyCountry of energyCountries) {
    const countryJSON = countriesJSON.find((countryJSON) => {
        return (
            countryJSON.alpha2Code === energyCountry ||
            countryJSON.alpha3Code === energyCountry ||
            countryJSON.name === energyCountry ||
            countryJSON.alternateNames.indexOf(energyCountry) > -1
        );
    });
    updateCountryLookup(supportedEnergyCountriesLookup, countryJSON);
}

export const scopeCategories = [scopeOneCategories, scopeTwoCategories, scopeThreeCategories];

export const dateFormats = {
    DateFormatToBackend: 'DD-MMM-YYYY',
    YearFormat: 'YYYY',
    YearMonthFormat: 'YYYY-MM',
    MonthYearFormat: 'MM/YYYY',
};

export const supportedCurrencies = [
    'AED',
    'AUD',
    'CAD',
    'CHF',
    'CNY',
    'CZK',
    'DKK',
    'EUR',
    'GBP',
    'HKD',
    'HUF',
    'IDR',
    'ILS',
    'INR',
    'JPY',
    'MXN',
    'MYR',
    'NOK',
    'NZD',
    'PHP',
    'PKR',
    'PLN',
    'SAR',
    'SBD',
    'SEK',
    'SGD',
    'THB',
    'TRY',
    'TOP',
    'USD',
    'VUV',
    'WST',
    'XPF',
    'ZAR',
    'LKR',
];

export const supportedEnergyCountries: { [key: string]: string } = supportedEnergyCountriesLookup;
export const countries: { [key: string]: string } = countriesLookup;

export const supportedMassUnits = [...convertibles('kL'), ...convertibles('kg'), ...convertibles('kWh')];
export const supportedEnergyUnits = convertibles('kWh');

// V2 constants
export const GhgCategory = {
    NonTransportCombustion: 'Non-transport combustion',
    TransportCombustion: 'Transport combustion',
    Fugitive: 'Fugitive',
    LocationBased: 'Location based',
    MarketBased: 'Market based',
    PurchasedGoodsAndServices: 'Purchased goods and services',
    CapitalGoods: 'Capital goods',
    FuelAndEnergy: 'Fuel and energy',
    UpstreamTransportationAndDistribution: 'Upstream transportation and distribution',
    Waste: 'Waste',
    BusinessTravel: 'Business travel',
    EmployeeCommuting: 'Employee commuting',
    UpstreamLeasedAssets: 'Upstream leased assets',
    DownstreamTransportationAndDistribution: 'Downstream transportation and distribution',
    ProcessingOfSoldProducts: 'Processing of sold products',
    UseOfSoldProducts: 'Use of sold products',
    EndOfLifeTreatmentOfSoldProducts: 'End-of-life treatment of sold products',
    DownstreamLeasedAssets: 'Downstream leased assets',
    Franchises: 'Franchises',
    Investments: 'Investments',
} as const;
export type GhgCategory = (typeof GhgCategory)[keyof typeof GhgCategory];

export const scopeOneCategoriesv2: GhgCategory[] = [
    GhgCategory.NonTransportCombustion,
    GhgCategory.TransportCombustion,
    GhgCategory.Fugitive,
];

export const scopeTwoCategoriesv2: GhgCategory[] = [GhgCategory.LocationBased, GhgCategory.MarketBased];

export const scopeThreeCategoriesv2: GhgCategory[] = [
    GhgCategory.PurchasedGoodsAndServices,
    GhgCategory.CapitalGoods,
    GhgCategory.FuelAndEnergy,
    GhgCategory.UpstreamTransportationAndDistribution,
    GhgCategory.Waste,
    GhgCategory.BusinessTravel,
    GhgCategory.EmployeeCommuting,
    GhgCategory.UpstreamLeasedAssets,
    GhgCategory.DownstreamTransportationAndDistribution,
    GhgCategory.ProcessingOfSoldProducts,
    GhgCategory.UseOfSoldProducts,
    GhgCategory.EndOfLifeTreatmentOfSoldProducts,
    GhgCategory.DownstreamLeasedAssets,
    GhgCategory.Franchises,
];

const updateCountryLookupv2 = (countryLookup: Record<string, string>, countryJSON?: Country) => {
    if (!countryJSON || !countryJSON.alpha2Code) {
        return;
    }

    const alpha2Code = countryJSON.alpha2Code.toUpperCase();

    if (countryJSON.name) {
        countryLookup[countryJSON.name] = alpha2Code;
    }
    if (countryJSON.alpha2Code) {
        countryLookup[countryJSON.alpha2Code] = alpha2Code;
    }
    if (countryJSON.alpha3Code) {
        countryLookup[countryJSON.alpha3Code] = alpha2Code;
    }
    if (countryJSON.alternateNames?.length) {
        for (const alternateName of countryJSON.alternateNames) {
            if (alternateName) {
                countryLookup[alternateName] = alpha2Code;
            }
        }
    }
};

const countriesLookupv2: Record<string, string> = {};

for (const countryJSON of countriesJSON) {
    updateCountryLookupv2(countriesLookupv2, countryJSON);
}

export const countriesv2: Record<string, string> = countriesLookupv2;
