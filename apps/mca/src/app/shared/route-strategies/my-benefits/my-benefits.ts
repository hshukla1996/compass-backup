import { RoutePath } from '..'; 
import { IRoutable } from '../strategy';

export class MyBenefitsStrategy implements IRoutable {
    get currentRoute(): string {
        return RoutePath.MYBENEFIT;
    }

    nextRoute(): string {
        // logic
        return RoutePath.MYBENEFIT ;
    }

    previousRoute(): string {
        // logic
        return RoutePath.MYBENEFIT;
    }
}