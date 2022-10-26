import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UiModule } from "@compass-ui/ui";

import { MetaReducer, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TranslateModule } from "@ngx-translate/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// export const metaReducers: MetaReducer[] = [hydrationMetaReducer];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        UiModule,
        BrowserModule,
        BrowserAnimationsModule,
    ],
})
export class MyNoticesModule {}
