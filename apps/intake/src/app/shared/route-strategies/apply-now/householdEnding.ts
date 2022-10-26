import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowHouseholdhouseholdEndingStrategy implements IRoutable {
  nextButtonText = 'Complete Section';

  get currentRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDENDING;
  }

  nextRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS;
  }

  previousRoute(): string {
    return (
        RoutePath.APPLYNOW +
        "/" +
        RoutePath.APPLYNOW_HOUSEHOLD +
        "/" +
        RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSUMMARY
    );
  }
}
