import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SystemCompatibilityComponent } from "./system-compatibility/system-compatibility.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Common Screen Components
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { CwMessageBannerComponent } from "./cw-message-banner/cw-message-banner.component";

// Form Field Components
import { CWTextComponent } from "./cwText/cwText.component";
import { MenuComponent } from "./menu/menu.component";
import { RouterModule } from "@angular/router";
import { CwButtonComponent } from "./cw-button/cw-button.component";
import { CwCheckboxComponent } from "./cw-checkbox/cw-checkbox.component";
import { CwClosebuttonComponent } from "./cw-closebutton/cw-closebutton.component";
import { CwDatepickerComponent } from "./cw-datepicker/cw-datepicker.component";
import { CwRadiobuttonComponent } from "./cw-radiobutton/cw-radiobutton.component";
import { CwTextareaComponent } from "./cw-textarea/cw-textarea.component";
import { CwTextboxComponent } from "./cw-textbox/cw-textbox.component";
import { CwDropdownComponent } from "./cw-dropdown/cw-dropdown.component";
import { CwSelectComponent } from "./cw-select/cw-select.component";
import { SsnDirective } from "./cw-ssn-directive/ssn.directive";
import { CWPhoneDirective } from "./cw-phone-directive/cw-phone-directive";
import { CwFieldErrorDisplayComponent } from "./cw-field-error-display/cw-field-error-display.component";
import {
    CWOptionComponent,
    CWNativeSelectComponent,
} from "./cw-native-select/cw-native-select.component";
import { ChatbotComponent } from "./chatbot/chatbot.component";
import { CwCommonComponent } from "./cw-commoncomponent/cw-commoncomponent.component";
import { CwDpqButtonComponent } from "./cw-dpq-button/cw-dpq-button.component";
import { CwSimpleTileCheckbox } from "./templates/cw-simpletile-checkbox/cw-simpletile-checkbox.component";
import { CwSimpleTileCheckboxTextBox } from "./templates/cw-simpletile-checkbox-textbox/cw-simpletile-checkbox-textbox.component";
import { CwSimpleTileButtongroup } from "./templates/cw-simpletile-buttongroup/cw-simpletile-buttongroup.component";
import { CwSimpleTileDropdown } from "./templates/cw-simpletile-dropdown/cw-simpletile-dropdown.component";
import { PhoneMaskDirective } from "./../../../shared/directives/phone-mask.directive";
import { SSNMaskDirective } from "./../../../shared/directives/ssn-mask.directive";
import { ZIPMaskDirective } from "./../../../shared/directives/zip-mask.directive";
import { CwSimpletitleCheckboxRadioComponent } from "./templates/cw-simpletile-checkbox-radio/cw-simpletitle-checkbox-radio.component";
import { CwSimpleTitleRadios } from "./templates/cw-simpletitle-radios/cw-simpletitle-radios.component";
import { CwSimpleTileInputText } from "./templates/cw-simpletile-inputtext/cw-simpletile-inputtext.component";
import { CwSimpleTileDropdownInput } from "./templates/cw-simpletile-dropdowninput/cw-simpletile-dropdowninput.component";
import { NonStepperMenuComponent } from "./non-stepper-menu/non-stepper-menu.component";
import { CwSimpleTileGatepostButton } from "./templates/cw-simpletile-gatepostbutton/cw-simpletile-gatepostbutton.component";
import { CwSimpleTileSummary } from "./templates/cw-simpletile-summary/cw-simpletile-summary.component";
import { CwModal } from "./templates/cw-modal/cw-modal.component";
import { CwLoaderComponent } from "./cw-loader/cw-loader.component";
import { CwPasswordComponent } from "./cw-password/cw-password.component";
import { CwUploadComponent } from "./cw-upload/cw-upload.component";
import { LottieModule } from "ngx-lottie";
import player from "lottie-web";
import { TranslateModule } from "@ngx-translate/core";
import { CwSimpletileTermsAndConditionsComponent } from "./templates/cw-simpletile-terms-and-conditions/cw-simpletile-terms-and-conditions.component";
import { CwSimpletileConfirmationComponent } from "./templates/cw-simpletile-confirmation/cw-simpletile-confirmation.component";
import { CwCensoredComponent } from "./cw-censored/cw-censored.component";
import { PageErrorComponent } from "./page-error/page-error.component";
import { PageErrorService } from "./page-error/page-error.service";
import { CwLoginModalComponent } from "./cw-login-modal/cw-login-modal.component";


export function playerFactory() {
    return player;
}
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        ReactiveFormsModule,
        RouterModule.forChild([]),
        LottieModule.forRoot({ player: playerFactory }),
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        CwMessageBannerComponent,
        CWTextComponent,
        PageNotFoundComponent,
        SystemCompatibilityComponent,
        MenuComponent,
        NonStepperMenuComponent,
        CwButtonComponent,
        CwCheckboxComponent,
        CwClosebuttonComponent,
        CwDatepickerComponent,
        CwRadiobuttonComponent,
        CwTextareaComponent,
        CwTextboxComponent,
        CwDropdownComponent,
        CWOptionComponent,
        CWNativeSelectComponent,
        CwSelectComponent,
        SsnDirective,
        CWPhoneDirective,
        CwFieldErrorDisplayComponent,
        ChatbotComponent,
        CwCommonComponent,
        CwDpqButtonComponent,
        CwSimpleTileCheckbox,
        CwSimpleTileCheckboxTextBox,
        CwSimpleTileButtongroup,
        CwSimpleTileDropdown,
        PhoneMaskDirective,
        CwSimpleTileInputText,
        SSNMaskDirective,
        ZIPMaskDirective,
        CwSimpleTileDropdown,
        CwSimpletitleCheckboxRadioComponent,
        CwSimpleTitleRadios,
        CwSimpleTileDropdownInput,
        CwSimpleTileGatepostButton,
        CwSimpleTileSummary,
        CwModal,
        CwLoaderComponent,
        CwPasswordComponent,
        CwUploadComponent,
        CwSimpletileTermsAndConditionsComponent,
        CwSimpletileConfirmationComponent,
        CwCensoredComponent,
        PageErrorComponent,
        CwLoginModalComponent,
        CwLoginModalComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        CwMessageBannerComponent,
        CWTextComponent,
        PageNotFoundComponent,
        MenuComponent,
        NonStepperMenuComponent,
        SystemCompatibilityComponent,
        CwButtonComponent,
        CwCheckboxComponent,
        CwClosebuttonComponent,
        CwDatepickerComponent,
        CwRadiobuttonComponent,
        CwTextareaComponent,
        CwTextboxComponent,
        CwDropdownComponent,
        CwSimpleTileCheckboxTextBox,
        CwSelectComponent,
        CWOptionComponent,
        CWNativeSelectComponent,
        SsnDirective,
        CWPhoneDirective,
        CwFieldErrorDisplayComponent,
        CwCommonComponent,
        CwDpqButtonComponent,
        CwSimpleTileCheckbox,
        CwSimpleTileButtongroup,
        CwSimpleTileDropdown,
        PhoneMaskDirective,
        CwSimpleTileInputText,
        SSNMaskDirective,
        ZIPMaskDirective,
        CwSimpleTileDropdown,
        CwSimpletitleCheckboxRadioComponent,
        CwSimpleTitleRadios,
        CwSimpleTileDropdownInput,
        CwSimpleTileGatepostButton,
        CwSimpleTileSummary,
        CwModal,
        CwLoaderComponent,
        CwPasswordComponent,
        CwUploadComponent,
        CwSimpletileTermsAndConditionsComponent,
        CwSimpletileConfirmationComponent,
        CwCensoredComponent,
        PageErrorComponent,
        CwLoginModalComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UiModule {}
