import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowResidentialPropertyDetailsCalloutStrategy implements IRoutable {

    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTYDETAILSCALLOUT;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTYSUMMARY;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTYDETAILS;
    }
}
