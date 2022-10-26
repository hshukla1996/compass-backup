import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class LinkingTermsConditionsStrategy implements IRoutable {
    get currentRoute(): string {
        return RoutePath.LINKING_TERMS_CONDITIONS;
    }

    nextRoute(): string {
        // logic
        return RoutePath.MYBENEFIT;
    }

    previousRoute(): string {
        // logic
        return RoutePath.MYBENEFIT;
    }
}