import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DrivingLicenseComponent } from './driving-license.component';

const routes: Routes = [
  { path: '', component: DrivingLicenseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrivingLicenseRoutingModule { }
