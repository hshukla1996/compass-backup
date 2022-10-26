import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SocialSecurityNumberComponent } from './social-security-number.component';

const routes: Routes = [
  { path: '', component: SocialSecurityNumberComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialSecurityNumberRoutingModule { }
