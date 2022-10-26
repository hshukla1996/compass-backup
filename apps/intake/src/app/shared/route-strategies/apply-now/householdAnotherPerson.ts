import { RoutePath } from "..";
import { IRoutable } from "../strategy";
import {
    IApplyNowState,
    HouseholdModel,
} from "../../../apply-now/+state/apply-now.models";
import { Injectable } from "@angular/core";
@Injectable()
export class ApplyNowHouseholdAnotherPersonStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDANOTHERPERSON
        );
    }

    nextRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSUMMARY
        );
    }

    previousRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSUMMARY
        );
    }
}
