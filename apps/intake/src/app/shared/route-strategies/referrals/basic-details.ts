import { RoutePath } from '..';
import { IRoutable } from '../strategy';
import { Injectable } from "@angular/core";
@Injectable()
export class ReferralsBasicDetailsStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;

    get currentRoute(): string {
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_BASICDETAILS;
    }

    nextRoute(): string {
        // logic
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_HOUSEHOLDSUMMARY;
    }

    previousRoute(): string {
        // logic
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_GETTINGSTARTED;
    }
}
