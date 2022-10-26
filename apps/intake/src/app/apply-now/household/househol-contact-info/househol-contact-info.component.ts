import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { HouseholdContactInfo } from '../models/householdContactInfo';
import {
    FormGroup,
    FormControl,
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    AbstractControl,
} from "@angular/forms";
import { ApplyNowHouseholdContactInfoStrategy } from '../../../shared/route-strategies/apply-now/householdContactInfo';
import { Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { IApplyNowState, Programs } from '../../+state/apply-now.models';
import { IHouseHold, IHouseholdContactInfo } from '../household-model';
import { delay, first, of, Subscription } from 'rxjs';
import { RoutePath } from '../../../shared/route-strategies';
import { INDIVIDUAL_PROGRAMS } from '../../../shared/constants/Individual_Programs_Constants';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";

@Component({
    selector: "compass-ui-househol-contact-info",
    templateUrl: "./househol-contact-info.component.html",
    styleUrls: ["./househol-contact-info.component.scss"],
    providers: [ApplyNowHouseholdContactInfoStrategy],
})
export class HouseholContactInfoComponent implements OnInit {
    householdContactInfo: HouseholdContactInfo;
    householdContInfoForm: FormGroup | any;
    mainContactNumber: string = "";
    secContactNumber: string = "";
    othContactNumber: string = "";
    applyNowState!: IApplyNowState;
    data: any;
    detail!: IHouseholdContactInfo;
    sevicesselected: Array<any> = [];
    MainContactNumberDiv = false;
    SecondContactNumberDiv = false;
    OtherContactNumberDiv = false;

    contactForCash = true;
    requiredFields=[] as string[];
    optionalFields = [] as string[];
    emailMatch = true;
    showError = false;
    errorMsg: string | undefined;
    errorText: string = "";
    displayError: boolean | undefined;
    fieldDisplays: any = {};

    contact = [
        { id: "E", sf: "Email" },
        { id: "M", sf: "Main Phone Number" },
        { id: "S", sf: "Second Phone Number"},
        { id: "O", sf: "Other Phone Number"},
    ];
    constructor(
        public householdFormDataService: HouseholdFormDataService,
        private householdContInfo: FormBuilder,
        private router: Router,
        private service: ApplyNowStoreService,
        private routingStratagy: ApplyNowHouseholdContactInfoStrategy,
        private cd: ChangeDetectorRef
    ) {
        this.householdContactInfo =
            this.householdFormDataService.householdContactInfo;
    }

    ngOnInit(): void {
        this.householdContInfoForm = this.householdContInfo.group({
            mainContact: new FormControl("", [Utility.phoneNumberValidator()]),
            mainContactRad: "",
            secContact: new FormControl("", [Utility.phoneNumberValidator()]),
            secContactRad: "",
            othContact: new FormControl("", [Utility.phoneNumberValidator()]),
            othContactRad: "",
            email: ["", Validators.email],
            confirmEmail: ["", Validators.email],
            contact: "",
        });

        const benefits = this.service.getBenefits();
        const isProgramExistforCash = this.service.isProgramExist(
            benefits as string[],
            INDIVIDUAL_PROGRAMS.CA
        );
        if (isProgramExistforCash) {
            this.contactForCash = false;
        } else {
            this.contactForCash = true;
        }

        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.data = this.applyNowState.metaData;
            this.detail = this.applyNowState.houseHoldDetails
                .householdContactInfo as IHouseholdContactInfo;

            this.sevicesselected =
                this.applyNowState?.programSelection?.programs || [];
            of(true)
                .pipe(delay(10))
                .subscribe(() => {
                    this.householdContInfoForm.patchValue({
                        mainContact: this.detail?.mainContact,
                        mainContactRad: this.detail?.mainContactRad,
                        secContact: this.detail?.secContact,
                        secContactRad: this.detail?.secContactRad,
                        othContact: this.detail?.othContact,
                        othContactRad: this.detail?.othContactRad,
                        email: this.detail?.email,
                        confirmEmail: this.detail?.confirmEmail,
                        contact: this.detail?.contact,
                    });
                });
            this.MainContactNumberDiv = this.detail?.mainContact ? true : false;
            this.SecondContactNumberDiv = this.detail?.secContact
                ? true
                : false;
            this.OtherContactNumberDiv = this.detail?.othContact ? true : false;
            this.cd.detectChanges();
        });
        this.setOrResetValidator();
        if (this.sevicesselected.indexOf(Programs.CI) > -1 ||
            this.sevicesselected.indexOf(Programs.CIR) > -1) {
            this.householdContInfoForm.get("contact").setValidators(Validators.required);
        }
        else {
            this.householdContInfoForm.get("contact").clearValidators();
        }
        this.cd.detectChanges();
    }

    checkEmail(check: any) {
        let charCode = check.charCode;
        return ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91)
                || (charCode > 96 && charCode < 123) || charCode == 95 || charCode == 64
                || charCode == 46 || charCode == 45);
    }

    OnlyNumberAllowed(event: { which: any; keyCode: any }, field: any): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode === 8 &&  this.householdContInfoForm.get(field).value.length < 4) {
            this.householdContInfoForm.value[field] = undefined;
            this.householdContInfoForm.get(field).errors = {};
            this.householdContInfoForm.get(field).value = '';
            this.householdContInfoForm.get(field).status = "VALID";
            this.householdContInfoForm.status = "VALID";
            return true;
        }
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    GetValue(value: string) {
        this.mainContactNumber = value;
    }

    showMainContactNumber() {
        this.MainContactNumberDiv = true;
    }

    GetVal(value: string) {
        this.secContactNumber = value;
    }

    showSecContactNumber() {
        this.SecondContactNumberDiv = true;
    }

    GetValOther(value: string) {
        this.othContactNumber = value;
    }

    showOtherContactNumber() {
        this.OtherContactNumberDiv = true;
    }
    isFieldValid(field: string): boolean {
        return (
            this.householdContInfoForm.get(field).status !== "VALID" &&
            (this.householdContInfoForm.get(field).dirty ||
                this.householdContInfoForm.get(field).touched)
        );
    }
    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
             case "contact":
                if (this.householdContInfoForm.get("contact").errors.required) {
                    return "This is required";
                }
                break;
            case "email":
                if (this.householdContInfoForm.get("email").errors.required) {
                    return "Email is required";
                }
                else {
                    return "Email is invalid";
                }
                break;
            case "mainContact":
                if (this.householdContInfoForm.get("mainContact").errors.required) {
                    return "Main phone number is required";
                }
                break;
            case "secContact":
                if (this.householdContInfoForm.get("secContact").errors.required) {
                    return "Secondary phone number is required";
                }
                break;
            case "othContact":
                if (this.householdContInfoForm.get("othContact").errors.required) {
                    return "Other phone number is required";
                }
                break;
        }
        return "";
    }

    setProgramFieldValidation(currentUser: IHouseHold) {
        let householdBenefits = this.service?.getAppliedBenefitsForIndividual(
            currentUser
        ) as string[];
        const fields = [
            {
                fieldName: "contact",
                optionalProgram: [INDIVIDUAL_PROGRAMS.CA],
                requiredProgram: [],
            },
        ] as FormValidatorField[];
        this.fieldDisplays = {};
        fields.forEach((fieldObj: FormValidatorField) => {
            this.fieldDisplays[fieldObj.fieldName] =
                this.service.areProgramsExist(householdBenefits, [
                    ...fieldObj.optionalProgram,
                    ...fieldObj.requiredProgram,
                ]);
        });
    }
    
    onSubmit() {
        this.service.validateAllFormFields(this.householdContInfoForm);
        this.emailMatch = this.householdContInfoForm.value.email === this.householdContInfoForm.value.confirmEmail ? true : false;
        if (!this.emailMatch) return;
        if (!this.householdContInfoForm.valid) return;
        const storeHouseholdContactInfo = this.applyNowState?.houseHoldDetails;
        const storedHouseholdContactInfo = this.applyNowState?.houseHoldDetails
            .householdContactInfo as IHouseholdContactInfo;

        const updatedHouseholdContactInfo = {
            ...storedHouseholdContactInfo,
            householdContactInfo: this.householdContInfoForm.value,
        };
        this.service.updateHouseHoldDetails({
            ...storeHouseholdContactInfo,
            ...updatedHouseholdContactInfo,
        });

        if (
            this.sevicesselected.indexOf(Programs.FS) > -1 ||
            this.sevicesselected.indexOf(Programs.ES) > -1
        ) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDQUICKSNAPEND,
            ]);
        } 
        else if (
            this.sevicesselected.indexOf(Programs.LN) > -1 ||
            this.sevicesselected.indexOf(Programs.LI) > -1 ||
            this.sevicesselected.indexOf(Programs.WN) > -1 ||
            this.sevicesselected.indexOf(Programs.WNR) > -1 ||
            this.sevicesselected.indexOf(Programs.WAR) > -1 
        ) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLIVINGSIS,
            ]);
        }
        else if (
            this.sevicesselected.indexOf(Programs.LH) > -1 ||
            this.sevicesselected.indexOf(Programs.LHP) > -1 ||
            this.sevicesselected.indexOf(Programs.LW) > -1 ||
            this.sevicesselected.indexOf(Programs.LHCR) > -1
        ) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSITUATION,
            ]);
        }
        else if (
            this.sevicesselected.length === 1 && this.sevicesselected.indexOf(Programs.HC) > -1
        ) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSITUATIONGATEPOST,
            ]);
        } 
        else if (this.sevicesselected.length === 2 && 
                this.sevicesselected.indexOf(Programs.CI) > -1 && 
                this.sevicesselected.indexOf(Programs.BL) > -1) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSUMMARY,
            ]);
        } 
        else if (this.sevicesselected.length === 1 && this.sevicesselected.indexOf(Programs.CI) > -1) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSUMMARY,
            ]);
        } 
        else if (this.sevicesselected.length === 1 && this.sevicesselected.indexOf(Programs.BL) > -1) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSUMMARY,
            ]);
        }
        else {
            this.router.navigate([this.routingStratagy.nextRoute()]);
        }

        return true;
    }
    previous() {
        if (this.sevicesselected.indexOf(Programs.CA) > -1) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLIVEDINPA,
            ]);
        } 
        else if (this.sevicesselected.indexOf(Programs.CA) > -1 ||
            this.sevicesselected.indexOf(Programs.LN) > -1 ||
            this.sevicesselected.indexOf(Programs.LI) > -1 ||
            this.sevicesselected.indexOf(Programs.WN) > -1 ||
            this.sevicesselected.indexOf(Programs.WNR) > -1 ||
            this.sevicesselected.indexOf(Programs.ECA) > -1) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDPREVIOUSADDRESS,
            ]);
        }
        else {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDADDRESS,
            ]);
        }
    }
    setOrResetValidator() {
        let householdBenefits = this.service?.getBenefits() as string[];
        const fields = [{
            fieldName: 'mainContact',
            optionalProgram: ProgramConstants.HOU_CONTACT_INFO_MAIN_OPTIONAL_PROGRAMS as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'secContact',
            optionalProgram:  ProgramConstants.HOU_CONTACT_INFO_SECONDARY_OPTIONAL_PROGRAMS as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'othContact',
            optionalProgram: ProgramConstants.HOU_CONTACT_INFO_OTHER_OPTIONAL_PROGRAMS as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'email',
            optionalProgram: ProgramConstants.HOU_CONTACT_INFO_EMAIL_OPTIONAL_PROGRAMS as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'confirmEmail',
            optionalProgram: ProgramConstants.HOU_CONTACT_INFO_CONFIRMEMAIL_OPTIONAL_PROGRAMS as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'contact',
            optionalProgram: ProgramConstants.HOU_CONTACT_INFO_CONTACT_OPTIONAL_PROGRAMS as string[],
            requiredProgram: ProgramConstants.HOU_CONTACT_INFO_CONTACT_REQUIRED_PROGRAMS as string[]
        }
        ] as FormValidatorField[]
        if (householdBenefits != null && householdBenefits.length > 0) {
            const requiredOrOptionalValidatorField =
                {

                    selectedPrograms: householdBenefits,
                    requiredFields: this.requiredFields,
                    optionalFields: this.optionalFields,
                    formGroup: this.householdContInfoForm,
                    fields: fields
                } as RequiredOrOptionalValidatorField
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
            this.householdContInfoForm = requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
            this.optionalFields = [...requiredOrOptionalValidatorField.optionalFields] as any;
        }
    }
}
