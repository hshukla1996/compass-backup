import { RoutePath } from '..';
import { IRoutable } from '../strategy';
import {
    IApplyNowState,
    HouseholdModel,
} from "../../../apply-now/+state/apply-now.models";
import { Injectable } from "@angular/core";

export class ApplyNowHouseholdWaterQuesStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    
    get currentRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDWATERQUES
        );
    }

    nextRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDGATEPOST
        );
    }

    previousRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            // RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLD
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSITUATION 
          
        );
    }
}
