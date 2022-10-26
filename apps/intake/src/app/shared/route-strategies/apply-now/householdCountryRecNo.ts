import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowHouseholdhouseholdCountryRecNoStrategy implements IRoutable {
  hideBackButton = true;
  hideNextButton = true;
  get currentRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCOUNTRYRECORDNO;
  }

  nextRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDFOODSTAMPS;
  }

  previousRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDAPPLIEDBEFORE;
  }
}
