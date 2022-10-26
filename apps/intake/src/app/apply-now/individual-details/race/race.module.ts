import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceComponent } from '../race/race.component';
import { RaceComponentRoutingModule } from './race-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
   // IndividualsGatepostComponent
  ],
  imports: [
    CommonModule,
    RaceComponentRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RaceModule { }
