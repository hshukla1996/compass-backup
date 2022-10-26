import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowInsuranceEmployerContactInfoStrategy implements IRoutable {

    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_EMPLOYERCONTCT_INFO
    }

    nextRoute(): string {
        //return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_TYPEOFPOLICY;
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_TYPE_OF_COVERAGE
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_POLICYINFORMATION;
    }
}