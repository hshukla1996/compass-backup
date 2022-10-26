import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowEntryTwoGeneralDetailsStrategy implements IRoutable {
hideBackButton = true;
hideNextButton = true;
  get currentRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_ENTRY_TWO_GENERAL_DETAILS;
  }

  nextRoute(): string {
    // Your custom code here
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_ENTRY_TWO_RACE;
  }

  previousRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_DRIVING_LICENSE;
  }
}
