import {
    makeField,
    Message,
    OptionField,
    TextField
} from '@flatfile/configure';
import {
    arrayToObject,
    getCategoryScope,
    getScopeCategories,
    isCountryValid,
    isCurrencyValid,
    isDatePeriodValid,
    isEmissionCategoryValid,
    isMassValid,
    normaliseAmount,
    toTitleCase,
    validateDate
} from './utils';
import {
    countries,
    supportedCurrencies,
    supportedDatePeriods,
    supportedMassUnits
} from './constants';
import { EmissionScope } from './types';
type Value = string|null
function trimValue(caster:(value:Value)=>Value){
    return (value:Value)=>{
        return caster(value?.trim()||value);
    }
}
function addWarningIfEmpty(validator:(value:Value)=>undefined|Message[]){
    return (value:Value)=>{
        if(value===null || value?.trim()===''||value===undefined){
            return [new Message('Cell is empty','warn','validate')]
        }
        return validator(value)
    }
}


export const AvTextField = ( props:{required?:boolean,label?:string}={})=>makeField(TextField(),{
    cast:trimValue((value)=>value),
...(props.required?{}:{validate:addWarningIfEmpty(()=>undefined)})
})( props)


export const AvDateField = makeField(TextField({}),{
    cast:trimValue((value:string|null)=>{
        if(!value) return value;
        const casted = validateDate(value)
        if(!casted.error && casted.value){
            return casted.value
        }
        return value;
    }),
    validate: (value: string) => {
        const validated = validateDate(value)
        if (validated.error) {
            return validated.error;
        }
    },
})
//export const AvCurrencyField = makeField(OptionField({options:arrayToObject(supportedCurrencies)}),{
export const AvCurrencyField = makeField(TextField({}),{
    cast:trimValue((value:Value)=>{
        if(!value) return value;
        const valid = isCurrencyValid(value);
        return valid?value.toUpperCase():value;
    }),
    validate: (value: string) => {
        const valid = isCurrencyValid(value);
        if(!valid)return [new Message(`Currency must be one of [${supportedCurrencies.join( ' / ', )}]`,'error','validate')]
    },
})

export const AvMassField = makeField(TextField({}),{
    cast:trimValue((value:Value)=>{
        if(!value) return value;
        const { valid,castedValue } = isMassValid(value);
        return valid?castedValue:value;
    }),
    validate: (value: string) => {
        const { valid } = isMassValid(value);
        if(!valid)return [new Message(`Supported units are: ${supportedMassUnits.join( ' / ' )}`,'error','validate')]
    },
})



export const AvAmountField = makeField(TextField({}),{
    cast:trimValue((value:Value)=>{
        if(!value) return value;
        return normaliseAmount(value)
    }),
})



//export const AvCountryField = makeField(OptionField({options:arrayToObject(countries,toTitleCase)}),{
export const AvCountryField = ({countries,errorMessage}:{countries:string[],errorMessage:string})=>makeField(TextField(),{
    cast:trimValue((value:string|null)=>{
        if(!value) return value;
        const valid = isCountryValid(value,countries);
        return valid?value.toLowerCase():value;
    }),
    validate: addWarningIfEmpty((value: string|null) => {
        if(!value) return ;
        const valid = isCountryValid(value,countries);
        if(!valid)return [new Message(errorMessage,'error','validate')]
    }),
})

export const AvEmissionCategoryTextField = (scope:EmissionScope)=>makeField(TextField({}),{
    cast:trimValue((value:string|null)=>{
        if(!value) return value;
        const valid = isEmissionCategoryValid(value,scope);
        return valid?value.toLowerCase():value;
    }),
    validate: addWarningIfEmpty((value: Value) => {
        if(!value) return
        if(!isEmissionCategoryValid(value, scope)) {
            const categoryScope = getCategoryScope(value);
            const scopeCategories = getScopeCategories(scope);
            const categoryIdentStr = categoryScope ? ` - ${value} is a scope ${categoryScope} category - ` : '';

            return [ new Message( `Invalid category ${categoryIdentStr}. If scope is ${scope}, this value must be one of: [ ${scopeCategories.join(
                ' / ',
            )}]`, 'error', 'validate' ) ]

        }
    }),
})

export const AvDatePeriodField = makeField(TextField({}),{
    cast:trimValue((value:Value)=>{
        if(!value) return value;
        const valid = isDatePeriodValid(value);
        return valid?value.toLowerCase():value;
    }),
    validate: addWarningIfEmpty((value: Value) => {
        if(!value) return ;
        const valid = isDatePeriodValid(value);
        if(!valid)return [new Message(`Date period must be one of [${supportedDatePeriods.join(" / ")}]`,'error','validate')]
    }),
})

