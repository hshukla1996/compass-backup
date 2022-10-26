import { Injectable } from '@angular/core';
import { RoutePath } from '..';
import { IRoutable } from '../strategy';
@Injectable()
export class ApplyNowRaceStrategy implements IRoutable {
  hideBackButton=true;
  hideNextButton=true;
  get currentRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_RACE;
  }

  nextRoute(): string {
    // Your custom code here
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_SOCAIL_SECURITY_NUMBER;
  }

  previousRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_GENERAL_DETAILS;
  }
  
}
