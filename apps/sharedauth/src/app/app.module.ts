import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedAuthModule } from "@compass-ui/shared/auth";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
    TranslateLoader,
    TranslateModule,
    TranslatePipe,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {
    HttpClient,
    HttpClientModule,
    HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthModule, LogLevel } from "angular-auth-oidc-client";
import { AuthcodeComponent } from "./authcode/authcode.component";
import { AuthhomeComponent } from "./authhome/authhome.component";
import { CreateUserAndPasswordComponent } from "./register/create-user-and-password/create-user-and-password.component";
import { SecurityQuestionsComponent } from "./register/security-questions/security-questions.component";
import { ConnectCaseComponent } from "./register/connect-case/connect-case.component";
import { GoPaperlessComponent } from "./register/go-paperless/go-paperless.component";
import { TermsAndConditionsComponent as RegisterTCS } from "./register/terms-and-conditions/terms-and-conditions.component";
import { TermsAndConditionsComponent as LoginTCS } from "./login-rba/terms-and-conditions/terms-and-conditions.component";
import { RegistrationConfirmationComponent } from "./register/registration-confirmation/registration-confirmation.component";
import { ActiveCaseComponent } from "./register/active-case/active-case.component";
import { VerifyEmailComponent } from "./login-rba/verify-email/verify-email.component";
import { VerifySecurityQuestionComponent } from "./login-rba/verify-security-question/verify-security-question.component";
import { VerifyPersonalInfoComponent } from "./login-rba/verify-personal-info/verify-personal-info.component";
import { DeviceTypeComponent } from "./login-rba/device-type/device-type.component";
import { ChangeConfirmationComponent as ChangeSQSCS} from "./change-security-questions/change-confirmation/change-confirmation.component";
import { ChangeConfirmationComponent as ChangeEmailCS} from "./change-email/change-confirmation/change-confirmation.component";
import { ChangeConfirmationComponent as ChangePassCS } from "./change-password/change-confirmation/change-confirmation.component";
import { ChangeConfirmationComponent as ForgotPassCS } from "./forgot-password/change-confirmation/change-confirmation.component";
import { ChangeConfirmationComponent as ForgotUserCS } from "./forgot-username/change-confirmation/change-confirmation.component";
import { NewPasswordComponent as ChangePassNP } from "./change-password/new-password/new-password.component";
import { NewPasswordComponent as ForgotPassNP } from "./forgot-password/new-password/new-password.component";
import { NewEmailComponent } from "./change-email/new-email/new-email.component";
import { NewQuestionsComponent } from "./change-security-questions/new-questions/new-questions.component";
import { AnswerSecurityQuestionsComponent } from "./forgot-password/answer-security-questions/answer-security-questions.component";
import { SelectAndVerifyComponent } from "./forgot-username/select-and-verify/select-and-verify.component";
import { RegisterComponent } from "./register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ForgotUsernameComponent } from "./forgot-username/forgot-username.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ChangeEmailComponent } from "./change-email/change-email.component";
import { ChangeSecurityQuestionsComponent } from "./change-security-questions/change-security-questions.component";
import { UiModule } from "@compass-ui/ui";
import { LoginRbaComponent } from "./login-rba/login-rba.component";
import { CacheInterceptor } from "../../../../libs/shared/common/src/lib/interceptor/cache.interceptor";
// import { LoaderInterceptor } from "./shared/interceptors/loader.interceptor";
// import { HeadersInterceptor } from "./shared/interceptors/headers.interceptor";

@NgModule({
    declarations: [
        AppComponent,
        AuthcodeComponent,
        AuthhomeComponent,
        CreateUserAndPasswordComponent,
        SecurityQuestionsComponent,
        ConnectCaseComponent,
        GoPaperlessComponent,
        RegisterTCS,
        LoginTCS,
        RegistrationConfirmationComponent,
        ActiveCaseComponent,
        VerifyEmailComponent,
        VerifySecurityQuestionComponent,
        VerifyPersonalInfoComponent,
        DeviceTypeComponent,
        ChangeSQSCS,
        ChangeEmailCS,
        ChangePassCS,
        ForgotPassCS,
        ForgotUserCS,
        ChangePassNP,
        ForgotPassNP,
        NewEmailComponent,
        NewQuestionsComponent,
        AnswerSecurityQuestionsComponent,
        SelectAndVerifyComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        ForgotUsernameComponent,
        ChangePasswordComponent,
        ChangeEmailComponent,
        ChangeSecurityQuestionsComponent,
        LoginRbaComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
        AuthModule.forRoot({
            config: {
                authority:
                    "https://idxs-dev.dhs.pa.gov/affwebservices/CASSO/oidc/Compass_Client_Citizen_DEV",
                redirectUrl:
                    "http://compass-dev.dhs.pa.gov/sharedauth/authcode",
                clientId: "979db954-ad29-4427-a2a3-874160b2434f",
                scope: "openid profile",
                responseType: "code",
                logLevel: LogLevel.Debug,
                customParamsCodeRequest: {
                    client_secret:
                        "koc16lwynyTavX0kFP8y0oDXgl84jqGE6wuW9mRD/mY=",
                },
                // autoUserInfo:false,
                triggerAuthorizationResultEvent: true,
            },
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient],
            },
            defaultLanguage: "en",
        }),
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        SharedAuthModule,
        UiModule,
        !environment.production ? StoreDevtoolsModule.instrument() : [],
    ],
    providers: [
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: HeadersInterceptor,
        //     multi: true,
        // },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: LoaderInterceptor,
        //     multi: true,
        // },
        { 
            provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
