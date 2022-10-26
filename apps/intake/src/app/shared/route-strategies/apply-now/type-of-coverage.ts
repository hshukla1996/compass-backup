import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowInsuranceTypeOfCoverageStrategy implements IRoutable {

    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_TYPE_OF_COVERAGE
    }

    nextRoute(): string {
        //return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_TYPEOFPOLICY;
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_EMPLOYERCONTCT_INFO;
    }
}