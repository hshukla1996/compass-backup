import { RoutePath } from "..";
import { IRoutable } from "../strategy";

export class ApplyNowExpensesSummaryStrategy
    implements IRoutable
{
    get currentRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_EXPENSES +
            "/" +
            RoutePath.APPLYNOW_EXPENSESSUMMARY
        );
    }

    nextRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_EXPENSES +
            "/" +
            RoutePath.APPLYNOW_EXPENSESLEGALFEE
        );
    }

    previousRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_EXPENSES +
            "/" +
            RoutePath.APPLYNOW_EXPENSESHOUSEHOLDPROPERTYINSURANCE
        );
    }
}
