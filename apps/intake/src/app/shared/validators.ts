import { AbstractControl, FormArray, FormGroup, ValidatorFn } from '@angular/forms';

export function requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
    return function validate(control: AbstractControl) 
    {

        let checked = 0;
        const formArray=control as any;
        formArray["controls"].forEach((element:any)=> {
            if(element){
                checked++;
            }
        });
      
        if (checked < minRequired) {
            return {
                requireOneCheckboxToBeChecked: true,
            };
        }
      

        return null;
    };
}
