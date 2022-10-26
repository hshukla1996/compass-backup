import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class LinkCaseSelectionStrategy implements IRoutable {
    get currentRoute(): string {
        return RoutePath.LINK_CASE_SELECTION;
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