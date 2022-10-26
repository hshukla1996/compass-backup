import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UiModule } from '@compass-ui/ui';
import { EffectsModule } from '@ngrx/effects';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { RoutePath } from '../shared/route-strategies';
import { ButtonNavigationModule } from '../shared/ui/button-navigation/button-navigation.module';
import { DoIQualifyEffects } from './+state/do-i-qualify.effects';
import { doIQualifyReducer } from './+state/do-i-qualify.reducer';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { DoIQualifyRoutingModule } from './do-i-qualify-routing.module';
import { DoIQualifyComponent } from './do-i-qualify.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { HouseholdValueComponent } from './household-value/household-value.component';
import { OtherHouseholdSituationsComponent } from './other-household-situations/other-household-situations.component';
import { ProgramSelectionComponent } from './program-selection/program-selection.component';
import { SummaryComponent } from './summary/summary.component';
import { AddPersonDetailsComponent } from './add-person-details/add-person-details.component';
import { HouseholdSummaryComponent } from './household-summary/household-summary.component';
import { TotalValueOfResourcesComponent } from './total-value-of-resources/total-value-of-resources.component';
import { ResultsComponent } from './results/results.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { OneMoreJobsComponent } from './one-more-jobs/one-more-jobs.component';
import { OtherIncomeComponent } from './other-income/other-income.component';
import { WhoOtherIncomeComponent } from './who-other-income/who-other-income.component';
import { hydrationMetaReducer } from "./+state/hydration.reducer";
import { MonthlyIncomePrevComponent } from './monthly-income-prev/monthly-income-prev.component';
import { MonthlyIncomeNextComponent } from './monthly-income-next/monthly-income-next.component';
import { CurrenlyEnrolledComponent } from './currenly-enrolled/currenly-enrolled.component';
import { TypeOfEnrollmentComponent } from './type-of-enrollment/type-of-enrollment.component';
import { WhoPregnantComponent } from './who-pregnant/who-pregnant.component';
import { WhoFosterCareComponent } from './who-foster-care/who-foster-care.component';
import { TranslateModule } from '@ngx-translate/core';
import { MonthlyIncomeComponent } from './monthly-income/monthly-income.component';
import { ChildOfUsVeteranComponent } from './child-of-us-veteran/child-of-us-veteran.component';
import { WhoHasDisabilityComponent } from './who-has-disability/who-has-disability.component';
import { WhoIsGuardianComponent } from './who-is-guardian/who-is-guardian.component';
export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ToastrModule, ToastrService } from 'ngx-toastr';
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    DoIQualifyComponent,
    BasicDetailsComponent,
    GettingStartedComponent,
    ProgramSelectionComponent,
    HouseholdValueComponent,
    OtherHouseholdSituationsComponent,
    SummaryComponent,
    HouseholdSummaryComponent,
    AddPersonDetailsComponent,
    TotalValueOfResourcesComponent,
    ResultsComponent,
    EditPersonComponent,
    OneMoreJobsComponent,
    OtherIncomeComponent,
    WhoOtherIncomeComponent,
    
    MonthlyIncomePrevComponent,
    MonthlyIncomeNextComponent,
    CurrenlyEnrolledComponent,
    TypeOfEnrollmentComponent,
    WhoPregnantComponent,
    WhoFosterCareComponent,
    MonthlyIncomeComponent,
    ChildOfUsVeteranComponent,
    WhoHasDisabilityComponent,
    WhoIsGuardianComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    UiModule,
    ReactiveFormsModule,
    FormsModule,
    DoIQualifyRoutingModule,
    ButtonNavigationModule,
    StoreModule.forFeature(
      RoutePath.DOIQUALIFY,
      doIQualifyReducer,
      { metaReducers}
    ),
    EffectsModule.forFeature([DoIQualifyEffects]),
    LottieModule.forRoot({ player: playerFactory }),
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 15000, // 15 seconds
      progressBar: true,
    }),
  ],
  providers: [ToastrService]
})
export class DoIQualifyModule {}
