import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowSocalSecurityNumberStrategy implements IRoutable {
    hideBackButton = true;
    hideNextButton = true;
    get currentRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
            "/" +
            RoutePath.APPLYNOW_SOCAIL_SECURITY_NUMBER
        );
    }

    nextRoute(): string {
        // Your custom code here
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
            "/" +
            RoutePath.APPLYNOW_DRIVING_LICENSE
        );
    }

    previousRoute(): string {
        return (
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
            "/" +
            RoutePath.APPLYNOW_RACE
        );
    }
}
