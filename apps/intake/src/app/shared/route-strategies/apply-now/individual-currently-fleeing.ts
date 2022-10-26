import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowIndividualCurrentlyFleeingStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;

    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_CURRENTLYFLEEING;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/';
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/';
    }
}  