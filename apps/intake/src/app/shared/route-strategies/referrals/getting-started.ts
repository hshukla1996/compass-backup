import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ReferrralsGettingStartedStrategy implements IRoutable {
  hideBackButton = true;
  hideNextButton = true;
  //nextButtonText = "Get started"
  
  get currentRoute(): string {
    return RoutePath.REFERRALS;
  }

  nextRoute(): string {
    // logic
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_BASICDETAILS;
  }

  previousRoute(): string {
    // logic
    return '/';
  }
}
