import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowReviewAndSubmitStrategy implements IRoutable {
  get currentRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_REVIEWANDSUBMIT;
  }

  nextRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_REVIEWANDSUBMIT + '/' + RoutePath.APPLYNOW_REVIEWANDSUBMIT_RSADBADDBENEFITS;
  }

  previousRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES;
  }
}
