import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiModule } from '@compass-ui/ui';
import { ButtonNavigationModule } from '../shared/ui/button-navigation/button-navigation.module';
import { ReferralsRoutingModule } from './referrals-routing.module';
import { ReferralsComponent } from './referrals.component';

import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReferralsEffects } from './+state/referrals.effects';
import { RoutePath } from '../shared/route-strategies';
import { referralsReducer } from './+state/referrals.reducer';

import { MoreInfoComponent } from './more-info/more-info.component';
import { ContactInformationComponent } from './more-info/contact-information/contact-information.component';
import { SummaryComponent } from './summary/summary.component';
import { ReceiptComponent } from './summary/receipt/receipt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HouseholdSummaryOneComponent } from './household-summary-one/household-summary-one.component';
// import { AddAnotherPersonComponent } from './add-another-person/add-another-person.component';
// import { HouseholdSummaryTwoComponent } from './household-summary-two/household-summary-two.component';
// import { ReferralServicesGatepostComponent } from './referral-services-gatepost/referral-services-gatepost.component';
// import { HeadOfHouseholdDetailsComponent } from './head-of-household-details/head-of-household-details.component';
import { HouseholdDetailsComponent } from './household-details/household-details.component';

import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { ProgramSelectionComponent } from './program-selection/program-selection.component';
import { HouseholdSummaryComponent } from './basic-details/household-summary/household-summary.component';
import { AddAnotherPersonComponent } from './basic-details/add-another-person/add-another-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { hydrationMetaReducer } from './+state/hydration.reducer';
import * as fromReferrals from './+state/referrals.reducer';
import { TranslateModule } from '@ngx-translate/core';
import { AutismServicesComponent } from './household-details/autism-services/autism-services.component';
import { IntellectualDisabilityServicesComponent } from './household-details/intellectual-disability-services/intellectual-disability-services.component';
import { AddressValidationComponent } from './more-info/address-validation/address-validation.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';


export const metaReducers: MetaReducer[] = [hydrationMetaReducer];

@NgModule({
  declarations: [
    ReferralsComponent,
    // HeadOfHouseholdDetailsComponent,
    // HouseholdSummaryOneComponent,
    // AddAnotherPersonComponent,
    // HouseholdSummaryTwoComponent,
    // ReferralServicesGatepostComponent,
    HouseholdDetailsComponent,
    AutismServicesComponent,
    IntellectualDisabilityServicesComponent,
    MoreInfoComponent,
    ContactInformationComponent,
    AddressValidationComponent,
    SummaryComponent,
    ReceiptComponent,
    BasicDetailsComponent,
    ProgramSelectionComponent,
    HouseholdSummaryComponent,
    AddAnotherPersonComponent,
    EditPersonComponent,
    GettingStartedComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    ReferralsRoutingModule,
    ButtonNavigationModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    StoreModule.forFeature(
      RoutePath.REFERRALS,
      // referralsReducer,
      fromReferrals.referralsReducer,
      { metaReducers }
    ),
    EffectsModule.forFeature([ReferralsEffects]),
  ],
})
export class ReferralsModule { }
