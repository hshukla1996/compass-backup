import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ReferralsHeadofHouseholdDetailsStrategy implements IRoutable {
  get currentRoute(): string {
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_HEADOFHOUSEHOLDDETAILS;
  }

  nextRoute(): string {
    // logic
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_HOUSEHOLDSUMMARYONE;
  }

  previousRoute(): string {
    // logic
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_GETTINGSTARTED;
  }
}