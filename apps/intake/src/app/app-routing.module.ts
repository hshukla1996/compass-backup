import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { PageNotFoundComponent, PageErrorComponent } from '@compass-ui/ui';
import { RoutePath } from './shared/route-strategies';
import { CanDeactivateGuard } from "./shared/services/route-prompt.service";
import { GetstartedComponent } from "./shared/ui/getstarted/getstarted.component";

import {DeacGuardService} from "./deac-gaurd.service";
import {GuardService} from "./gaurd.service";


// DONOT HARDCODE PATH. Use RoutePath enum.
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canDeactivate: [GuardService]
  },
  {
    path: RoutePath.APPLYNOW,
    loadChildren: () =>
      import('./apply-now/apply-now.module').then((m) => m.ApplyNowModule),
  },
  {
    path: RoutePath.DOIQUALIFY,
    loadChildren: () =>
      import('./do-i-qualify/do-i-qualify.module').then(
        (m) => m.DoIQualifyModule
      ),
  },
  {
    path: RoutePath.REFERRALS,
    loadChildren: () =>
      import('./referrals/referrals.module').then(
        (m) => m.ReferralsModule),
  },
  {
    path: RoutePath.STYLEGUIDE,
    component: StyleGuideComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: RoutePath.GETSTARTED,
    component: GetstartedComponent
  },
  {
    path: RoutePath.APPLYNOW_GETTINGSTARTEDROUTES,
    component: GetstartedComponent
  },
  {
    path: RoutePath.PAGE_ERROR_WITHOUT_SLASH,
    component: PageErrorComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
  providers: [DeacGuardService]
})
export class AppRoutingModule { }
