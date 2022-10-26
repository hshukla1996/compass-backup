import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ReferralsReceiptStrategy implements IRoutable {
  hideBackButton= true;
  hideNextButton = true;
  nextButtonText = 'Go Back to COMPASS Home';
  get currentRoute(): string {
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_RECEIPT;
  }

  nextRoute(): string {
    // logic
    return RoutePath.HOME;
  }

  previousRoute(): string {
    // logic
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_SUMMARY;
  }
}
