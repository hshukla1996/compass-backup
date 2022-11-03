import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UiModule } from "@compass-ui/ui";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {
    HttpClient,
    HttpClientModule,
    HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CmphomeComponent } from "./cmphome/cmphome.component";
import { CmphometempComponent } from "./cmphometemp/cmphometemp.component";
import { CacheInterceptor } from "../../../../libs/shared/common/src/lib/interceptor/cache.interceptor";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { AccessibilityComponent } from "./components/accessibility/accessibility.component";
import { OtherBenefitsComponent } from "./components/other-benefits/other-benefits.component";
import { CheckAppStatusComponent } from "./components/check-app-status/check-app-status.component";
import { ApplicationStatusComponent } from "./components/application-status/application-status.component";
import { WhereToGoComponent } from "./components/where-to-go/where-to-go.component";
import { ApplicationSectionsComponent } from "./components/application-sections/application-sections.component";
import { HelpCenterComponent } from "./components/help-center/help-center.component";
import { FaqComponent } from "./components/faq/faq.component";

@NgModule({
    declarations: [
        AppComponent,
        CmphomeComponent,
        CmphometempComponent,
        WelcomeComponent,
        AccessibilityComponent,
        OtherBenefitsComponent,
        CheckAppStatusComponent,
        ApplicationStatusComponent,
        WhereToGoComponent,
        ApplicationSectionsComponent,
        HelpCenterComponent,
        FaqComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([], {}),
        AppRoutingModule,
        BrowserAnimationsModule,
        UiModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient],
            },
            defaultLanguage: "en",
        }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CacheInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
