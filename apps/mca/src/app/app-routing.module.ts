import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent, UiModule } from '@compass-ui/ui';
import { RoutePath } from './shared/route-strategies';
import { MyBenefitsComponent } from './my-benefits/my-benefits.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyNoticesComponent } from './my-notices/my-notices.component';
import { SearchNoticesComponent } from './my-notices/search-notices/search-notices.component';
import { ReportChangesComponent } from './report-changes/report-changes.component';
import { NotificationPreferencesComponent } from './notification-preferences/notification-preferences.component';
import { CheckEBTComponent } from './check-ebt/check-ebt.component';
import { Receive1095Component } from './receive1095/receive1095.component';
import { SubmitLIHEAPComponent } from './submit-liheap/submit-liheap.component';
import { ViewTicketDetailsComponent } from './report-changes/view-ticket-details/view-ticket-details.component';
import { ReportChangesGatepostComponent } from './report-changes/report-changes-gatepost/report-changes-gatepost.component';
import { AddressChangeComponent } from './report-changes/address-change/address-change.component';
import { AddressSelectComponent } from './report-changes/address-select/address-select.component';
import { ContactInformationChangeComponent } from './report-changes/contact_information_change/contact_information_change.component';
import { IncomeJobChangesComponent } from './report-changes/income_job_changes/income_job_changes.component';
import { WageChangesComponent } from './report-changes/wage_changes/wage_changes.component';
import { ReportSummarycomponent } from './report-changes/report-summary/report-summary.component';
import { LossOfJobComponent } from './report-changes/loss-of-job/loss-of-job.component';
import { NewJobChangesComponent } from './report-changes/new-job-changes/new-job-changes.component';
import { UnEmploymentScreenComponent } from './report-changes/unemployment-screen/unemployment-screen.component';
import { SSIChangesComponent } from './report-changes/ssi-changes/ssi-changes.component';
import { RSDIChangesComponent } from './report-changes/rsdi-changes/rsdi-changes.component';
import { OtherIncomeChangesComponent } from './report-changes/other-income-changes/other-income-changes.component';
import { HousingUtilitiesChangesComponent } from './report-changes/housing-utilities-changes/housing-utilities-changes.component';
import { ResourceChangesComponent } from './report-changes/resource-changes/resource-changes.component';
import { OtherCommunicationChangesComponent } from './report-changes/other-communication-changes/other-communication-changes.component';
import { CrisisStartedComponent } from './report-changes/crisis-started/crisis-started.component';
import { EmergencySituationsComponent } from './report-changes/emergency-situations/emergency-situations.component';
import { LiheapConfirmationComponent } from './report-changes/liheap-confirmation/liheap-confirmation.component';
import { LiheapCashInformationComponent } from './report-changes/liheap-cash-information/liheap-cash-information.component';
import { HeatingSourceCrisisComponent } from './report-changes/heating-source-crisis/heating-source-crisis.component';
import { ElectricHeatingSourceChangesComponent } from './report-changes/electric-heating-source-changes/electric-heating-source-changes.component';
import { OtherHeatingSourceChangesComponent } from './report-changes/other-heating-source-changes/other-heating-source-changes.component';
import { LiheapCrisisSummaryComponent } from './report-changes/liheap-crisis-summary/liheap-crisis-summary.component';
import {PregnancyOtherHouseholdComponent} from './report-changes/pregnancy_other_household_changes/pregnancy_other_household_changes.component'
import { LinkCaseSelectionComponent } from './my-benefits/link-case-selection/link-case-selection.component';
import { TermsConditionsComponent } from './my-benefits/terms-conditions/terms-conditions.component';
import { LinkingOnlineNoticesComponent } from './my-benefits/linking-online-notices/linking-online-notices.component';
import { HomeComponent } from './home/home.component';
import { PregnancyDetailsComponent } from './report-changes/pregnancy-details/pregnancy-details.component';
import { OtherHouseholdChangesComponent } from './report-changes/other-household-changes/other-household-changes.component';
import { UploadGatepostComponent } from './upload-document/upload-gatepost/upload-gatepost.component';
import { SelectDocumentComponent } from './upload-document/select-document/select-document.component';
import { UploadDocumentComponent } from './upload-document/upload-document/upload-document.component';
import { UploadSummaryComponent } from './upload-document/upload-summary/upload-summary.component';
import { UploadConfirmationComponent } from './upload-document/upload-confirmation/upload-confirmation.component';
import { TaxYearConsentComponent } from './receive1095/tax-year-consent/tax-year-consent.component';
import { CaseRecordEntryComponent } from './receive1095/case-record-entry/case-record-entry.component';
// import { LinkingTermsConditionsComponent } from './my-benefits/Linking-terms-conditions/Linking-terms-conditions.component';
 


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  // {
  //   path: '',
  //   component: DashboardComponent,
  // },
  {
    path: RoutePath.DASHBOARD,
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: RoutePath.MYBENEFIT,
    component: MyBenefitsComponent,
  },
  {
    path: RoutePath.LINK_CASE_SELECTION,
    component: LinkCaseSelectionComponent,
  },
  {
    path: RoutePath.LINKING_ONLINE_SELECTION,
    component: LinkingOnlineNoticesComponent,
  },
  {
    path: RoutePath.LINKING_TERMS_CONDITIONS,
    component: TermsConditionsComponent,
  },
  {
    path: RoutePath.MYNOTICES,
    component: MyNoticesComponent,   
  },
  {
    path: RoutePath.NOTIFICATION_PREFERENCES,
    component: NotificationPreferencesComponent,
  },
  {
    path: RoutePath.REPORT_CHANGES_GATEPOST,
    component: ReportChangesGatepostComponent,
  },
  {
    path: RoutePath.REPORT_CHANGES,
    component: ReportChangesComponent,
  },
  {
    path: RoutePath.VIEW_TICKET_DETAILS,
    component: ViewTicketDetailsComponent,
  },
  {
    path: RoutePath.ADDRESS_CHANGE,
    component: AddressChangeComponent,
  },
  {
    path: RoutePath.INCOME_JOB_CHANGE,
    component: IncomeJobChangesComponent,
  },
  {
    path: RoutePath.WAGE_CHANGES,
    component: WageChangesComponent,
  },
  {
    path: RoutePath.REPORT_CHANGES,
    component: WageChangesComponent,
  },
  {
    path: RoutePath.LOSS_OF_JOB,
    component: LossOfJobComponent,
  },
  {
    path: RoutePath.NEW_JOB_CHANGES,
    component: NewJobChangesComponent
  },
  {
    path: RoutePath.UNEMPLOYMENT_SCREEN,
    component: UnEmploymentScreenComponent
  },
  {
    path: RoutePath.SSI_CHANGES,
    component: SSIChangesComponent
  },
  {
    path: RoutePath.RSDI_CHANGES,
    component: RSDIChangesComponent
  },
  {
    path: RoutePath.OTHER_INCOME_CHANGES,
    component: OtherIncomeChangesComponent
  },
  {
    path: RoutePath.HOUSING_UTILITIES_CHANGES,
    component: HousingUtilitiesChangesComponent
  },
  {
    path: RoutePath.RESOURCE_CHANGES,
    component: ResourceChangesComponent
  },
  {
    path: RoutePath.CRISIS_START,
    component: CrisisStartedComponent
  },
  {
    path: RoutePath.EMERGENCY_SITUATIONS,
    component: EmergencySituationsComponent
  },
  {
    path: RoutePath.OTHER_COMMUNICATION_CHANGES,
    component: OtherCommunicationChangesComponent
  },
  {
    path: RoutePath.LIHEAP_CONFIRMATION,
    component: LiheapConfirmationComponent
  },
  {
    path: RoutePath.LIHEAP_CASH_INFORMATION,
    component: LiheapCashInformationComponent
  },
  {
    path: RoutePath.HEATING_SOURCE_CRISIS,
    component: HeatingSourceCrisisComponent
  },
  {
    path: RoutePath.ELECTRIC_HEATING_SOURCE_CHANGES,
    component: ElectricHeatingSourceChangesComponent
  },
  {
    path: RoutePath.OTHER_HEATING_SOURCE_CHANGES,
    component: OtherHeatingSourceChangesComponent
  },
  {
    path: RoutePath.LIHEAP_CRISIS_SUMMARY,
    component: LiheapCrisisSummaryComponent
  },
  {
    path: RoutePath.CONTACT_INFORMATION_CHANGE,
    component: ContactInformationChangeComponent,
  },
  {
    path: RoutePath.ADDRESS_SELECT,
    component: AddressSelectComponent,
  },
  {
    path: RoutePath.RECEIVE_1095,
    children: [
      {
        path: '',
        component: Receive1095Component
      },
      {
        path: RoutePath.TAX_YEAR_CONSENT,
        component: TaxYearConsentComponent
      },
      {
        path: RoutePath.CASE_RECORD_ENTRY,
        component: CaseRecordEntryComponent
      }
    ]
  },
  {
    path: RoutePath.SUBMIT_LIHEAP,
    component: SubmitLIHEAPComponent,
  },
  {
    path: RoutePath.CHECK_EBT,
    component: CheckEBTComponent,
  },
  {
    path: RoutePath.PREGNANCY_OTHER_HOUSEHOLD,
    component: PregnancyOtherHouseholdComponent,
  },
  {
    path: RoutePath.REPORT_SUMMARY,
    component: ReportSummarycomponent,
  },
  {
    path: RoutePath.PREGNANCY_DETAILS,
    component: PregnancyDetailsComponent,
  },
  {
    path: RoutePath.OTHER_HOUSEHOLD_CHANGES,
    component: OtherHouseholdChangesComponent,
  },
  {
    path: RoutePath.UPLOAD_GATEPOST,
    component: UploadGatepostComponent,
  },
  {
    path: RoutePath.SELECT_DOCUMENT,
    component: SelectDocumentComponent,
  },
  {
    path: RoutePath.UPLOAD_DOCUMENT,
    component: UploadDocumentComponent,
  },
  {
    path: RoutePath.UPLOAD_SUMMARY,
    component: UploadSummaryComponent,
  },
  {
    path: RoutePath.UPLOAD_CONFIRMATION,
    component: UploadConfirmationComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [UiModule, RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled"
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
