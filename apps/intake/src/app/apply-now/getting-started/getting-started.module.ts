import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GettingStartedRoutingModule } from './getting-started-routing.module';
import { GettingStartedComponent } from './getting-started.component';
import { NonProviderRegistrationComponent } from './non-provider-registration/non-provider-registration.component';
import { CommunityPartnerPasswordComponent } from './community-partner-password/community-partner-password.component';

@NgModule({
  declarations: [
 //   GettingStartedComponent
  
    NonProviderRegistrationComponent,
//  CommunityPartnerPasswordComponent
  ],
  imports: [
    CommonModule,
    GettingStartedRoutingModule
  ]
})
export class GettingStartedModule {}
