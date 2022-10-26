import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent, UiModule } from '@compass-ui/ui';
import { RoutePath } from '../shared/route-strategies';
import { LinkCaseSelectionComponent } from './link-case-selection/link-case-selection.component';
import { LinkingOnlineNoticesComponent } from './linking-online-notices/linking-online-notices.component'; 
import { MyBenefitsComponent } from './my-benefits.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
 
const routes: Routes = [
    {
        path: '',
        component: MyBenefitsComponent,
        children: [
            {
                path: '',
                component: MyBenefitsComponent,
            },
            {
                path: '',
                component: LinkCaseSelectionComponent,
            },
            {
                path: '',
                component: LinkingOnlineNoticesComponent,
            },
            {
                path: '',
                component: TermsConditionsComponent,
            },
             
        ],
    }, 
];

@NgModule({
    imports: [UiModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyBenefitsRoutingModule { }
