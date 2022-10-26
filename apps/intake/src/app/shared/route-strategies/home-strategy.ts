import { RoutePath } from '.';
import { IRoutable } from './strategy';

export class HomeStrategy implements IRoutable {
  get currentRoute(): string {
    return RoutePath.HOME;
  }

  nextRoute(): string {
    return RoutePath.HOME;
  }

  previousRoute(): string {
    return RoutePath.HOME;
  }
}
