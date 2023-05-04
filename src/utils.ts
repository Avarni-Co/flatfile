import {
    startCase,
    toLower,
    toUpper
} from "lodash";
import {
    dateFormats,
    MMBTU,
    scopeOneCategories,
    scopeThreeCategories,
    scopeTwoCategories,
    supportedCurrencies,
    supportedDatePeriods,
    supportedEnergyUnits,
    supportedMassUnits
} from "./constants";
import {
    EmissionCategories,
    EmissionScope,
    UserOrg
} from './types';
import { Message } from '@flatfile/configure';
import moment from "moment";
import {
    FlatfileRecord,
    FlatfileSession
} from '@flatfile/hooks';

export function toTitleCase ( str : string ) {
    return startCase( toLower( str ) )
}

export function isCountryValid ( countryVal : string, countryList : string[] ) {
    const countryValLowercase = countryVal?.trim().toLowerCase();
    return countryValLowercase === '' || countryList.indexOf( countryValLowercase ) > -1;
}

export function isEmissionCategoryValid ( value : string, scope : EmissionScope ) {
    const countryValLowercase = value?.trim().toLowerCase();
    return countryValLowercase === '' || getScopeCategories( scope ).includes( countryValLowercase );
}

export function isDatePeriodValid ( value : string ) {
    const datePeriodLowercase = value?.trim().toLowerCase();
    return datePeriodLowercase === '' || supportedDatePeriods.indexOf( datePeriodLowercase ) > -1;
}

export function isCurrencyValid ( value : string ) {
    const currencyValLowercase = value?.trim().toUpperCase();
    return currencyValLowercase === '' || supportedCurrencies.indexOf( currencyValLowercase ) > -1;
}

export const getCategoryScope = ( category : EmissionCategories ) : EmissionScope | undefined => {
    if ( scopeOneCategories.indexOf( category ) > -1 ) {
        return 1;
    }
    if ( scopeTwoCategories.indexOf( category ) > -1 ) {
        return 2;
    }
    if ( scopeThreeCategories.indexOf( category ) > -1 ) {
        return 3;
    }
    return undefined;
};

export const getScopeCategories = ( scope : number ) => {
    if ( scope === 1 ) {
        return scopeOneCategories;
    }
    if ( scope === 2 ) {
        return scopeTwoCategories;
    }
    return scopeThreeCategories;
};

export function arrayToObject ( strings : string[], transformer : ( str : string ) => string = toUpper ) {
    const result : any = {};
    strings.forEach( ( str ) => {
        result[ str ] = transformer( str );
    } );

    return result;
}

export const validateDate = ( dateValue : string ) : { value : string | null, error : null | Array<Message> } => {

    let validDateFormats : string[] | undefined;

    // Check for month and YY format
    if ( dateValue.match( /^[a-zA-Z0-9]+[\s/\-.][0-9]{2}$/ ) ) {
        validDateFormats = ['MMMM/YY', 'MMM/YY', 'MM/YY', 'M/YY', 'MMMM YY', 'MMM YY', 'MM YY', 'M YY'];
    }

    // Check for MM/YYYY format
    if ( dateValue.match( /^(0[1-9]|1[0-2])(\/|-|\.)[0-9]{4}$/ ) ) {
        validDateFormats = ['MM/YYYY'];
    }

    if ( dateValue.match( /^[0-9]{1,2}(\/|-|\.)[0-9]{1,2}(\/|-|\.)[0-9]+$/ ) ) {
        validDateFormats = ['DD/MM/YYYY', 'DD/MM/YY', 'D/MM/YYYY', 'D/MM/YY', 'D/M/YYYY', 'D/M/YY', 'YYYY'];
    }

    if ( dateValue.match( /^((0?[1-9])|10|11|12)(\/|-|\.)((1[3-9])|(2[0-9])|(3[0-1]))(\/|-|\.).+$/ ) ) {
        validDateFormats = ['MM/DD/YYYY', 'MM/DD/YY', 'MM/D/YYYY', 'MM/D/YY', 'M/D/YYYY', 'M/D/YY', 'YYYY'];
    }

    if ( validDateFormats ) {
        const validDateFormatsDash = validDateFormats.map( ( f ) => f.replace( /\//g, '-' ) );
        const validDateFormatsDot = validDateFormats.map( ( f ) => f.replace( /\//g, '.' ) );
        validDateFormats = [...validDateFormats, ...validDateFormatsDot, ...validDateFormatsDash];
    }

    const dateObject = moment( dateValue, validDateFormats, validDateFormats !== undefined );

     if ( dateObject.isValid() ) {
        return {
            value : dateObject.format( dateFormats.DateFormatToBackend ),
            error : null
        }
    }else if ( moment( dateValue, dateFormats.YearFormat, true ).isValid() ) {
         return {
             value : dateObject.format( dateFormats.YearFormat ),
             error : null
         }
     } else {
        const message = `Could not process date. Date must be in one of the following formats: ${
            validDateFormats ? validDateFormats.join( ', ' ) : ''
        }`;
        return {
            value : null, error:[new Message( message, 'error', "validate" )]
        }
    }
}


export function extractDelimiter(dateString:string) {
    const delimiter = dateString.split(/[\d\w]+/).find(element => element.length > 0);
    return delimiter?.[0]||null;
}

/*
* @normaliseAmount()
* Extracts the numeric value from the input string and ensures that the returned value always has two decimal points
* */
export function normaliseAmount ( value : string ) {
    if ( !value ) return value;
    // Remove commas from the input string
    const cleanedInput = value.replace( /,/g, '' );

    // Match a sequence of digits (optionally preceded by a negative sign and followed by a decimal point and more digits)
    const regex = /(-?\d+(\.\d+)?)/;
    const match = cleanedInput.match( regex );

    if ( match ) {
        // Parse the matched value as a float and make it positive using Math.abs()
        const number = parseFloat( match[ 0 ] ) ;
        return number.toFixed( 2 );
    }

    return null;
}

export function isSubOrgValid ( userOrgs : UserOrg[], value : string | null ) {
    if ( !value ) return false;
    return !!userOrgs.find( ( org ) => value.toLowerCase() === org.orgName.toLowerCase() )
}

export function computeSubOrg ( record : FlatfileRecord, session : FlatfileSession, logger : any ) {
    const userOrgs : UserOrg[] = JSON.parse( session?.env?.userOrgs as string || '{}' );
    if ( userOrgs ) {
        const subOrgValue = record.get( 'subOrganisation' )
        if ( !subOrgValue ) {
//            record.addWarning( ["subOrganisation"], "Sub-organisation is missing" );
        } else if ( !isSubOrgValid( userOrgs, subOrgValue as string ) ) {
            const message = userOrgs.length > 1 ? `Sub-organisation must be one of [${userOrgs.map( so => so.orgName ).join( ' | ' )}]` : `Sub-organisation must be ${userOrgs[ 0 ].orgName}`
            record.addError( ["subOrganisation"], message );
        }
    } else {
        logger?.error( 'Expected userOrgs variables is not coming through' )
    }
}

export function unitMappings ( unit : string ) {
    let finalUnit = unit;

    // Exclude units where casing matters
    if ( ['Ml', 'Gl', 'Tbs', 'MMBTU'].indexOf( unit ) === -1 ) {
        finalUnit = unit.toLowerCase();
    }

    const mappings : Record<string, string> = {
        gals       : 'gal',
        gallon     : 'gal',
        gallons    : 'gal',
        kgs        : 'kg',
        kilogram   : 'kg',
        kilograms  : 'kg',
        lbs        : 'lb',
        pound      : 'lb',
        pounds     : 'lb',
        tonnes     : 'tonne',
        liter      : 'l',
        liters     : 'l',
        litre      : 'l',
        litres     : 'l',
        kiloliters : 'kL',
        kilolitres : 'kL',
        kilolitre  : 'kL',
        kiloliter  : 'kL',
        megaliters : 'Ml',
        megalitres : 'Ml',
        megalitre  : 'Ml',
        megaliter  : 'Ml',
    };

    if ( mappings[ finalUnit ] !== undefined ) {
        return mappings[ finalUnit ];
    }

    return finalUnit;
};

export function isMassValid ( value : string ) {
    let inputUnitValue = unitMappings( value.trim() )
    if ( supportedMassUnits.includes( inputUnitValue ) || inputUnitValue.toUpperCase() === MMBTU ) {
        return { valid : true, castedValue : inputUnitValue.toUpperCase() === MMBTU ? MMBTU : inputUnitValue }
    } else {
        return { valid : false, castedValue : null }
    }
}

export function isEnergyValid ( value : string ) {
    let inputUnitValue = value?.trim() as string;
    if ( supportedEnergyUnits.indexOf( inputUnitValue ) > -1 ) {
        return { valid : true, castedValue : inputUnitValue }
    } else {
        return { valid : false, castedValue : null }
    }
}