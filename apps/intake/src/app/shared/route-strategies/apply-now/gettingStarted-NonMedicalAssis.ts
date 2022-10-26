import { Injectable } from "@angular/core";
import { RoutePath } from "..";
import { IRoutable } from "../strategy";
@Injectable()

export class ApplyNowGettingStartedNonMedicalAssis implements IRoutable {
    get currentRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_GETTINGSTARTED_NONMEDICALASSIS
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
