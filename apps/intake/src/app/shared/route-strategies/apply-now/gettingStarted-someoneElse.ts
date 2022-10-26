import { RoutePath } from "..";
import { IRoutable } from "../strategy";

export class ApplyNowGettingStartedSomeoneElse implements IRoutable {
    get currentRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_GETTINGSTARTED_SOMEONEELSE
        );
    }

    nextRoute(): string {
        // Custom logic here
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_GETTINGSTARTED_EXISTINGACCOUNT
        );
    }

    previousRoute(): string {
        // Custom logic here
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_GETTINGSTARTED_GATEPOST
        );
    }
}
