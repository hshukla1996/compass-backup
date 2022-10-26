import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowResourcesGatepostStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
      
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_RESOURCESGATEPOST;
    }

    nextRoute(): string {
        // return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_BURIALSPACEDETAILS;
      
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_FINANCIALHOLDINGS;
    }

    previousRoute(): string {
        // back goto Resources Divider
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES;
    }
}
