import { RoutePath } from '.';
import { IRoutable } from './strategy';

export class LoginStrategy implements IRoutable {
    get currentRoute(): string {
        return RoutePath.LOGIN;
    }

    nextRoute(): string {
        return RoutePath.LOGIN;
    }

    previousRoute(): string {
        return RoutePath.LOGIN;
    }
}
