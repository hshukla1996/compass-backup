import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmphomeComponent } from './cmphome/cmphome.component';
import { CmphometempComponent } from './cmphometemp/cmphometemp.component';

const routes: Routes = [
  {
    path: 'cmphome',
    component: CmphomeComponent
  },
  {
    path: '',
    component: CmphometempComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
