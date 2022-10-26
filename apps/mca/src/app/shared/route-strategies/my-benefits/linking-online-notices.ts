import { Injectable } from '@angular/core';
import { RoutePath } from '..';
import { IRoutable } from '../strategy';
@Injectable()

export class LinkingOnlineNoticesStrategy implements IRoutable {
    get currentRoute(): string {
        return RoutePath.LINKING_ONLINE_SELECTION;
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