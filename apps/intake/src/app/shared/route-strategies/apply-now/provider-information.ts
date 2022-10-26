import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyProviderInformationStrategy implements IRoutable { 
   
  
  get currentRoute(): string {
      
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_PROVIDERINFORMATION;
  }

  nextRoute(): string {

    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_COMMUNITYPARTNERPASSWORD;
  }

  previousRoute(): string {
    // Custom logic here
    return  RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED_EXISTINGACCOUNT;
 

  }
}
