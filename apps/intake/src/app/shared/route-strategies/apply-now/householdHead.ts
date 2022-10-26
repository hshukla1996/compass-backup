import { RoutePath } from "..";
import { IRoutable } from "../strategy";
import {
    IApplyNowState,
    HouseholdModel,
} from "../../../apply-now/+state/apply-now.models";
import { Injectable } from "@angular/core";
@Injectable()
export class ApplyNowHouseholdHeadStrategy implements IRoutable {
    //applyNowState!: ApplyNowState | null;
    //household: HouseholdModel | null;

    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDHEAD
        );
    }

    nextRoute(): string {
        //if (this.household?.validState)
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSUMMARY
        );
        //else return this.currentRoute;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD;
    }
}
