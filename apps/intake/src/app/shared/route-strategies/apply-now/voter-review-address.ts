import { RoutePath } from '..';
import { IRoutable } from '../strategy';
import {
    IApplyNowState,
    HouseholdModel,
} from "../../../apply-now/+state/apply-now.models";
import { Injectable } from "@angular/core";

export class ApplyNowVoterReviewAddressStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return (
            RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_VALIDATEADDRESS
        );
    }

    nextRoute(): string {
        return (
            RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_SELECTIDENTITYVERIFYMETHOD 
        );
    }

    previousRoute(): string {
        return (
            RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_RESIDENTIALADDRESS

        );
    }
}
