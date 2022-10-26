import { Injectable } from '@angular/core';
import { RoutePath } from '..';
import { IRoutable } from '../strategy';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReferrralsContactInformationStrategy implements IRoutable {
  // constructor(private http: HttpClient) {

  // }
  hideBackButton = true;
  hideNextButton = true;
  get currentRoute(): string {
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_CONTACTINFORMATION;
  }

  nextRoute(): string {
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_ADDRESSVALIDATION;
  }

  previousRoute(): string {
    // logic
    return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_MOREINFORMATION;
  }
}
