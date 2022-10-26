import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@compass-ui/ui';
import { HouseholdComponent } from '../household/household.component';
import { HouseholdRoutingModule } from './household-routing.module';
import { CWTextComponent } from 'libs/ui/src/lib/cwText/cwText.component';
import { GqlService } from '@compass-ui/shared/common'
import { HouseholdHeadSelectionComponent } from './household-head-selection/household-head-selection.component';
import { HouseholdOutsidePersonComponent } from './household-outside-person/household-outside-person.component';
import { HouseholdLtcNursingComponent } from './household-ltc-nursing/household-ltc-nursing.component';
import { HouseholdWhoApplyLtcComponent } from './household-who-apply-ltc/household-who-apply-ltc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HouseholdQuickSnapEndComponent } from './household-quick-snap-end/household-quick-snap-end.component';
import { HouseholdSituationComponent } from './household-situation/household-situation.component';
// import { HouseholdElectricScreenComponent } from './household-electric-screen/household-electric-screen.component';
// import { HouseholdElectricScreenComponent } from './household-electric-screen/household-electric-screen.component';
import { HouseholdElectricProviderComponent } from './household-electric-provider/household-electric-provider.component';
import { HouseholdMemberSituationGatepostComponent } from './household-member-situation-gatepost/household-member-situation-gatepost.component';
import { HouseholdAbsentRelativeNonresidentialpropertyComponent } from './household-absent-relative-nonresidentialproperty/household-absent-relative-nonresidentialproperty.component';
import { HouseholdAbsentRelativeChildsupportComponent } from './household-absent-relative-childsupport/household-absent-relative-childsupport.component';
import { HouseholdAbsentRelativeChildsupportDetailsComponent } from './household-absent-relative-childsupport-details/household-absent-relative-childsupport-details.component';
import { HouseholdAbsentRelativeSummaryComponent } from './household-absent-relative-summary/household-absent-relative-summary.component';
import { AbsentRelativeDetailsComponent } from './absent-relative-details/absent-relative-details.component';
import { AbsentRelativeRaceComponent } from './absent-relative-race/absent-relative-race.component';
import { AbsentRelativeResponsibleForComponent } from './absent-relative-responsible-for/absent-relative-responsible-for.component';
import { AbsentRelativeAddressComponent } from './absent-relative-address/absent-relative-address.component';
import { AbsentRelativeEmployerDetailsComponent } from './absent-relative-employer-details/absent-relative-employer-details.component';
import { NursingFacilityDetailsComponent } from './nursing-facility-details/nursing-facility-details.component';
// import { HouseholdFacilityScreenComponent } from './household-facility-screen/household-facility-screen.component';
// import { HouseholdHealthcareCoverageComponent } from './household-healthcare-coverage/household-healthcare-coverage.component';
// import { HouseholdSnapScreenComponent } from './household-snap-screen/household-snap-screen.component';
// import { HouseholdSnapDisabilityComponent } from './household-snap-disability/household-snap-disability.component';
// import { HouseholdCashAssistanceComponent } from './household-cash-assistance/household-cash-assistance.component';
// import { HouseholdChildCareCostComponent } from './household-child-care-cost/household-child-care-cost.component';
// import { HouseholdSchoolMealsComponent } from './household-school-meals/household-school-meals.component';
// import { HouseholdLongtermlivingServicesComponent } from './household-longtermliving-services/household-longtermliving-services.component';
// // import { HouseholdSnapDisabilityScreensComponent } from './household-snap-disability-screens/household-snap-disability-screens.component';
// import { TypeofnursingHomeOrFacilityComponent } from './typeofnursing-home-or-facility/typeofnursing-home-or-facility.component';

@NgModule({
  declarations: [
    HouseholdComponent,
    CWTextComponent,
    HouseholdHeadSelectionComponent,
    HouseholdQuickSnapEndComponent,
    //HouseholdSituationComponent,
    // HouseholdElectricScreenComponent,
    HouseholdElectricProviderComponent,
    HouseholdMemberSituationGatepostComponent,
    // HouseholdElectricScreenComponent,
    HouseholdMemberSituationGatepostComponent,
    HouseholdElectricProviderComponent,
    HouseholdAbsentRelativeNonresidentialpropertyComponent,
    HouseholdAbsentRelativeChildsupportComponent,
    HouseholdAbsentRelativeChildsupportDetailsComponent,
    HouseholdAbsentRelativeSummaryComponent,
    AbsentRelativeDetailsComponent,
    AbsentRelativeRaceComponent,
    AbsentRelativeResponsibleForComponent,
    AbsentRelativeAddressComponent,
    AbsentRelativeEmployerDetailsComponent,
    NursingFacilityDetailsComponent,
    // HouseholdFacilityScreenComponent,
    // HouseholdHealthcareCoverageComponent,
    // HouseholdSnapScreenComponent,
    // HouseholdSnapDisabilityComponent,
    // HouseholdCashAssistanceComponent,
    // HouseholdChildCareCostComponent,
    // HouseholdSchoolMealsComponent,
    // HouseholdLongtermlivingServicesComponent,
    // // HouseholdSnapDisabilityScreensComponent,
    // TypeofnursingHomeOrFacilityComponent
  /*  HouseholdHeadSelectionComponent,
    HouseholdOutsidePersonComponent,
    HouseholdLtcNursingComponent,
    HouseholdWhoApplyLtcComponent */
  ],
  imports: [
    CommonModule,
    HouseholdRoutingModule,
    UiModule,
    GqlService,
    TranslateModule
  ]
})
export class HouseholdModule { }
