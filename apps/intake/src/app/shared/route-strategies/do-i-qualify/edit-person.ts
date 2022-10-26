import { RoutePath } from '..';
import { DoIQualifyState } from '../../../do-i-qualify/+state/do-i-qualify.models';
import { IConditionalRoutable } from '../strategy';

export class DoIQualifyEditPersonStrategy implements IConditionalRoutable {
  state!: DoIQualifyState;


  setDataContext(state: DoIQualifyState): void {
    this.state = state;
  }


  get currentRoute(): string {
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_EDIT_PERSON;
  }

  nextRoute(): string {
    // logic
 
      return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_HOUSEHOLDSUMMARY;

  }

  previousRoute(): string {
    // logic
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_GETTINGSTARTED;
  }
}
