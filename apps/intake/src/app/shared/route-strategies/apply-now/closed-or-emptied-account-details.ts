import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowResourcesClosedOrEmptiedAccountDetailsStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_CLOSEDOREMPTIEDACCOUNTDETAILS;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_CLOSEDOREMPTIEDACCOUNT;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_CLOSEDOREMPTIEDACCOUNT;
    }
}
