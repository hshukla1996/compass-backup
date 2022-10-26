import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedAuthModule } from '@compass-ui/shared/auth';
import { UiModule } from '@compass-ui/ui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { CacheInterceptor } from "../../../../libs/shared/common/src/lib/interceptor/cache.interceptor";


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedAuthModule,
        UiModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            },
            defaultLanguage: 'en',
        }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
    ],
    providers: [CookieService,
        { 
            provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
