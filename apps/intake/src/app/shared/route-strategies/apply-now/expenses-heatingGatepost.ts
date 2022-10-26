import { RoutePath } from "..";
import { IRoutable } from "../strategy";

export class ApplyNowExpensesHeatingGatepostStrategy implements IRoutable {
    get currentRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_EXPENSES +
            "/" +
            RoutePath.APPLYNOW_EXPENSESHEATINGGATEPOST
        );
    }

    nextRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_EXPENSES +
            "/" +
            RoutePath.APPLYNOW_EXPENSESMAILINGADDRESS
        );
    }

    previousRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_EXPENSES +
            "/" +
            RoutePath.APPLYNOW_EXPENSESHEATINGASSISTANCE
        );
    }
}
