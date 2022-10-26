import { Injectable } from '@angular/core';
import { RoutePath } from '..';
import { IRoutable } from '../strategy';

@Injectable()
export class ApplyNowInsurancePolicyInformationStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_POLICYINFORMATION;
    }

    nextRoute(): string {
       // return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_POLICYINFORMATIONOTHERHMO;
        
        //return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_INSURANCEENDING;
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_WHAT_IS_COVERED;

    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_WHOISCOVERED;
    }
}