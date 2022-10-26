import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LgbtqSubmitRequest, LgbtqResponse, LgbtqInitiateRequest } from '../../apply-now/+state/apply-now.models';
import { ReferralsModel } from '../../referrals/+state/referrals.models';
import { lgbtqInitiateURL, lgbtqSubmitURL } from '../constants/Constants';
import { ApiBase } from './api/api-base';

@Injectable({
  providedIn: 'root'
})
export class LgbtqService extends ApiBase<LgbtqSubmitRequest> {
  private readonly initiate_url = lgbtqInitiateURL;
  private readonly submit_url = lgbtqSubmitURL;

  constructor(http: HttpClient) { super(http) }

  initiateSurvey(data: LgbtqInitiateRequest): Observable<LgbtqResponse> {
    return this.post<LgbtqInitiateRequest, LgbtqResponse>(this.initiate_url, data);
  }

  submitSurvey(data: LgbtqSubmitRequest): Observable<LgbtqResponse> {
    return this.post<LgbtqSubmitRequest, LgbtqResponse>(this.submit_url, data);
  }

  protected mapValue(value: any): LgbtqSubmitRequest {
    return value;
  }
}
