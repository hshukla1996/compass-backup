import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowExpensesWasteWaterProviderStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES + '/' + RoutePath.APPLYNOW_EXPENSESWASTEWATERPROVIDER;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES + '/' + RoutePath.APPLYNOW_EXPENSESWASTEWATERADDRESS;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES + '/' + RoutePath.APPLYNOW_EXPENSESDRINKINGWATERCOMPANYMAILING;
    }
}
