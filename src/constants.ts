import { convertibles } from './unitConversion'

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
export const supportedEnergyCountries = [
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
]
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
export const countries = [
  'afghanistan',
  'albania',
  'algeria',
  'andorra',
  'angola',
  'antigua',
  'argentina',
  'armenia',
  'australia',
  'austria',
  'azerbaijan',
  'bahamas',
  'bahrain',
  'bangladesh',
  'barbados',
  'belarus',
  'belgium',
  'belize',
  'bermuda',
  'benin',
  'bhutan',
  'bolivia',
  'botswana',
  'brazil',
  'brunei',
  'bulgaria',
  'burkina',
  'burundi',
  'cambodia',
  'cameroon',
  'canada',
  'cape verde',
  'cayman islands',
  'central african republic',
  'chad',
  'chile',
  'china',
  'colombia',
  'comoros',
  'congo',
  'democratic republic congo',
  'costa rica',
  'croatia',
  'cuba',
  'cyprus',
  'czech republic',
  'denmark',
  'djibouti',
  'dominica',
  'dominican republic',
  'east timor',
  'ecuador',
  'egypt',
  'el salvador',
  'equatorial guinea',
  'eritrea',
  'estonia',
  'ethiopia',
  'faroe islands',
  'fiji',
  'finland',
  'france',
  'gabon',
  'gambia',
  'georgia',
  'germany',
  'ghana',
  'gibraltar',
  'greece',
  'grenada',
  'guatemala',
  'guinea',
  'guinea-bissau',
  'guyana',
  'haiti',
  'honduras',
  'hong kong',
  'hungary',
  'iceland',
  'india',
  'indonesia',
  'iran',
  'iraq',
  'ireland',
  'israel',
  'italy',
  'ivory coast',
  'jamaica',
  'japan',
  'jordan',
  'kazakhstan',
  'kenya',
  'kiribati',
  'north korea',
  'south korea',
  'kosovo',
  'kuwait',
  'kyrgyzstan',
  'laos',
  'latvia',
  'lebanon',
  'lesotho',
  'liberia',
  'libya',
  'liechtenstein',
  'lithuania',
  'luxembourg',
  'macau',
  'madagascar',
  'malawi',
  'malaysia',
  'maldives',
  'mali',
  'malta',
  'marshall islands',
  'mauritania',
  'mauritius',
  'mexico',
  'micronesia',
  'moldova',
  'monaco',
  'mongolia',
  'montenegro',
  'morocco',
  'mozambique',
  'myanmar',
  'namibia',
  'nauru',
  'nepal',
  'netherlands',
  'new zealand',
  'nicaragua',
  'niger',
  'nigeria',
  'north macedonia',
  'norway',
  'oman',
  'pakistan',
  'palau',
  'panama',
  'papua new guinea',
  'paraguay',
  'peru',
  'philippines',
  'poland',
  'portugal',
  'puerto rico',
  'qatar',
  'romania',
  'russia',
  'rwanda',
  'st kitts & nevis',
  'st lucia',
  'saint vincent & the grenadines',
  'samoa',
  'san marino',
  'sao tome & principe',
  'saudi arabia',
  'senegal',
  'serbia',
  'seychelles',
  'sierra leone',
  'singapore',
  'slovakia',
  'slovenia',
  'solomon islands',
  'somalia',
  'south africa',
  'south sudan',
  'spain',
  'sri lanka',
  'sudan',
  'suriname',
  'swaziland',
  'sweden',
  'switzerland',
  'syria',
  'taiwan',
  'tajikistan',
  'tanzania',
  'thailand',
  'togo',
  'tonga',
  'trinidad & tobago',
  'tunisia',
  'turkey',
  'turkmenistan',
  'tuvalu',
  'uganda',
  'ukraine',
  'united arab emirates',
  'united kingdom',
  'united states',
  'uruguay',
  'uzbekistan',
  'vanuatu',
  'vatican city',
  'venezuela',
  'vietnam',
  'yemen',
  'zambia',
  'zimbabwe',
  'palestine',
  'aruba',
  'new caledonia',
  'french polynesia',
  'bosnia and herzegovina',
  'greenland'
]

export const supportedMassUnits = [
  ...convertibles('kL'),
  ...convertibles('kg'),
  ...convertibles('kWh')
]
export const supportedEnergyUnits = convertibles('kWh')
