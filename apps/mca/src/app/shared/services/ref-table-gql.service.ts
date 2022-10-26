import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiServiceBase } from './apiservice-base';
import { BASE_QUERY } from './queries';

@Injectable({ providedIn: 'root' })

export class RefTableGqlService extends ApiServiceBase {

  constructor(http: HttpClient) { super(http) }


  private readonly url = '/api/referencetables/refdata/getdisplayvalues';
  
  getRefData(tableName: string, Keys?: string[], columnName: string = 'DisplayValue'): Observable<any> {

    let REF_TABLE_DATA =
    {
      "tableName": tableName,
      "columnName": columnName,
      "locale": "en-US",
      "keys": Keys
    };
    return this.post(this.url, REF_TABLE_DATA);

  }

  getRefDataByColumn(tableName: string, columnName: string, Keys?: string[]): Observable<any> {

    let REF_TABLE_DATA =
    {
      "tableName": tableName,
      "locale": "en-US",
      "columnName": columnName,
      "keys": Keys
    };
    return this.post(this.url, REF_TABLE_DATA);

  }


}