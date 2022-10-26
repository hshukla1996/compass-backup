import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyCommunityOrganizationStrategy implements IRoutable { 
   
  
  get currentRoute(): string {
      
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_COMMUNITYORGANIZATION;
  }

  nextRoute(): string {
    // Custom logic here
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_PREPOPULATEAPPLICATION;
  }

  previousRoute(): string {
    // Custom logic here
    return  RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_PROVIDERINFORMATION;
 

  }
}
