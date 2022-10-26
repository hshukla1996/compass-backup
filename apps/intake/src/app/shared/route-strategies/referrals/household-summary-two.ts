import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ReferralsHouseholdSummaryTwoStrategy implements IRoutable {
  get currentRoute(): string {
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_HOUSEHOLDSUMMARYTWO;
  }

  nextRoute(): string {
    // logic
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_REFERRALSERVICESGATEPOST;
  }

  previousRoute(): string {
    // logic
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_ADDANOTHERPERSON;
  }
}