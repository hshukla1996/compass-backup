import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowExpensesWasteWaterAddressStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES + '/' + RoutePath.APPLYNOW_EXPENSESWASTEWATERADDRESS;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES + '/' + RoutePath.APPLYNOW_EXPENSESWATERGATEPOST;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES + '/' + RoutePath.APPLYNOW_EXPENSESWASTEWATERPROVIDER;
    }
}
