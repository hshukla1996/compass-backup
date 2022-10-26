import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowInsurancePolicyInformationOtherHmoStrategy implements IRoutable {
    get currentRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_POLICYINFORMATIONOTHERHMO;
    }

    nextRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_POLICYINFORMATIONDIFFERENTADDRESS;
    }

    previousRoute(): string {
        return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INSURANCE + '/' + RoutePath.APPLYNOW_INSURANCE_POLICYINFORMATION;
    }
}