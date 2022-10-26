import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CurrencyPipe } from "@angular/common";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedAuthModule } from "@compass-ui/shared/auth";
import { UiModule } from "@compass-ui/ui";
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {
    HttpClient,
    HttpClientModule,
    HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { StyleGuideComponent } from "./style-guide/style-guide.component";
import { RootStoreModule } from "./+state/root-store.module";
import { CanDeactivateGuard } from "./shared/services/route-prompt.service";
// import { HeadersInterceptor } from "./shared/interceptors/headers.interceptor";
import { GetstartedComponent } from "./shared/ui/getstarted/getstarted.component";
import { CacheInterceptor } from "../../../../libs/shared/common/src/lib/interceptor/cache.interceptor";
import { NotificationComponent } from "./shared/ui/notification/notification.component";
import { ToasterNotificationService } from "./shared/services/toaster-notification.service";
// import { LoaderInterceptor } from "./shared/interceptors/loader.interceptor";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        StyleGuideComponent,
        GetstartedComponent,
        NotificationComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedAuthModule,
        UiModule,
        HttpClientModule,
        NgxSpinnerModule.forRoot({ type: "ball-scale-multiple" }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient],
            },
            defaultLanguage: "en",
        }),
        RootStoreModule,
        !environment.production ? StoreDevtoolsModule.instrument() : [],
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CacheInterceptor,
            multi: true,
        },
        CurrencyPipe,
        ToasterNotificationService
    ],
    bootstrap: [AppComponent],
    exports: [NotificationComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
