import { Injectable } from '@angular/core';
import { RoutePath } from '..';
import { IRoutable } from '../strategy';
@Injectable()
export class ApplyNowInsuranceWhoInsuranceFromJobStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_WHO_INSURANCE_FROM_JOB;
    }
    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_ENTRY_TWO_WHOISCOVERED;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_HEALTH_OR_MEDICAL_SUMMARY;
    }
}