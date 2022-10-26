import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { HouseholdPrevAddress } from '../models/householdPrevAddress';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { Router } from "@angular/router";
import { AppStoreService } from "../../../app-store-service";
import { ApplyNowHouseholdPreviousAddressStrategy } from '../../../shared/route-strategies/apply-now/householdPreviousAddress';
import { IApplyNowState, Programs } from "../../+state/apply-now.models";
import { IHouseholdPreviousAddress } from "../household-model";
import { ThisReceiver } from "@angular/compiler";
import { RoutePath } from '../../../shared/route-strategies';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";


@Component({
    selector: "compass-ui-household-previous-adderss",
    templateUrl: "./household-previous-adderss.component.html",
    styleUrls: ["./household-previous-adderss.component.scss"],
    providers: [ApplyNowHouseholdPreviousAddressStrategy],
})
export class HouseholdPreviousAdderssComponent implements OnInit {
    householdPrevAddress: HouseholdPrevAddress;
    householdPrevAddressForm: FormGroup | any;
    applyNowState!: IApplyNowState;
    states: any;
    counties: any;
    data: any;
    detail: IHouseholdPreviousAddress | undefined;
    sevicesselected: Array<any> = [];
    isToolTipVisible = false;
    optionalFields = [] as string[];

    constructor(
        public householdFormDataService: HouseholdFormDataService,
        private householdPrevAdd: FormBuilder,
        private service: ApplyNowStoreService,
        private router: Router,
        private routingStrategy: ApplyNowHouseholdPreviousAddressStrategy,
        private appService: AppStoreService,
        private cd: ChangeDetectorRef
    ) {
        this.householdPrevAddress =
            householdFormDataService.householdPrevAddress;
    }

    ngOnInit(): void {
        this.householdPrevAddressForm = this.householdPrevAdd.group({
            address: [""],
            address2: [""],
            city: [""],
            state: "",
            zip: ["", [Utility.zipCodeValidator()]],
            phoneNo: ["", [Utility.phoneNumberValidator()]]
        });
        this.appService.getStates().subscribe((states) => {
            this.states = states;
            this.cd.detectChanges();
        });
        this.appService.getCounties().subscribe((c) => {
            this.counties = c;

            this.cd.detectChanges();
        });

        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
            this.data = this.applyNowState.metaData;
            this.detail = this.applyNowState.houseHoldDetails.householdPreviousAddress;
            // console.log("mailingbsb", this.detail)
            this.sevicesselected = this.applyNowState?.programSelection?.programs || [];
           
           if (this.sevicesselected.indexOf(Programs.LN) > -1 ||
               this.sevicesselected.indexOf(Programs.LI) > -1 ||
               this.sevicesselected.indexOf(Programs.WN) > -1 ||
               this.sevicesselected.indexOf(Programs.WNR) > -1) {
             this.isToolTipVisible= true;
           }
            this.householdPrevAddressForm.patchValue({
                address: this.detail?.address,
                address2: this.detail?.address2,
                city: this.detail?.city,
                state: this.detail?.state,
                zip: this.detail?.zip,
                phoneNo: this.detail?.phoneNo,

            })
            this.cd.detectChanges();
        });
         this.setOrResetValidator();
    }

    isFieldValid(field: string): boolean {
        return (
            this.householdPrevAddressForm.get(field).status !== "VALID" &&
            (this.householdPrevAddressForm.get(field).dirty ||
                this.householdPrevAddressForm.get(field).touched)
        );
    }

    checkAddress(check: any) {
        let charCode = check.charCode;
        return ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91)
                || (charCode > 96 && charCode < 123) || charCode == 35
                || charCode == 47 || charCode == 45 || charCode == 32);
    }

    checkCity(check: any) {
        let charCode = check.charCode;
        return ((charCode > 64 && charCode < 91)
                || (charCode > 96 && charCode < 123) || charCode == 92
                || charCode == 39 || charCode == 45 || charCode == 32);
    }

    OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }


    goBack() {
        this.router.navigate([this.routingStrategy.previousRoute()]);
    }
    goNext() {
        if (!this.householdPrevAddressForm.valid) return;
        const storeHouseholdPreviousAddress = this.applyNowState?.houseHoldDetails;
        const storedHouseHoldPreviousAddress = this.applyNowState?.houseHoldDetails.householdPreviousAddress;
        
        this.householdPrevAddressForm.value.state = this.householdPrevAddressForm.value.state === "" ? null : this.householdPrevAddressForm.value.state;

        const updatedHouseholdPreviousAddress = {
            ...storedHouseHoldPreviousAddress, householdPreviousAddress: this.householdPrevAddressForm.value
        }
        this.service.updateHouseHoldDetails({
            ...storeHouseholdPreviousAddress, ...updatedHouseholdPreviousAddress
        })
        if (this.sevicesselected.indexOf(Programs.CA) > -1) {
            // this.router.navigate(['RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDQUICKSNAPEND'])
            this.router.navigate([RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLIVEDINPA])

        } else {
            this.router.navigate([this.routingStrategy.nextRoute()]);
        }
    }
    setOrResetValidator() {
        let householdBenefits = this.service?.getBenefits() as string[];
        const fields = [{
            fieldName: 'address',
            optionalProgram: ProgramConstants.HOU_PREVIOUS_ADDRESS_ADDRESS_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'address2',
            optionalProgram:  ProgramConstants.HOU_PREVIOUS_ADDRESS_ADDRESS2_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'city',
            optionalProgram: ProgramConstants.HOU_PREVIOUS_ADDRESS_CITY_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'state',
            optionalProgram: ProgramConstants.HOU_PREVIOUS_ADDRESS_STATE_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'zip',
            optionalProgram: ProgramConstants.HOU_PREVIOUS_ADDRESS_ZIP_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'phoneNo',
            optionalProgram: ProgramConstants.HOU_PREVIOUS_ADDRESS_PHONE_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        }
        ] as FormValidatorField[]
        if (householdBenefits != null && householdBenefits.length > 0) {
            const requiredOrOptionalValidatorField =
                {

                    selectedPrograms: householdBenefits,
                    optionalFields: this.optionalFields,
                    formGroup: this.householdPrevAddressForm,
                    fields: fields
                } as RequiredOrOptionalValidatorField
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
            this.householdPrevAddressForm = requiredOrOptionalValidatorField.formGroup;
            this.optionalFields = [...requiredOrOptionalValidatorField.optionalFields] as any;
        }
    }
}
