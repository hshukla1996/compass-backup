import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowResourcesDividerStrategy implements IRoutable {
  
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' ;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_RESOURCESGATEPOST;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES;
    }
}
