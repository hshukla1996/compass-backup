import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetEnrollment, MyNotices, SearchNoticesResponse, UpdateEnrollment, UserSubscription } from '../../../+state/models/my-notices/my-notices.model';
import { myNoticesUpdateEnrollmentURL } from '../../constants/Constants';

@Injectable({
    providedIn: "root",
})
export class updateEnrollmentServices {
    constructor(private http: HttpClient) {}

    emailEnrollment(): Observable<UserSubscription[]> {
        return this.http.post<UserSubscription[]>(myNoticesUpdateEnrollmentURL,{})
            .pipe(
                map((data: any) => {
                    console.log(data, "data");
                    return data;
                })
            );
    }

    /*updateEnrollmentServices(): Observable<UpdateEnrollment> {
        return this.http.post(myNoticesUpdateEnrollmentURL, {}).pipe(
            map((data: any) => {
                console.log(data, "data");
                return data;
            })
        );
    }*/
}