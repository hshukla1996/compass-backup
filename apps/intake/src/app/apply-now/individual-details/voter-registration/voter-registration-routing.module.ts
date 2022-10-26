import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VoterRegistrationComponent } from '././voter-registration.component';

const routes: Routes = [
  { path: '', component: VoterRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoterRegistrationRoutingModule { }
