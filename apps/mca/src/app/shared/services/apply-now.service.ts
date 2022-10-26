import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApplyNowState } from '../../apply-now/+state/apply-now.models';
import { ApiBase } from './api/api-base';

@Injectable({ providedIn: 'root' })
export class ApplyNowService extends ApiBase<IApplyNowState> {
  private readonly url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(http: HttpClient) { super(http) }

  getApplyNow(): Observable<IApplyNowState> {
    return this.get(this.url);
  }

  postApplyNow(data: IApplyNowState): Observable<IApplyNowState> {
    return this.post<IApplyNowState, IApplyNowState>(this.url, data);
  }

  protected mapValue(value: any): IApplyNowState {
    return value;
  }
}
