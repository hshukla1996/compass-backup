import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowExpensesSharedExpSummaryStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_EXPENSES_SHAREDEXPENSESSUMMARY;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_EXPENSES_EXPENSESSUMMARY;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_EXPENSES + "/" + RoutePath.APPLYNOW_EXPENSES_SHAREDEXPENSES;
    }
}
