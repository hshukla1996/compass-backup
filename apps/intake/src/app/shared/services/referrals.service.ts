import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReferralsState, ReferralsModel } from '../../referrals/+state/referrals.models';
import { referralURL } from '../constants/Constants';
import { ApiBase } from './api/api-base';

@Injectable({ providedIn: 'root' })
export class ReferralsService extends ApiBase<ReferralsModel> {
  // private readonly url = "/api/intake/referral/submit";
  private readonly url  = referralURL;

  constructor(http: HttpClient) { super(http) }

  getReferrals(): Observable<ReferralsModel> {
    return this.get(this.url);
  }

  postReferrals(data: ReferralsModel): Observable<ReferralsModel> {
    return this.post<ReferralsModel, ReferralsModel>(this.url, data);
  }

  protected mapValue(value: any): ReferralsModel {
    return value;
  }
}
