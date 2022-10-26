import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowIncomeGatepostStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;

    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INCOME + '/' + RoutePath.APPLYNOW_INCOME_INCOMEGATEPOST;
    }

     nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INCOME + '/' + RoutePath.APPLYNOW_INCOME_OTHERINCOME;
    } 
 
    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INCOME;
    }
}
