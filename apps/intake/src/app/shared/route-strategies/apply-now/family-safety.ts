import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowFamilySafetyStrategy implements IRoutable { 
   
  
  get currentRoute(): string {
      
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_FAMILYSAFETY;
  }

  nextRoute(): string {
    // Custom logic here
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_GETTINGSTARTEDENDING;
  }

  previousRoute(): string {
    // Custom logic here
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_EXISTINGACCOUNT;
 

  }
}
