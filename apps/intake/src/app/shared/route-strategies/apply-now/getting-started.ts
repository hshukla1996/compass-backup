import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowGettingStartedStrategy implements IRoutable { 
  hideBackButton = false;
  nextButtonText = 'Begin';
  
  get currentRoute(): string {
    return RoutePath.APPLYNOW+'/'+RoutePath.APPLYNOW_GETTINGSTARTED;
  }

  nextRoute(): string {
    // Custom logic here
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_IMPORTANTINFORMATION;
  }

  previousRoute(): string {
    // Custom logic here
    return RoutePath.HOME;
  }
}
