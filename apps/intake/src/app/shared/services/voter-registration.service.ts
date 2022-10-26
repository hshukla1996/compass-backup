import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVoterRegistrationState } from '../../apply-now/voter-registration/voter-registration-model/voter-registration-model';
import { IReferralsState, ReferralsModel } from '../../referrals/+state/referrals.models';
import { getVoterRegistrationURL, submitVoterRegistrationURL } from '../constants/Constants';
import { ApiBase } from './api/api-base';

@Injectable({ providedIn: 'root' })
export class VoterRegistrationService extends ApiBase<IVoterRegistrationState> {
    // private readonly geturl = "api/intake/applyforservices/getvoterregistration";
    // private readonly getPosturl = "api/intake/applyforservices/submitvoterregistration";
    private readonly geturl = getVoterRegistrationURL;
    private readonly getPosturl = submitVoterRegistrationURL;


    constructor(http: HttpClient) { super(http) }
 
    // this.store.dispatch(loadItems({ appId: id }))


    // getVoterRegistration(): Observable<IVoterRegistrationState> {
    //     return this.get(this.geturl);
    // }
    getVoterRegistration(appId:any): Observable<IVoterRegistrationState> {
        console.log(appId, "appId")
        return this.post<any, IVoterRegistrationState>(this.geturl, { id: appId.appId});
    }

    postReferrals(data: IVoterRegistrationState): Observable<IVoterRegistrationState> {
        return this.post<IVoterRegistrationState, IVoterRegistrationState>(this.getPosturl, data);
    }

    protected mapValue(value: any): IVoterRegistrationState {
        return value;
    }
}
