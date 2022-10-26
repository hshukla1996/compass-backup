import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowExpensesPropertyTaxDetailsStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_EXPENSES+ "/" + RoutePath.APPLYNOW_EXPENSES_PROPERTYTAXDETAILS;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_EXPENSES_PROPERTYINSURANCEDETAILS;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDWHOAPPLYLTC;
    }
}
