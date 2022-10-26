import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CacheInterceptor } from "../../../../libs/shared/common/src/lib/interceptor/cache.interceptor";

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot([], { initialNavigation: "enabledBlocking" }),
    ],
    providers: [
        { 
            provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
