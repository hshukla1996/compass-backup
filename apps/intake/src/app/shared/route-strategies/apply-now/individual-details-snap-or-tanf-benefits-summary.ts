import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowIndividualDetailsSnapOrTanfBenefitsSummaryStrategy implements IRoutable {
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITSSUMMARY;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGSERVICES;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SNAPORTANFBENEFITSDETAILS;
    }
}  