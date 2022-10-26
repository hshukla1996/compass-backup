import { createAction, props } from "@ngrx/store";
import { IApplyNowState } from "../../+state/apply-now.models";
import { InsuranceState } from "./insurance.model";

export const storeInsurance = createAction(
    '[Apply Now] Store Insurance',
    props<{ insurance: InsuranceState }>()
);
export const storeInsuranceFn=(state:any, action:any): IApplyNowState => {
    return {
        ...state,
        insurance: action.insurance
    }
}
