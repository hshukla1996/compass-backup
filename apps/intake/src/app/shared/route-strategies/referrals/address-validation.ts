import { Injectable } from '@angular/core';
import { RoutePath } from '..';
import { IRoutable } from '../strategy';
@Injectable()
export class ReferrralsAddressValidationStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_ADDRESSVALIDATION;
    }

    nextRoute(): string {
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_SUMMARY;
    }

    previousRoute(): string {
        // logic
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_CONTACTINFORMATION;
    }
}
