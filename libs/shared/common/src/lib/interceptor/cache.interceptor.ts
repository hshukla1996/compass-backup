import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpCacheService } from "../services/http-cache.service";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    constructor(private cacheService: HttpCacheService) {}
    test: any;
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<any> {
        //Every call that does not have referencetables in its url will not be handled by interceptor
        if (req.url.indexOf("referencetables") < 0) {
            return next.handle(req);
        
        } else {

            if (req.body) {
                const reqBody = JSON.parse(req.body);
                //Trying to see if the request body table name is already in the cache
                const cachedResponse: HttpResponse<any> = this.cacheService.get(
                    reqBody.tableName
                    )!;
                    
                //If so get it from the cache
                if (cachedResponse.url) {

                    return of(cachedResponse);

                } else {

                    //We don't have the table name in the cache
                    //Regenerate the request and this time add the response to the cache 
                    return next.handle(req).pipe(

                        tap((response) => {

                            if (response) {
                                //Adding table name in the cache
                                this.cacheService.put(reqBody.tableName, response);
                            }

                        })
                    );
                }
            
            } else {
                debugger
                return next.handle(req).pipe(
                    tap((event) => {
                        if (event instanceof HttpResponse) {
                            //Adding url in the cache
                            this.cacheService.put(req.url, event);
                        }
                    })
                );
            }
        }

    }
}
