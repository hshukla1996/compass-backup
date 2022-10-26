import { RoutePath } from '..';
import { DoIQualifyState } from '../../../do-i-qualify/+state/do-i-qualify.models';
import { IConditionalRoutable } from '../strategy';

export class DoIQualifyBasicDetailsStrategy implements IConditionalRoutable {
  state!: DoIQualifyState;

  setDataContext(state: DoIQualifyState): void {
    this.state = state;
  }
  get currentRoute(): string {
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_BASICDETAILS;
  }

  nextRoute(): string {
   
      return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_HOUSEHOLDSUMMARY;

  }

  previousRoute(): string {
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_GETTINGSTARTED;
  }
}
