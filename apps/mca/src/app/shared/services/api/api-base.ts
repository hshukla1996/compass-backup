import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { ApiError } from "./api-error";

export abstract class ApiBase<T> {
    protected constructor(protected http: HttpClient) { }

    get(link: string): Observable<T> {
        return this.http.get<any>(link)
            .pipe(
                map(d => d.map((t: any) => this.mapValue(t))),
                catchError(e => this.handleError(e))
            );
    }

    post<B, R>(link: string, body: B): Observable<R> {
        return this.http.post<B>(link, body)
            .pipe(catchError(e => this.handleError(e)));
    }

    protected handleError(response: HttpErrorResponse): Observable<any> {
        if (response.error instanceof Event || typeof response.error === 'string') {
            return throwError(() => new ApiError({ message: response.message }))
        }

        return throwError(() => new ApiError(response.error));
    }

    protected abstract mapValue(value: any): T;
}