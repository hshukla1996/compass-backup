import { Injectable, Injector } from '@angular/core';
import { RoutePath } from '..';
import { Individuals, IReferralsState } from '../../../referrals/+state/referrals.models';
import { IRoutable } from '../strategy';
@Injectable()
export class ReferralsHouseholdDetailsStrategy implements IRoutable {
hideBackButton= true;
hideNextButton= true;
    
    get currentRoute(): string {
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_HOUSEHOLDDETAILS;
    }

    nextRoute(): string {
        // if (this.individualState?.validState)
 
            return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_INTELLECTUAL_DISABILITY_SERVICES;
        //  else return this.currentRoute;
        // logic
    }

    previousRoute(): string {
        // logic
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_PROGRAMSELECTION;
    }
}
