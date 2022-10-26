import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowHouseholdhouseholdAppliedBeforeStrategy implements IRoutable {
  hideBackButton = true;
  hideNextButton = true;
  get currentRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDAPPLIEDBEFORE;
  }

  nextRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCOUNTRYRECORDNO;
  }

  previousRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDGATEPOST;
  }
}
