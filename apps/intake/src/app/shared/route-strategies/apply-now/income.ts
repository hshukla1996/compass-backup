import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowIncomeStrategy implements IRoutable {
  get currentRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INCOME;
  }

  nextRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES;
  }

  previousRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS;
  }
}
