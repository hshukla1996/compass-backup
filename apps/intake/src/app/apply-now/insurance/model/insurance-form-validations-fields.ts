import { FormGroup } from "@angular/forms";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";

//Form validation
export const validateInsuranceInformationScreenForm=(benefits:any[],formGroup:FormGroup)=>
{
    let requiredFields = [] as string[];
    const fields = [{
        fieldName: 'familyPanningAfraid',
        optionalProgram: [] as string[],
        requiredProgram: [] as string[]

    }] as FormValidatorField[]
    if (benefits != null && benefits.length > 0) {
        const requiredOrOptionalValidatorField =
            {

                selectedPrograms: benefits,
                requiredFields: [],
                formGroup: formGroup,
                fields: fields
            } as RequiredOrOptionalValidatorField
        Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
        formGroup = requiredOrOptionalValidatorField.formGroup;
        requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
}
return {form:formGroup,requiredFields:requiredFields} as InsuranceForm;
}






interface InsuranceForm{
form:FormGroup,
requiredFields:string[]
}