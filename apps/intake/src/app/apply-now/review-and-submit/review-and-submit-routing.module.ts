import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '@compass-ui/ui';
import { ReviewAndSubmitComponent } from './review-and-submit.component';

const routes: Routes = [
  { path: '', component: ReviewAndSubmitComponent }
];

@NgModule({
  imports: [UiModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewAndSubmitRoutingModule { }
