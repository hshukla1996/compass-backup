import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { gettingStartedURL } from '../constants/Constants';

@Injectable({
    providedIn: "root",
})
export class GettingStartedService {
    constructor(private http: HttpClient) {}

   getAFSGettingStarted() {
        return this.http.post<any[]>(gettingStartedURL, null).pipe(
            map((data: any) => {
                return data;
            })
        );
    }
}
