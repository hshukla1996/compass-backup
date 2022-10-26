import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowExpensesPropertyInsuranceDetailsStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_EXPENSES_PROPERTYINSURANCEDETAILS;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_EXPENSES_SHAREDEXPENSES;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_EXPENSES_PROPERTYTAXDETAILS;
    }
}
