import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowExpensesStrategy implements IRoutable {
  get currentRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES;
  }

  nextRoute(): string {
    return (
        RoutePath.APPLYNOW +
        "/" +
        RoutePath.APPLYNOW_EXPENSES +
        "/" +
        RoutePath.APPLYNOW_EXPENSESENROLLMENT
    );
  }

  previousRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INCOME;
  }
}
