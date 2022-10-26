import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiServiceBase } from './apiservice-base';
@Injectable({ providedIn: 'root' })

export class GqlService extends ApiServiceBase {

  constructor(http: HttpClient) { super(http) }

  private readonly url = "/api/referencetables/refdata/getdisplayvalues";
  private readonly urlmultiCol = "/api/referencetables/refdata/getrowswithcolumns";

  getRefMultiColoumnData(tableName: string,additionalcolumnName?: string[]): Observable<any> {

    let REF_TABLE_DATA =
    {
      "tableName": tableName,
      "locale": "en-US",
      "additionalColumns": additionalcolumnName
    };
    
    return this.post(this.urlmultiCol, REF_TABLE_DATA);

  }

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
 
  getCountyContactData(tableName: string, Keys?: string[], columnName: string = 'ReferralContactNumber'): Observable<any> {

    let REF_TABLE_DATA =
    {
      "tableName": tableName,
      "columnName": columnName,
      "locale": "en-US",
      "keys": Keys
    };

    return this.post(this.url, REF_TABLE_DATA);

  }


}