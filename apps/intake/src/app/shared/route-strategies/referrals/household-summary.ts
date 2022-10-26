import { Injectable } from '@angular/core';
import { RoutePath } from '..';
import { IConditionalRoutable, IRoutable } from '../strategy';
 @Injectable()
export class ReferralsHouseholdSummaryStrategy implements IRoutable {

    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_HOUSEHOLDSUMMARY;
    }

    nextRoute(): string {
        // logic
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_PROGRAMSELECTION;
    }

    previousRoute(): string {
        // logic
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_BASICDETAILS;
    }
}