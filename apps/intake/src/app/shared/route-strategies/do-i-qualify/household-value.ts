import { RoutePath } from '..';
import { DoIQualifyState } from '../../../do-i-qualify/+state/do-i-qualify.models';
import { IConditionalRoutable } from '../strategy';

export class DoIQualifyHouseholdValueStrategy implements IConditionalRoutable {
  state!: DoIQualifyState;

  setDataContext(state: DoIQualifyState): void {
    this.state = state;
  }
  get currentRoute(): string {
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_HOUSEHOLDVALUE;
  }

  nextRoute(): string {
    // logic
  
      return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_OTHERHOUSEHOLDSITUATIONS;
   
  }

  previousRoute(): string {
    // logic
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_PROGRAMSELECTION;
  }
}
