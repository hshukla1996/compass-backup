import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '@compass-ui/ui';
import { RoutePath } from '../shared/route-strategies';
import { AddPersonDetailsComponent } from './add-person-details/add-person-details.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { HouseholdSummaryComponent } from './household-summary/household-summary.component';
import { HouseholdValueComponent } from './household-value/household-value.component';
import { OtherHouseholdSituationsComponent } from './other-household-situations/other-household-situations.component';
import { ProgramSelectionComponent } from './program-selection/program-selection.component';
import { SummaryComponent } from './summary/summary.component';

import { DoIQualifyComponent } from './do-i-qualify.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import {MonthlyIncomeNextComponent} from './monthly-income-next/monthly-income-next.component'
import { EditPersonComponent } from './edit-person/edit-person.component';
import { OneMoreJobsComponent } from './one-more-jobs/one-more-jobs.component';
import { OtherIncomeComponent } from './other-income/other-income.component';
import { WhoOtherIncomeComponent } from './who-other-income/who-other-income.component';
import { CurrenlyEnrolledComponent } from './currenly-enrolled/currenly-enrolled.component';
import { TypeOfEnrollmentComponent } from './type-of-enrollment/type-of-enrollment.component';
import { WhoPregnantComponent } from './who-pregnant/who-pregnant.component';
import { WhoFosterCareComponent } from './who-foster-care/who-foster-care.component';
import { ResultsComponent } from './results/results.component';
import { MonthlyIncomeComponent } from './monthly-income/monthly-income.component';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { ChildOfUsVeteranComponent } from './child-of-us-veteran/child-of-us-veteran.component';
import { WhoHasDisabilityComponent } from './who-has-disability/who-has-disability.component';
import { WhoIsGuardianComponent } from './who-is-guardian/who-is-guardian.component';
import { CanDeactivateGuard } from '../shared/services/route-prompt.service';
const routes: Routes = [
  {
    path: '',
    component: DoIQualifyComponent,
    canDeactivate: [CanDeactivateGuard],
    children: [
      {
        path: '',
        component: GettingStartedComponent
      },
      {
        path: RoutePath.DOIQUALIFY_GETTINGSTARTED,
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: RoutePath.DOIQUALIFY_BASICDETAILS,
        component: BasicDetailsComponent
      },
      {
        path: RoutePath.DOIQUALIFY_MONTHLYINCOME,
        component:MonthlyIncomeComponent
        
      },
      {
        path: RoutePath.DOIQUALIFY_PROGRAMSELECTION,
        component:ProgramSelectionComponent
        
      },
      {
        path: RoutePath.DOIQUALIFY_HOUSEHOLDVALUE,
        component: HouseholdValueComponent
      },
      {
        path: RoutePath.DOIQUALIFY_OTHERHOUSEHOLDSITUATIONS,
        component: OtherHouseholdSituationsComponent
      },
      {
        path: RoutePath.DOIQUALIFY_SUMMARY,
        component: SummaryComponent
      },
      
     
      {
        path: RoutePath.DOIQUALIFY_MONTHLYINCOME,
       component:MonthlyIncomeComponent
      },
      {
        path: RoutePath.DOIQUALIFY_ONEORMOREJOB,
        component:OneMoreJobsComponent
      },
      {
        path: RoutePath.DOIQUALIFY_OTHERINCOME,
        component:OtherIncomeComponent
      },
      {
        path: RoutePath.DOIQUALIFY_WHOHASOTHERINCOME,
        component:WhoOtherIncomeComponent
      },
      {
        path: RoutePath.DOIQUALIFY_CURRENTLYENROLLED,
        component:CurrenlyEnrolledComponent
      },
      {
        path: RoutePath.DOIQUALIFY_TYPEOFENROLLMENT,
        component:TypeOfEnrollmentComponent
      },
      {
        path: RoutePath.DOIQUALIFY_HOUSEHOLDSUMMARY,
        component: HouseholdSummaryComponent
      },
      {
        path: RoutePath.DOIQUALIFY_ADD_PERSON,
        component: AddPersonDetailsComponent
      },
      {
        path: RoutePath.DOIQUALIFY_EDIT_PERSON,
        component: EditPersonComponent
      },
      {
        path: RoutePath.DOIQUALIFY_WHOISPREGNANT,
        component:WhoPregnantComponent
      },
      {
        path: RoutePath.DOIQUALIFY_FOSTERCARE,
        component:WhoFosterCareComponent
      },
      
      {
        path: RoutePath.DOIQUALIFY_RESULTS,
        component:ResultsComponent
      },
      {
        path: RoutePath.DOIQUALIFY_CHILDOFUSVETERAN,
        component: ChildOfUsVeteranComponent
      },
      {
        path: RoutePath.DOIQUALIFY_WHOHASDISABILITY,
        component: WhoHasDisabilityComponent
      },
      {
        path: RoutePath.DOIQUALIFY_WHOISGUARDIAN,
        component:WhoIsGuardianComponent
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [UiModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoIQualifyRoutingModule { }
