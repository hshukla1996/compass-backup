import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowGettingStartedEndingStrategy implements IRoutable { 
  
    nextButtonText = 'Complete Section'
  
  get currentRoute(): string {
      
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_GETTINGSTARTEDENDING
  }

  nextRoute(): string {
    // Custom logic here
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD;
  }

  previousRoute(): string {
    // Custom logic here
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_FAMILYSAFETY;
 

  }
}
