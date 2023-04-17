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

export const portals = [AvSpendWithSubOrgPortal,AvSpendPortal,AvFuelWithSubOrgPortal, AvFuelPortal,]
export const sheets = { AvSpendWithSubOrgSheet, AvSpendSheet, AvFuelSheet,AvFuelWithSubOrgSheet }