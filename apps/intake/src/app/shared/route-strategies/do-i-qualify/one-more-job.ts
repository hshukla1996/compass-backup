
import { RoutePath } from '..';
import { DoIQualifyState } from '../../../do-i-qualify/+state/do-i-qualify.models';
import { IConditionalRoutable, IRoutable } from '../strategy';

export class DoIQualifyOneOrMoreJobStrategy implements IRoutable {
hideBackButton=true;
hideNextButton=true;
  get currentRoute(): string {
    return RoutePath.DOIQUALIFY + '/' + RoutePath.DOIQUALIFY_ONEORMOREJOB;
  }
  
  nextRoute(): string {

   
return "";
   
   
   
  }
  
  previousRoute(): string {
   return "";
  }
}
