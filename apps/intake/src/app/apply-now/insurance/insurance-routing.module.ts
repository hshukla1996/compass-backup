import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '@compass-ui/ui';
import { InsuranceComponent } from './insurance.component';
import { InsuranceDividerComponent } from './insurance-divider/insurance-divider.component';

const routes: Routes = [
  {
    path: '', component: InsuranceDividerComponent}
  ];

@NgModule({
  imports: [UiModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }






