import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowExpensesDrinkWaterCompMailStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES + '/' + RoutePath.APPLYNOW_EXPENSESDRINKINGWATERCOMPANYMAILING;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES + '/' + RoutePath.APPLYNOW_EXPENSESWASTEWATERPROVIDER;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES + '/' + RoutePath.APPLYNOW_EXPENSESWATERASSISTANCEAPPLICATION;
    }
}
