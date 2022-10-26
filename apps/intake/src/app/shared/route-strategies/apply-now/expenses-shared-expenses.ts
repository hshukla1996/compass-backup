import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowSharedExpensesStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_EXPENSES_SHAREDEXPENSES;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_EXPENSES_SHAREDEXPENSESSUMMARY;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_EXPENSES_PROPERTYINSURANCEDETAILS;
    }
}
