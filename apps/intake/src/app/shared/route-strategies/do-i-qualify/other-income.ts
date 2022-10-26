import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class DoIQualifyOtherIncomeStrategy implements IRoutable {
  hideBackButton = true;
  hideNextButton = true;
  get currentRoute(): string {
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_OTHERINCOME;
  }

  nextRoute(): string {
    // logic
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_CURRENTLYENROLLED;
  }

  previousRoute(): string {
    // logic
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_WHOHASOTHERINCOME;
  }
}
