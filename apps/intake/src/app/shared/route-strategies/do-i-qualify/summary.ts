import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class DoIQualifySummaryStrategy implements IRoutable {
  nextButtonText = 'Submit';

  get currentRoute(): string {
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_SUMMARY;
  }

  nextRoute(): string {
    // logic
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_RESULTS;
  }

  previousRoute(): string {
    // logic
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_OTHERHOUSEHOLDSITUATIONS;
  }
}
