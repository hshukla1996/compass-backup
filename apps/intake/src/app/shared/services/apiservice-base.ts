import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export abstract class ApiServiceBase {
  constructor(protected httpClient: HttpClient) { }

  post(url: string, query: any): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*.*"
      });

    return this.httpClient.post(url, JSON.stringify(query), { headers: headers })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((err) => {
          console.error(err);
          throw err;
        }));
      }
}
