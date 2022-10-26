import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowHouseholdhouseholdFineStrategy implements IRoutable {
  get currentRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDFINE;
  }

  nextRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDFRAUD;
  }

  previousRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCRIMEHISTORY;
  }
}
