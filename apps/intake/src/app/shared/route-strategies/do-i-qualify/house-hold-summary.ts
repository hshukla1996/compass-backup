import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class DoIQualifyHouseholdSummaryStrategy implements IRoutable {
  get currentRoute(): string {
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_HOUSEHOLDSUMMARY;
  }

  nextRoute(): string {
    // logic
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_PROGRAMSELECTION;
  }

  previousRoute(): string {
    // logic
      return RoutePath.DOIQUALIFY + "/" + RoutePath.DOIQUALIFY_BASICDETAILS;
   // return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_EDIT_PERSON;
  }
  guardianPath(): string {
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_WHOISGUARDIAN
  }
}
