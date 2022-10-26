import { Injectable } from '@angular/core';
import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowInsuranceEndingStrategy implements IRoutable {
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_INSURANCEENDING;
    }

    nextRoute(): string {
        //return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_TYPEOFPOLICY;
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_POLICYINFORMATION;
    }
}