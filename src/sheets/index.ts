import {
    AvSpendPortal,
    AvSpendSheet,
    AvSpendWithSubOrgPortal,
    AvSpendWithSubOrgSheet
} from './spend';
import {
    AvFuelPortal,
    AvFuelSheet,
    AvFuelWithSubOrgPortal,
    AvFuelWithSubOrgSheet
} from './fuel';
import {
    AvEnergyPortal,
    AvEnergySheet,
    AvEnergyWithSubOrgPortal,
    AvEnergyWithSubOrgSheet
} from './energy';
import {
    AvTravelPortal,
    AvTravelSheet
} from './travel';

export const portals = [
    AvSpendWithSubOrgPortal,
    AvSpendPortal,
    AvFuelWithSubOrgPortal,
    AvFuelPortal,
    AvEnergyPortal,
    AvEnergyWithSubOrgPortal,
    AvTravelPortal
]
export const sheets = {
    AvSpendWithSubOrgSheet,
    AvSpendSheet,
    AvFuelSheet,
    AvFuelWithSubOrgSheet,
    AvEnergySheet,
    AvEnergyWithSubOrgSheet,
    AvTravelSheet
}