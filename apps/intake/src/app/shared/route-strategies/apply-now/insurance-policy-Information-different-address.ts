import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowInsurancePolicyInformationDifferentAddressStrategy implements IRoutable {
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_POLICYINFORMATIONDIFFERENTADDRESS;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_INSURANCEENDING;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_POLICYINFORMATIONOTHERHMO;
    }
}