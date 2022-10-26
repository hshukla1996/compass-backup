import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ReferralsHouseholdSummaryOneStrategy implements IRoutable {
  get currentRoute(): string {
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_HOUSEHOLDSUMMARYONE;
  }

  nextRoute(): string {
    // logic
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_ADDANOTHERPERSON;
  }

  previousRoute(): string {
    // logic
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_HEADOFHOUSEHOLDDETAILS;
  }
}