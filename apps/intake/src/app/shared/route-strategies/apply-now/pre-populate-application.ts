import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowPrePopulateApplicationStrategy implements IRoutable { 
   
  
  get currentRoute(): string {
      
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_PREPOPULATEAPPLICATION;
  }

  nextRoute(): string {
    // Custom logic here
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_FAMILYSAFETY;
  }

  previousRoute(): string {
    // Custom logic here
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_COMMUNITYPARTNERPASSWORD;
 

  }
}
