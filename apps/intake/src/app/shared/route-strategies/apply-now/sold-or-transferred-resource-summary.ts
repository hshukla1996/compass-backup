import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowResourcesSoldOrTransferredResourceSummaryStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_SOLDORTRANSFERREDRESOURCESUMMARY;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_CLOSEDOREMPTIEDACCOUNTDETAILS;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_SOLDORTRANSFERREDRESOURCEDETAILS;
    }
}
