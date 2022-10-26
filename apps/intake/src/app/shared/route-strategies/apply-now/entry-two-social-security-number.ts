import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowEntryTwoSocalSecurityNumberStrategy implements IRoutable {
  get currentRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_ENTRY_TWO_SOCAIL_SECURITY_NUMBER;
  }

  nextRoute(): string {
    // Your custom code here
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INCOME;
  }

  previousRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_ENTRY_TWO_RACE;
  }
}
