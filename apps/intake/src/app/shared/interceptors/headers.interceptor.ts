import { Injectable } from '@angular/core';
import { TokenService } from '../services/authentication/token-service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { PageErrorService } from 'libs/ui/src/lib/page-error/page-error.service';
import { RoutePath } from '../route-strategies';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.tokenService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse, caught) => {
        PageErrorService.errorMessage = error.message
        this.router.navigate([RoutePath.PAGE_ERROR])
        return throwError(error.message)
      })
    )
  }
}
