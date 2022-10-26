import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowIndividualDetailsSnapOrTanfBenefitsStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITS;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITSDETAILS;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_DOMESTICVIOLENCE;
    }
}  