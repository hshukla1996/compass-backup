import { RoutePath } from '..';
import { Individuals, IReferralsState } from '../../../referrals/+state/referrals.models';
import { IRoutable } from '../strategy';

export class ReferralsIntellectualDisabilityServicesStrategy implements IRoutable {
    // individualState!: Individuals | null;

    // setDataContext(state: IReferralsState): void {
    //     this.individualState = state.individual;
    //     // console.log('Got state data for DoIQualifyBasicDetailsStrategy');
    // }
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_INTELLECTUAL_DISABILITY_SERVICES;
    }

    nextRoute(): string {
        // if (this.individualState?.validState)
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_AUTISM_SERVICES;
        //  else return this.currentRoute;
        // logic
    }

    previousRoute(): string {
        // logic
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_HOUSEHOLDDETAILS;
    }
}
