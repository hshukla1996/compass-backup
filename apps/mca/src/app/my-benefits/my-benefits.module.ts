import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UiModule } from "@compass-ui/ui";

import { MetaReducer, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TranslateModule } from "@ngx-translate/core";

import { MyBenefitsComponent } from "./my-benefits.component";
import { LinkCaseSelectionComponent } from "./link-case-selection/link-case-selection.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MyBenefitsRoutingModule } from "./my-benefits-routing.module"; 
import { LinkingOnlineNoticesComponent } from "./linking-online-notices/linking-online-notices.component";
import { TermsConditionsComponent } from "./terms-conditions/terms-conditions.component";

// export const metaReducers: MetaReducer[] = [hydrationMetaReducer];

@NgModule({
    declarations: [
        MyBenefitsComponent,
        LinkCaseSelectionComponent,
        LinkingOnlineNoticesComponent, 
        TermsConditionsComponent,
    ],
    imports: [
        CommonModule,
        UiModule, 
        BrowserModule,
        BrowserAnimationsModule,
        // LinkCaseSelectionComponent,
        // MyBenefitsComponent,
        MyBenefitsRoutingModule,
        // ReferralsRoutingModule,
        // ButtonNavigationModule,
        // ReactiveFormsModule,
        // FormsModule,
        // TranslateModule,
        // StoreModule.forFeature(
        //     RoutePath.REFERRALS,
        //     // referralsReducer,
        //     fromReferrals.referralsReducer,
        //     { metaReducers }
        // ),
        // EffectsModule.forFeature([ReferralsEffects]),
    ],
})
export class MyBenefitsModule {}
