import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowReviewAndSubmitRsadbAddBenefitsStrategy implements IRoutable {
  get currentRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_REVIEWANDSUBMIT + '/' + RoutePath.APPLYNOW_REVIEWANDSUBMIT_RSADBADDBENEFITS;
  }

  nextRoute(): string {
    return RoutePath.HOME;
  }

  previousRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_REVIEWANDSUBMIT;
  }
}
