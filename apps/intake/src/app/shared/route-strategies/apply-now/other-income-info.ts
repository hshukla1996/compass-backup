import { RoutePath } from '..';
import { IRoutable } from '../strategy';


export class ApplyNowOtherIncomeInfoStrategy implements IRoutable {
    
    hideBackButton = true;
    hideNextButton = true;

    get currentRoute(): string {
        return (
            RoutePath.APPLYNOW
            + "/" + RoutePath.APPLYNOW_INCOME
            + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOME
        );
    }

    nextRoute(): string {
        return (
            RoutePath.APPLYNOW
            + "/" + RoutePath.APPLYNOW_INCOME
            + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOME
            + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOMEDETAILS
        );
    }

    previousRoute(): string {
        return (
            RoutePath.APPLYNOW
            + "/" + RoutePath.APPLYNOW_INCOME
            + "/" + RoutePath.APPLYNOW_INCOME_PASTJOB
        );
    }
}
