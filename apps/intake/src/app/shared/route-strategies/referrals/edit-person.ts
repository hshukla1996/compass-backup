import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ReferralsEditPersonStrategy implements IRoutable {
    get currentRoute(): string {
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_EDITPERSON;
    }

    nextRoute(): string {
        // logic
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_HOUSEHOLDSUMMARY;
    }

    previousRoute(): string {
        // logic
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_HOUSEHOLDSUMMARY;
    }
}