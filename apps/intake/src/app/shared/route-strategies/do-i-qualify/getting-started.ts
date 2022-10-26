import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class DoIQualifyGettingStartedStrategy implements IRoutable {
  hideBackButton = false;
  nextButtonText="Get started"
  get currentRoute(): string {
    return RoutePath.DOIQUALIFY;
  }

  nextRoute(): string {
    // logic
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_BASICDETAILS;
  }

  previousRoute(): string {
    // logic
    return RoutePath.HOME;
  }
}
