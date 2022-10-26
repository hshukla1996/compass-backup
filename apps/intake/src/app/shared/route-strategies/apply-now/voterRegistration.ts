import { Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { RoutePath } from '..';
import { IRoutable } from '../strategy';
@Injectable()
export class ApplyNowRegistrationVoterStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.APPLYNOW_VOTERREGISTRATION;
    }

    nextRoute(): string {
        // Your custom code here
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_DRIVING_LICENSE;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_SOCAIL_SECURITY_NUMBER;
    }
}
