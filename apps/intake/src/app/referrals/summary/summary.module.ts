import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: SummaryComponent }
];

@NgModule({
  declarations: [SummaryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReferralSummaryModule { }
