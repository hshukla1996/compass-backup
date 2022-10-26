import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ReferralsSummaryStrategy implements IRoutable {
  nextButtonText= 'SUBMIT'
  hideBackButton=true;
  hideNextButton = true;
  get currentRoute(): string {
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_SUMMARY;
  }

  nextRoute(): string {
    // logic
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_RECEIPT;
  }

  previousRoute(): string {
    // logic
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_CONTACTINFORMATION;
  }
}

