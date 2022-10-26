import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetEnrollment, MyNotices, SearchNoticesResponse, UpdateEnrollment } from '../../../+state/models/my-notices/my-notices.model';
import { myNoticesGetUserNoticesURL } from '../../constants/Constants';

@Injectable({
    providedIn: 'root',
})

export class getUserNoticesServices {
    constructor(private http: HttpClient) { }
    getUserNoticesServices(): Observable<MyNotices[]> {
        return this.http.post<MyNotices[]>(myNoticesGetUserNoticesURL,{ }).pipe(
            map((data: any) => {
                console.log(data, "data");
                return data;
            })
        );
    }
}