import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowHouseholdLongtermlivingStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLONGTERMLIVINGSERVICES;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDELECTRICPROVIDER;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSCHOOLMEALS;
    }
}
