import { RoutePath } from '..';
import { IConditionalRoutable, IRoutable } from '../strategy';
import {IApplyNowState} from '../../../apply-now/+state/apply-now.models';
import { IGeneralDetails } from '../../../apply-now/individual-details/general-details/state/general-details-model';
import { Injectable } from '@angular/core';
@Injectable()
export class ApplyNowGeneralDetailsStrategy implements IConditionalRoutable {
  generalDetailsState!: IGeneralDetails | null;
  hideBackButton = true;
  hideNextButton = true;
  setDataContext(state: IApplyNowState): void {
    // console.log('Got state data for DoIQualifyBasicDetailsStrategy');
  }

  get currentRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_GENERAL_DETAILS;
  }

  nextRoute(): string {
    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_RACE;
  }

  previousRoute(): string {
 return RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_INDIVIDUALDETAILS;
    //    return RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSENDING;
  }
}

