import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent, UiModule } from '@compass-ui/ui';
import { RoutePath } from '../shared/route-strategies';
import { ReferralsComponent } from './referrals.component';
// import { HouseholdSummaryOneComponent } from './household-summary-one/household-summary-one.component';
// import { AddAnotherPersonComponent } from './add-another-person/add-another-person.component';
// import { HouseholdSummaryTwoComponent } from './household-summary-two/household-summary-two.component';
// import { ReferralServicesGatepostComponent } from './referral-services-gatepost/referral-services-gatepost.component';
// import { HeadOfHouseholdDetailsComponent } from './head-of-household-details/head-of-household-details.component';
import { HouseholdDetailsComponent } from './household-details/household-details.component';
import { MoreInfoComponent } from './more-info/more-info.component';
import { ContactInformationComponent } from './more-info/contact-information/contact-information.component';
import { ReceiptComponent } from './summary/receipt/receipt.component';
import { SummaryComponent } from './summary/summary.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';

import { AutismServicesComponent } from './household-details/autism-services/autism-services.component';
import { IntellectualDisabilityServicesComponent } from './household-details/intellectual-disability-services/intellectual-disability-services.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { AddAnotherPersonComponent } from './basic-details/add-another-person/add-another-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { ProgramSelectionComponent } from './program-selection/program-selection.component';
import { HouseholdSummaryComponent } from './basic-details/household-summary/household-summary.component';
import { AddressValidationComponent } from './more-info/address-validation/address-validation.component';
import { CanDeactivateGuard } from '../shared/services/route-prompt.service';

const routes: Routes = [
  {
    path: '',
    component: ReferralsComponent,
    canDeactivate: [CanDeactivateGuard],
    children: [
      {
        path: '',
        component: GettingStartedComponent,
      },
      {
        path: RoutePath.REFERRALS_GETTINGSTARTED,
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: RoutePath.REFERRALS_BASICDETAILS,
        component: BasicDetailsComponent
      },
      {
        path: RoutePath.REFERRALS_ADDANOTHERPERSON,
        component: AddAnotherPersonComponent
      },
      {
        path: RoutePath.REFERRALS_HOUSEHOLDSUMMARY,
        component: HouseholdSummaryComponent
      },
      {
        path: RoutePath.REFERRALS_EDITPERSON,
        component: EditPersonComponent
      },
      {
        path: RoutePath.REFERRALS_PROGRAMSELECTION,
        component: ProgramSelectionComponent
      },
      {
        path: RoutePath.REFERRALS_HOUSEHOLDDETAILS,
        component: HouseholdDetailsComponent
      },

      {
        path: RoutePath.REFERRALS_INTELLECTUAL_DISABILITY_SERVICES,
        component: IntellectualDisabilityServicesComponent
      },
      {
        path: RoutePath.REFERRALS_AUTISM_SERVICES,
        component: AutismServicesComponent
      },

      {
        path: RoutePath.REFERRALS_MOREINFORMATION,
        component: MoreInfoComponent
      },
      {
        path: RoutePath.REFERRALS_CONTACTINFORMATION,
        component: ContactInformationComponent
      },
      {
        path: RoutePath.REFERRALS_ADDRESSVALIDATION,
        component: AddressValidationComponent
      },
      {
        path: RoutePath.REFERRALS_SUMMARY,
        component: SummaryComponent
      },
      {
        path: RoutePath.REFERRALS_RECEIPT,
        component: ReceiptComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [UiModule, RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class ReferralsRoutingModule { }
