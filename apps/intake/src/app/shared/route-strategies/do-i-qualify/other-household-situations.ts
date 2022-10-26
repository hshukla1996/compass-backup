import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class DoIQualifyOtherHouseholdSituationsStrategy implements IRoutable {
  hideBackButton=true;
  hideNextButton=true;
  get currentRoute(): string {
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_OTHERHOUSEHOLDSITUATIONS;
  }

  nextRoute(): string {
    // logic
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_SUMMARY;
  }

  previousRoute(): string {
    // logic
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_HOUSEHOLDVALUE;
  }
}
