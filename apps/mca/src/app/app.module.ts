import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UiModule } from "@compass-ui/ui";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// import { HomeComponent } from './home/home.component';

import { TranslateLoader, TranslateModule, TranslatePipe } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {
    HttpClient,
    HttpClientModule,
    HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";

import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./+state";

import { EffectsModule } from "@ngrx/effects";
import { PostsEffects } from "./+state/posts/posts.effects";
import { PostsService } from "./shared/services/posts.service";
import { RefDataEffects } from "./+state/effects/ref-data.effects";

// import { HeadersInterceptor } from "./../../../mca/src/shared/interceptors/header.interceptor";

import { PostsListComponent } from "./posts-list/posts-list.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NotificationPreferencesComponent } from "./notification-preferences/notification-preferences.component";
import { CheckEBTComponent } from "./check-ebt/check-ebt.component";
import { Receive1095Component } from "./receive1095/receive1095.component";
import { SubmitLIHEAPComponent } from "./submit-liheap/submit-liheap.component";
import { ReportChangesComponent } from "./report-changes/report-changes.component";
import { ViewTicketDetailsComponent } from "./report-changes/view-ticket-details/view-ticket-details.component";
import { ReportChangesGatepostComponent } from "./report-changes/report-changes-gatepost/report-changes-gatepost.component";
import { AddressChangeComponent } from "./report-changes/address-change/address-change.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddressSelectComponent } from "./report-changes/address-select/address-select.component";
import { ContactInformationChangeComponent } from "./report-changes/contact_information_change/contact_information_change.component";
import { IncomeJobChangesComponent } from "./report-changes/income_job_changes/income_job_changes.component";
import { WageChangesComponent } from "./report-changes/wage_changes/wage_changes.component";
import { ReportSummarycomponent } from "./report-changes/report-summary/report-summary.component";
import { LossOfJobComponent } from "./report-changes/loss-of-job/loss-of-job.component";
import { NewJobChangesComponent } from "./report-changes/new-job-changes/new-job-changes.component";
import { UnEmploymentScreenComponent } from "./report-changes/unemployment-screen/unemployment-screen.component";
import { SSIChangesComponent } from "./report-changes/ssi-changes/ssi-changes.component";
import { RSDIChangesComponent } from "./report-changes/rsdi-changes/rsdi-changes.component";
import { OtherIncomeChangesComponent } from "./report-changes/other-income-changes/other-income-changes.component";
import { HousingUtilitiesChangesComponent } from "./report-changes/housing-utilities-changes/housing-utilities-changes.component";
import { ResourceChangesComponent } from "./report-changes/resource-changes/resource-changes.component";
import { OtherCommunicationChangesComponent } from "./report-changes/other-communication-changes/other-communication-changes.component";
import { CrisisStartedComponent } from "./report-changes/crisis-started/crisis-started.component";
import { EmergencySituationsComponent } from "./report-changes/emergency-situations/emergency-situations.component";
import { LiheapConfirmationComponent } from "./report-changes/liheap-confirmation/liheap-confirmation.component";
import { LiheapCashInformationComponent } from "./report-changes/liheap-cash-information/liheap-cash-information.component";
import { HeatingSourceCrisisComponent } from "./report-changes/heating-source-crisis/heating-source-crisis.component";
import { ElectricHeatingSourceChangesComponent } from "./report-changes/electric-heating-source-changes/electric-heating-source-changes.component";
import { OtherHeatingSourceChangesComponent } from "./report-changes/other-heating-source-changes/other-heating-source-changes.component";
import { LiheapCrisisSummaryComponent } from "./report-changes/liheap-crisis-summary/liheap-crisis-summary.component";
import { PregnancyOtherHouseholdComponent } from "./report-changes/pregnancy_other_household_changes/pregnancy_other_household_changes.component";
import { CommonModule } from "@angular/common";
import { MyBenefitsModule } from "./my-benefits/my-benefits.module";

import { MyNoticesModule } from "./my-notices/my-notices.module";
import { EnrolledComponent } from "./my-notices/enrolled/enrolled.component";
import { UnenrolledComponent } from "./my-notices/unenrolled/unenrolled.component";
import { PregnancyDetailsComponent } from "./report-changes/pregnancy-details/pregnancy-details.component";
import { OtherHouseholdChangesComponent } from "./report-changes/other-household-changes/other-household-changes.component";
import { MCAGISValidationStrategy } from "./report-changes/address-change/address-validation-service";
import { MyNoticesComponent } from "./my-notices/my-notices.component";
import { SearchNoticesComponent } from "./my-notices/search-notices/search-notices.component";
import { GetEnrollmentServices } from './shared/services/my-notices/my-notices-get-enrollment.service';
import { UploadGatepostComponent } from "./upload-document/upload-gatepost/upload-gatepost.component";
import { SelectDocumentComponent } from "./upload-document/select-document/select-document.component";
import { UploadDocumentComponent } from "./upload-document/upload-document/upload-document.component";
import { UploadSummaryComponent } from "./upload-document/upload-summary/upload-summary.component";
import { UploadConfirmationComponent } from "./upload-document/upload-confirmation/upload-confirmation.component";
import { CaseRecordEntryComponent } from './receive1095/case-record-entry/case-record-entry.component';
import { TaxYearConsentComponent } from './receive1095/tax-year-consent/tax-year-consent.component';
import { CacheInterceptor } from "../../../../libs/shared/common/src/lib/interceptor/cache.interceptor";


@NgModule({
    declarations: [
        AppComponent,
        // HomeComponent,
        PostsListComponent,
        DashboardComponent,
        MyNoticesComponent,
        SearchNoticesComponent,
        NotificationPreferencesComponent,
        CheckEBTComponent,
        Receive1095Component,
        SubmitLIHEAPComponent,
        ReportChangesComponent,
        ViewTicketDetailsComponent,
        ReportChangesGatepostComponent,
        AddressChangeComponent,
        AddressSelectComponent,
        ContactInformationChangeComponent,
        IncomeJobChangesComponent,
        WageChangesComponent,
        LossOfJobComponent,
        NewJobChangesComponent,
        UnEmploymentScreenComponent,
        SSIChangesComponent,
        RSDIChangesComponent,
        OtherIncomeChangesComponent,
        HousingUtilitiesChangesComponent,
        ResourceChangesComponent,
        OtherCommunicationChangesComponent,
        CrisisStartedComponent,
        EmergencySituationsComponent,
        LiheapConfirmationComponent,
        LiheapCashInformationComponent,
        HeatingSourceCrisisComponent,
        ElectricHeatingSourceChangesComponent,
        OtherHeatingSourceChangesComponent,
        LiheapCrisisSummaryComponent,
        OtherHeatingSourceChangesComponent,
        WageChangesComponent,
        PregnancyOtherHouseholdComponent,
        ReportSummarycomponent,
        PregnancyDetailsComponent,
        OtherHouseholdChangesComponent,
        EnrolledComponent,
        UnenrolledComponent,
        UploadGatepostComponent,
        SelectDocumentComponent,
        UploadDocumentComponent,
        UploadSummaryComponent,
        UploadConfirmationComponent,
        CaseRecordEntryComponent,
        TaxYearConsentComponent
    ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    UiModule,
    MyBenefitsModule,
    MyNoticesModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: 'en',
    }),
    StoreModule.forRoot(
      reducers,
      {
        metaReducers,
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([PostsEffects, RefDataEffects]),

    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [TranslatePipe, PostsService, GetEnrollmentServices,
    /*{ provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true }*/
    { 
        provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
