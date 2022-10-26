import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ReferralsReferralServicesGatepostStrategy implements IRoutable {
  get currentRoute(): string {
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_REFERRALSERVICESGATEPOST;
  }

  nextRoute(): string {
    // logic
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_HOUSEHOLDDETAILS;
  }

  previousRoute(): string {
    // logic
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_HOUSEHOLDSUMMARYTWO;
  }
}