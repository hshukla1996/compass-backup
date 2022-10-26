import { RoutePath } from '..';
import { DoIQualifyState } from '../../../do-i-qualify/+state/do-i-qualify.models';
import { IConditionalRoutable } from '../strategy';

export class DoIQualifyWhoHasOtherIncome implements IConditionalRoutable {
  state!: DoIQualifyState;
  hideBackButton = true;
  hideNextButton = true;
  setDataContext(state: DoIQualifyState): void {
   this.state = state;
    
  }
  get currentRoute(): string {
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_WHOHASOTHERINCOME;
  }
  
  nextRoute(): string {
   return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_OTHERINCOME;;
   
  }
  
  previousRoute(): string {
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_ONEORMOREJOB;
  }
}
