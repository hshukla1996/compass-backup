import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowIndividualDetailsIndividualsendingStrategy implements IRoutable {
    nextButtonText = 'Complete Section';

    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSENDING;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' ;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSSUMMARY;
    }
}  