import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { DoIQualifyAPIModel, DoIQualifyModel } from '../../do-i-qualify/+state/do-i-qualify.models';
import { doIqualifyURL } from '../constants/Constants';
import { ApiBase } from './api/api-base';

@Injectable({ providedIn: 'root' })

export class DoIQualifyService extends ApiBase<DoIQualifyAPIModel> {
  // private readonly url = "/api/intake/screening/submit";
  private readonly url = doIqualifyURL;

  public triggerNext$: Subject<any> = new Subject();
  public triggerNextUpdated$: Observable<any> = this.triggerNext$.asObservable();
  public triggerBasic$: Subject<any> = new Subject();
  public triggerBasicData$: Observable<any> = this.triggerBasic$.asObservable();
  constructor(http: HttpClient) { super(http) }

  getDoIQualify(): Observable<DoIQualifyAPIModel> {
    // const data = {
    //   basicDetails: {
    //     firstName: 'Test First Name',
    //     lastName: 'Test Last Name',
    //     dateOfBirth: '10/10/2000',
    //     gender: 'Male',
    //   } as BasicDetails,
    //   programSelection: { id: 'PS' } as ProgramSelection,
    //   householdValue: { id: 'HV' } as HouseholdValue,
    //   otherHouseholdSituations: { id: 'OHS' } as OtherHouseholdSituations,
    //   summary: { id: 'S' } as Summary,
    // } as DoIQualifyModel;

    // return of(data);
    // // return this.httpClient.get<DoIQualifyModel>(this.url).pipe(
    // //   tap((data) => console.log(JSON.stringify(data))),
    // //   catchError(this.handleError)
    // // );
    // return this.get(this.url);
    return of();
  }

  postDoIQualify(data: DoIQualifyAPIModel): Observable<DoIQualifyAPIModel> {
    return this.post<DoIQualifyAPIModel, DoIQualifyAPIModel>(this.url, data);
  }

  protected mapValue(value: any): DoIQualifyAPIModel {
    return value;
  }
}
