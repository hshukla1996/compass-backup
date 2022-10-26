import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowExpensesWaterAsstAppStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES + '/' + RoutePath.APPLYNOW_EXPENSESWATERASSISTANCEAPPLICATION;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES + '/' + RoutePath.APPLYNOW_EXPENSESDRINKINGWATERCOMPANYMAILING;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES + '/' + RoutePath.APPLYNOW_EXPENSESMAILINGADDRESS;
    }
}
