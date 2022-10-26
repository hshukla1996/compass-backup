import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class DashboardStrategy implements IRoutable {
    get currentRoute(): string {
        return RoutePath.DASHBOARD;
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