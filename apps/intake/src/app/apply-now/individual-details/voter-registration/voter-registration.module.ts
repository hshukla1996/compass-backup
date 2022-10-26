import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoterRegistrationRoutingModule } from '././voter-registration-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    VoterRegistrationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class VoterRegistrationModule { }
