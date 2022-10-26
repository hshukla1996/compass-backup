import { RoutePath } from '..';
import { BasicDetails, DoIQualifyState } from '../../../do-i-qualify/+state/do-i-qualify.models';
import { IConditionalRoutable, IRoutable } from '../strategy';

export class DoIQualifyCurrentlyEnrolledStrategy implements IConditionalRoutable {
  state!: DoIQualifyState;
  hideBackButton = true;
  hideNextButton = true;
  setDataContext(state: DoIQualifyState): void {
    this.state = state;
    console.log('Got state data for DoIQualifyBasicDetailsStrategy');
  }
  get currentRoute(): string {
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_CURRENTLYENROLLED;
  }
  
  nextRoute(): string{
     return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_TYPEOFENROLLMENT;
  
  }
  
  previousRoute(): string 
  {
  
      return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_OTHERINCOME;
   
  }
}
