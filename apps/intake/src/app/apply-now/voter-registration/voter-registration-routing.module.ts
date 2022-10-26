import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VoterRegistrationGettingStartedComponent } from './voter-registration.component';
import { RequirementQuestionsComponent } from './requirement-questions/requirement-questions.component';
import { NotEligibleComponent } from './not-eligible/not-eligible.component';
import { RoutePath } from '../../shared/route-strategies';


const routes: Routes = [
  {
    path: '',
    component: VoterRegistrationGettingStartedComponent
  },
  {
    path: RoutePath.APPLYNOW_VOTERREGISTRATION,
    component: RequirementQuestionsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class VoterRegistrationRoutingModule { }
