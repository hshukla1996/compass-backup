import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmphomeComponent } from './cmphome/cmphome.component';
import { CmphometempComponent } from './cmphometemp/cmphometemp.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PageNotFoundComponent, PageErrorComponent } from '@compass-ui/ui';


const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'cmphome',
    component: CmphomeComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }