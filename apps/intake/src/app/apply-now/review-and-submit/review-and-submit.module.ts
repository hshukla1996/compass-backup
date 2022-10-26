import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@compass-ui/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewAndSubmitRoutingModule } from './review-and-submit-routing.module';
import { NotificationPreferencesComponent } from './notification-preferences/notification-preferences.component';

@NgModule({
  declarations: [
    NotificationPreferencesComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    ReviewAndSubmitRoutingModule
  ]
})
export class ReviewAndSubmitModule {}
