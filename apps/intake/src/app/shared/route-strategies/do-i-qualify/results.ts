import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class DoIQualifyResultsStrategy implements IRoutable {
  nextButtonText = 'Submit';
  hideBackButton = true;
  hideNextButton = true;
  get currentRoute(): string {
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_RESULTS;
  }

  nextRoute(): string {
    // logic
    return RoutePath.HOME;
  }

  previousRoute(): string {
    // logic
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_SUMMARY;
  }
}
