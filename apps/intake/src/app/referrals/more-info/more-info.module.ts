import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreInfoComponent } from './more-info.component';
import { RouterModule, Routes } from '@angular/router';
import { AddressValidationComponent } from './address-validation/address-validation.component';
import {TranslateModule} from "@ngx-translate/core";
import {UiModule} from "@compass-ui/ui";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  { path: '', component: MoreInfoComponent }
];

@NgModule({
  declarations: [MoreInfoComponent, AddressValidationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    UiModule,
    ReactiveFormsModule
  ]
})
export class MoreInfoModule { }
