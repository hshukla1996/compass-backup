import { RoutePath } from '..';
import { IConditionalRoutable, IRoutable } from '../strategy';

export class ReferralsProgramSelectionStrategy implements IRoutable {

    hideBackButton=true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_PROGRAMSELECTION;
    }

    nextRoute(): string {
        // logic
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_HOUSEHOLDDETAILS;
    }

    previousRoute(): string {
        // logic
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_ADDANOTHERPERSON;
    }
}