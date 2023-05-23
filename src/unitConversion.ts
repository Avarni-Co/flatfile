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
  VolumeUnits
} from 'convert-units'

type NewMassUnits = MassUnits | 'ton' | 'tonne'
const extendedMass: Measure<MassSystems, NewMassUnits> = {
  systems: {
    metric: {
      ...mass.systems.metric,
      tonne: {
        name: {
          singular: 'Tonne',
          plural: 'Tonnes'
        },
        to_anchor: 1000000
      }
    },
    imperial: {
      ...mass.systems.imperial,
      ton: {
        name: {
          singular: 'Ton',
          plural: 'Tons'
        },
        to_anchor: 2000
      }
    }
  },
  anchors: {
    ...mass.anchors
  }
}

type NewVolumeUnits = VolumeUnits | 'kL' | 'scf' | 'ccf'
const extendedVolume: Measure<VolumeSystems, NewVolumeUnits> = {
  systems: {
    metric: {
      ...volume.systems.metric,
      kL: {
        name: {
          singular: 'Kilolitre',
          plural: 'Kilolitres'
        },
        to_anchor: 1000
      }
    },
    imperial: {
      ...volume.systems.imperial,
      scf: {
        name: {
          singular: 'Standard cubic foot',
          plural: 'Standard cubic feet'
        },
        to_anchor: 957.506
      },
      ccf: {
        name: {
          singular: 'Hundred cubic foot',
          plural: 'Hundred cubic feet'
        },
        to_anchor: 95750.6
      }
    }
  },
  anchors: {
    ...volume.anchors
  }
}

type NewEnergyUnits = EnergyUnits | 'kwh' | 'thm' | 'MMBTU'
const extendedEnergy: Measure<EnergySystems, NewEnergyUnits> = {
  systems: {
    SI: {
      ...energy.systems.SI,
      kwh: {
        name: {
          singular: 'Kilowatt-hour',
          plural: 'Kilowatt-hours'
        },
        to_anchor: 3600000
      },
      thm: {
        name: {
          singular: 'US therm',
          plural: 'US therms'
        },
        to_anchor: 105505585.262
      },
      MMBTU: {
        name: {
          singular: 'Million british thermal unit',
          plural: 'Million british thermal units'
        },
        to_anchor: 1055055852.62
      }
    }
  },
  anchors: {
    ...energy.anchors
  }
}

type NewLengthUnits = LengthUnits | 'km' | 'passenger-km'
const extendedLength: Measure<LengthSystems, NewLengthUnits> = {
  systems: {
    metric: {
      ...length.systems.metric,
      km: {
        name: {
          singular: 'Kilometer',
          plural: 'Kilometers'
        },
        to_anchor: 1000
      },
      'passenger-km': {
        name: {
          singular: 'passenger-km',
          plural: 'passenger-kms'
        },
        to_anchor: 1000
      }
    }
  },
  anchors: {
    ...length.anchors
  }
}

type NewAllMeasuresUnits = Omit<
  AllMeasuresUnits,
  MassUnits | VolumeUnits | EnergyUnits
> &
  NewMassUnits &
  NewVolumeUnits &
  NewEnergyUnits

const convert = configureMeasurements<
  AllMeasures,
  AllMeasuresSystems,
  NewAllMeasuresUnits
>({
  ...allMeasures,
  mass: extendedMass,
  volume: extendedVolume,
  energy: extendedEnergy,
  length: extendedLength
})

export const convertibles = (unit: string) => {
  if (
    convert()
      .list()
      .map((item) => item.abbr)
      .includes(unit)
  ) {
    return convert()
      .from(unit as NewAllMeasuresUnits)
      .possibilities()
  }
  return [unit]
}
