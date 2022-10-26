import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetEnrollment, MyNotices, SearchNoticesResponse, UpdateEnrollment, UserPreference } from '../../../+state/models/my-notices/my-notices.model';
import { myNoticesVerifyEnrollmentEmailURL } from '../../constants/Constants';

@Injectable({
    providedIn: 'root',
})

export class verifyEnrollmentEmailServices {
    constructor(private http: HttpClient) { }
    verifyEnrollmentEmailServices(): Observable<UserPreference> {
        return this.http.post(myNoticesVerifyEnrollmentEmailURL, {}).pipe(
            map((data: any) => {
                console.log(data, "data");
                return data;
            })
        );
    }
}