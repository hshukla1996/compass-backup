import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import {
    GetEnrollment,
    MyNotices,
    SearchNoticesResponse,
    UpdateEnrollment,
} from "../../../+state/models/my-notices/my-notices.model";
import { myNoticesGetEnrollmentURL } from "../../constants/Constants";
import { catchError, Observable, throwError } from "rxjs";
import { ApiError } from "../api/api-error";

@Injectable({
    providedIn: "root",
})
export class GetEnrollmentServices {
    constructor(private http: HttpClient) {}

    getIsEnrolled(): Observable<GetEnrollment[]> {
        return this.http.get<GetEnrollment[]>(myNoticesGetEnrollmentURL).pipe(
            map((data: any) => {
                console.log(data, "data");
                return data;
            })
        );
    }

    /*getEnrollment(): Observable<any> {
       return this.get(myNoticesGetEnrollmentURL);
    }

    get(link: string): Observable<any> {
        return this.http.get<any>(link).pipe(
            map((d) => d.map((t: any) => {
                //debugger
            })),
            catchError((e) => this.handleError(e))
        );
    }
    protected handleError(response: HttpErrorResponse): Observable<any> {
        if (response.error instanceof Event || typeof response.error === 'string') {
            return throwError(() => new ApiError({ message: response.message }))
        }

        return throwError(() => new ApiError(response.error));
    }*/

    //protected abstract mapValue(value: any): T;
}
