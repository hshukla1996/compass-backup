import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowIndividualDetailsCurrentSnapOrTanfBenefitsStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_CURRENTSNAPORTANFBENEFITS;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITS;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_DOMESTICVIOLENCE;
    }
}  