import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApplyNowState } from '../../apply-now/+state/apply-now.models';
import { ApiBase } from './api/api-base';
import { houseHoldSaveURL, houseHoldSubmitURL, gettingStartedURL } from '../constants/Constants';

@Injectable({ providedIn: 'root' })
export class ApplyNowService extends ApiBase<IApplyNowState> {


  constructor(http: HttpClient) { super(http) }

  getApplyNow(): Observable<IApplyNowState> {
    return this.get(gettingStartedURL);
  }

  postSaveApplyNow(data: IApplyNowState): Observable<IApplyNowState> {
    return this.post<IApplyNowState, IApplyNowState>(houseHoldSaveURL, data);
  }
  postSubmitApplyNow(data: IApplyNowState): Observable<IApplyNowState> {
    return this.post<IApplyNowState, IApplyNowState>(houseHoldSubmitURL, data);
  }
  
  protected mapValue(value: any): IApplyNowState {
    return value;
  }

}
