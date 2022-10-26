import { RoutePath } from '..';
import { IRoutable } from '../strategy';

export class ApplyNowHouseholdUtilityAllowStrategy implements IRoutable {
  hideBackButton = true;
  hideNextButton = true;
  constructor() {
   // this.absentRelatives = this.storeService.getAbsentRelatives;
  }
  get currentRoute(): string {
  //  alert(this.absentRelatives.length);
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDUTILITYALLOW;
  }

  nextRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEDETAILS;
  }

  previousRoute(): string {
    return RoutePath.APPLYNOW + "/" +  RoutePath.APPLYNOW_HOUSEHOLD +  "/" +  RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSITUATIONGATEPOST
  }
}
