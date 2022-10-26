import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReceive1095FormState } from '../../../+state/models/receive-1095-form/receive-1095-form.model';
import { receive1095FormURL } from '../../constants/Constants';
import { ApiBase } from '../api/api-base';

@Injectable({
  providedIn: 'root'
})
export class Receive1095FormService extends ApiBase<IReceive1095FormState> {
  constructor(private httpClient: HttpClient) { 
    super(httpClient)
  }
  
  protected mapValue(value: any): IReceive1095FormState {
    throw new Error('Method not implemented.');
  }

  postReceive1095Form(data: IReceive1095FormState): Observable<IReceive1095FormState> {
    // TODORW change state to correct format
    return this.post<IReceive1095FormState, IReceive1095FormState>(receive1095FormURL, data);
  }
}
