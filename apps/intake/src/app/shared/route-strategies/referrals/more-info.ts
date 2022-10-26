import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ReferralsMoreInfoStrategy implements IRoutable {
  hideBackButton=true;
  hideNextButton= true;
  get currentRoute(): string {
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_MOREINFORMATION;
  }

  nextRoute(): string {
    // logic
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_CONTACTINFORMATION;
  }

  previousRoute(): string {
    // logic
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_HOUSEHOLDDETAILS;
  }
}
