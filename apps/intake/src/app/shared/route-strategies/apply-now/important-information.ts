import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowImportantInformationStrategy implements IRoutable {  
  get currentRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_IMPORTANTINFORMATION;
  }

  nextRoute(): string {
    // Custom logic here
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_GATEPOST;
  }

  previousRoute(): string {
    // Custom logic here
    return RoutePath.APPLYNOW + '/' +  RoutePath.APPLYNOW_GETTINGSTARTED;
  }
}
