import moment from 'moment';
import {
  currencyExchangeRates,
  supportedCurrencies
} from './constants';
import configureMeasurements, {
  AllMeasures,
  allMeasures,
  AllMeasuresSystems,
  AllMeasuresUnits,
  energy,
  EnergySystems,
  EnergyUnits,
  length,
  LengthSystems,
  LengthUnits,
  mass,
  MassSystems,
  MassUnits,
  Measure,
  volume,
  VolumeSystems,
  VolumeUnits,
} from 'convert-units';
export type CurrencyExchangeRate = {
  PointInTime: number;
  InterbankRate: number;
  InverseInterbankRate: number;
};
const findClosestExchangeYear = (initYear: number, rates: CurrencyExchangeRate[]) => {
  let year = initYear;
  const sortedRates = rates.sort((a, b) => moment(a.PointInTime).year() - moment(b.PointInTime).year());
  const lowestYearInRates = moment(sortedRates[0].PointInTime).year();
  while (year > lowestYearInRates) {
    const rate = rates.find((data) => year === moment(data.PointInTime).year());
    if (rate) return rate;
    year -= 1;
  }
  return undefined;
};
export const convertCurrency = (inputAmount: number, inputCurrency: string, outputCurrency: string, year: number) => {
  const twoDecimalRounding = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;
  const output = {
    exchangeRate: 0,
    modifiedAmount: 0,
  };

  if (inputCurrency in currencyExchangeRates && outputCurrency === 'USD') {
    const rateInUSD = findClosestExchangeYear(year, currencyExchangeRates[inputCurrency]);
    if (rateInUSD) {
      output.exchangeRate = rateInUSD.InverseInterbankRate;
      output.modifiedAmount = twoDecimalRounding(inputAmount / Number(rateInUSD.InverseInterbankRate));
    }
  } else if (inputCurrency === 'USD' && outputCurrency in currencyExchangeRates) {
    const rateFromUSD = findClosestExchangeYear(year, currencyExchangeRates[outputCurrency]);
    if (rateFromUSD) {
      output.exchangeRate = rateFromUSD.InterbankRate;
      output.modifiedAmount = twoDecimalRounding(inputAmount / Number(rateFromUSD.InterbankRate));
    }
  } else if (inputCurrency in currencyExchangeRates && outputCurrency in currencyExchangeRates) {
    // convert current currency to usd first
    const rateInUSD = findClosestExchangeYear(year, currencyExchangeRates[inputCurrency]);
    const rateFromUSD = findClosestExchangeYear(year, currencyExchangeRates[outputCurrency]);
    if (rateInUSD && rateFromUSD) {
      const amountInUSD = inputAmount / Number(rateInUSD.InverseInterbankRate);
      const amountFromUSD = amountInUSD / Number(rateFromUSD.InterbankRate);

      output.exchangeRate = rateFromUSD.InterbankRate;
      output.modifiedAmount = amountFromUSD;
    }
  }

  return output;
};

type NewMassUnits = MassUnits | 'ton' | 'tonne';
const extendedMass: Measure<MassSystems, NewMassUnits> = {
  systems: {
    metric: {
      ...mass.systems.metric,
      tonne: {
        name: {
          singular: 'Tonne',
          plural: 'Tonnes',
        },
        to_anchor: 1000000,
      },
    },
    imperial: {
      ...mass.systems.imperial,
      ton: {
        name: {
          singular: 'Ton',
          plural: 'Tons',
        },
        to_anchor: 2000,
      },
    },
  },
  anchors: {
    ...mass.anchors,
  },
};

type NewVolumeUnits = VolumeUnits | 'kL' | 'scf';
const extendedVolume: Measure<VolumeSystems, NewVolumeUnits> = {
  systems: {
    metric: {
      ...volume.systems.metric,
      kL: {
        name: {
          singular: 'Kilolitre',
          plural: 'Kilolitres',
        },
        to_anchor: 1000,
      },
    },
    imperial: {
      ...volume.systems.imperial,
      scf: {
        name: {
          singular: 'Standard cubic foot',
          plural: 'Standard cubic feet',
        },
        to_anchor: 957.506,
      },
    },
  },
  anchors: {
    ...volume.anchors,
  },
};

type NewEnergyUnits = EnergyUnits | 'kwh';
const extendedEnergy: Measure<EnergySystems, NewEnergyUnits> = {
  systems: {
    SI: {
      ...energy.systems.SI,
      kwh: {
        name: {
          singular: 'Kilowatt-hour',
          plural: 'Kilowatt-hours',
        },
        to_anchor: 3600000,
      },
    },
  },
  anchors: {
    ...energy.anchors,
  },
};

type NewLengthUnits = LengthUnits | 'km' | 'passenger-km';
const extendedLength: Measure<LengthSystems, NewLengthUnits> = {
  systems: {
    metric: {
      ...length.systems.metric,
      km: {
        name: {
          singular: 'Kilometer',
          plural: 'Kilometers',
        },
        to_anchor: 1000,
      },
      'passenger-km': {
        name: {
          singular: 'passenger-km',
          plural: 'passenger-kms',
        },
        to_anchor: 1000,
      },
    },
  },
  anchors: {
    ...length.anchors,
  },
};

type NewAllMeasuresUnits = Omit<AllMeasuresUnits, MassUnits | VolumeUnits | EnergyUnits> &
  NewMassUnits &
  NewVolumeUnits &
  NewEnergyUnits;

const convert = configureMeasurements<AllMeasures, AllMeasuresSystems, NewAllMeasuresUnits>({
  ...allMeasures,
  mass: extendedMass,
  volume: extendedVolume,
  energy: extendedEnergy,
  length: extendedLength,
});

export const convertibles = (unit: string) => {
  if (
    convert()
      .list()
      .map((item) => item.abbr)
      .includes(unit)
  ) {
    return convert()
      .from(unit as NewAllMeasuresUnits)
      .possibilities();
  }
  return [unit];
};

export const convertToUnit = (amount: number, to: string, from: string, year: number) => {
  if (supportedCurrencies.indexOf(to.toUpperCase()) > -1) {
    const { modifiedAmount } = convertCurrency(amount, to, from, year);
    return modifiedAmount;
  }

  if (
    convert()
      .list()
      .map((item) => item.abbr)
      .includes(to) &&
    convert()
      .list()
      .map((item) => item.abbr)
      .includes(from)
  ) {
    return convert(amount)
      .from(from as NewAllMeasuresUnits)
      .to(to as NewAllMeasuresUnits);
  }
  return amount;
};
