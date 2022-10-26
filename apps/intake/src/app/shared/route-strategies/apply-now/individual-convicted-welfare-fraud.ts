import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowIndividualConvictedWelfareFraudStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;

    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_CONVICTEDWELFAREFRAUD;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/';
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/';
    }
}  