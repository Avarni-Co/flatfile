import { AvSpendPortal, AvSpendSheet } from './spend';
import { AvFuelPortal, AvFuelSheet } from './fuel';
import { AvEnergyPortal, AvEnergySheet } from './energy';
import { AvTravelPortal, AvTravelSheet } from './travel';
import { AvActivityPortal, AvActivitySheet } from './activity';

export const portals = [AvSpendPortal, AvFuelPortal, AvEnergyPortal, AvTravelPortal, AvActivityPortal];
export const sheets = {
    AvSpendSheet,
    AvFuelSheet,
    AvEnergySheet,
    AvTravelSheet,
    AvActivitySheet,
};
