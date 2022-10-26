import { RoutePath } from '..';
import { IRoutable } from '../strategy';
import {
    IApplyNowState,
    HouseholdModel,
} from "../../../apply-now/+state/apply-now.models";
import { Injectable } from "@angular/core";

export class ApplyNowHouseholdSituationStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSITUATION
        );
    }

    nextRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            //RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDWATERQUES
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDELECTRICPROVIDER
            //RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLD_MEMBER_SITUATION_GATEPOST
        );
    }

    previousRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCONTACTINFO
        );
    }
}
