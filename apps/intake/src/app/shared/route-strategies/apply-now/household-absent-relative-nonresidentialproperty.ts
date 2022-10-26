import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowHouseholdAbsentRelativeNonresidentialpropertyStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVENONRESIDENTIALPROPERTY;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVECHILDSUPPORT;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEEMPLOYERDETAILS;
    }
}
