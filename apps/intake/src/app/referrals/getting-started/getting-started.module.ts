import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GettingStartedComponent } from './getting-started.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: GettingStartedComponent }
];

@NgModule({
  declarations: [GettingStartedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GettingStartedModule { }
