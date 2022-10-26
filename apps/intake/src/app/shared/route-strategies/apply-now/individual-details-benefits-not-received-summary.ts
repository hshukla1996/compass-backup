import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowIndividualDetailsBenefitsNotReceivedDSummaryStrategy implements IRoutable {
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVEDSUMMARY;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSCREEN;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVEDDETAILS;
    }
}  