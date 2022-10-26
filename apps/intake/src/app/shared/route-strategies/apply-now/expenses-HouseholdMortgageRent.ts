import { RoutePath } from "..";
import { IRoutable } from "../strategy";

export class ApplyNowExpensesHouseholdMortgatgeRentStrategy implements IRoutable {
    get currentRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_EXPENSES +
            "/" +
            RoutePath.APPLYNOW_EXPENSESHOUSEHOLDMORTGAGERENT
        );
    }

    nextRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_EXPENSES +
            "/" +
            RoutePath.APPLYNOW_EXPENSESHOUSEHOLDPROPERTYINSURANCE
        );
    }

    previousRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_EXPENSES +
            "/" +
            RoutePath.APPLYNOW_EXPENSESUTILITYGATEPOST
        );
    }
}
