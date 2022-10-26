import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowResourcesResourcesEndingyStrategy implements IRoutable {
    nextButtonText = 'Complete Section'
    hideBackButton = true;
    

    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_RESOURCESENDING;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_REVIEWANDSUBMIT;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_RESOURCESSUMMARY;
    }
}
