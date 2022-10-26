import { RoutePath } from '.';
import { IRoutable } from './strategy';

export class StyleGuideStrategy implements IRoutable {
    get currentRoute(): string {
        return RoutePath.STYLEGUIDE;
    }

    nextRoute(): string {
        return RoutePath.STYLEGUIDE;
    }

    previousRoute(): string {
        return RoutePath.STYLEGUIDE;
    }
}
