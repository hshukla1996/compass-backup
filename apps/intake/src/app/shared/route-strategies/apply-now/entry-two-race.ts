import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowEntryTwoRaceStrategy implements IRoutable {
  get currentRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_ENTRY_TWO_RACE;
  }

  nextRoute(): string {
    // Your custom code here
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_ENTRY_TWO_SOCAIL_SECURITY_NUMBER;
  }

  previousRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_ENTRY_TWO_GENERAL_DETAILS;
  }
}
