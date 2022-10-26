import { RoutePath } from '..';
import { IRoutable } from '../strategy';


export class ApplyNowOtherIncomeDetailsStrategy implements IRoutable {

    hideBackButton = true;
    hideNextButton = true;

    get currentRoute(): string {
        return (
            RoutePath.APPLYNOW
            + "/" + RoutePath.APPLYNOW_INCOME
            + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOME
            + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOMEDETAILS
        );
    }

    nextRoute(): string {
        return (
            RoutePath.APPLYNOW
            + "/" + RoutePath.APPLYNOW_INCOME
            + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOME
            + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOME_ADDRESS
        );
    }

    previousRoute(): string {
        return (
            RoutePath.APPLYNOW
            + "/" + RoutePath.APPLYNOW_INCOME
            + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOME
        );
    }
}
