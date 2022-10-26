import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowHouseholdMwmberSummaryStrategy implements IRoutable {
  get currentRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSUMMARY;
  }

  nextRoute(): string {
    return (
        RoutePath.APPLYNOW +
        "/" +
        RoutePath.APPLYNOW_HOUSEHOLD +
        "/" +
        RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDHEADSELECTION
    );
  }

  previousRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDHEAD;
  }
}
