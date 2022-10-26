import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowResourcesBurialSpacesSummaryStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_BURIALSPACESSUMMARY;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENT;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_BURIALSPACEDETAILS;
    }
}
