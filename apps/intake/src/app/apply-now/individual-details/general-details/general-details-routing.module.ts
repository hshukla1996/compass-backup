import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GeneralDetailsComponent } from './general-details.component';

const routes: Routes = [
  { path: '', component: GeneralDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralDetailsRoutingModule { }
