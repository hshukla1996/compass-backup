import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { UtilService } from "../../../shared/services/util.service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHold, IHouseHoldDetails, IIncomeAddress, PageDirection } from "../../household/household-model";
import { RoutePath } from "../../../shared/route-strategies";
import { ScreenQueueUtil } from "../../../shared/services/screen_queue_util.service";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";


@Component({

    templateUrl: "./other-income-address.component.html",
    selector: 'compass-ui-other-income-address',
    styleUrls: ["./other-income-address.component.scss"],
})
export class OtherIncomeAddressComponent implements OnInit {

    otherIncomeAddressForm: FormGroup | any;
    states: any;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    otherIncomeDetailsMap!: any;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    applyNowState: IApplyNowState | undefined;
    fragment!: string;
    requiredFields = [] as string[];


    constructor(
        private fb: FormBuilder,
        private route: Router,
        private service: ApplyNowStoreService,
        private appService: AppStoreService,
        private activatedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private utilService: UtilService,
    ) {
    }

    ngOnInit(): void {
        this.otherIncomeAddressForm = this.fb.group({
            isDifferentAddress: [''],
            nameOfFinancialInstitution: [''],
            addressLine1: [''],
            addressline2: [''],
            city: [''],
            state: [''],
            zip: ['']
        });

        this.appService.getStates().subscribe((states) => {
            this.states = states;
            this.cd.detectChanges();
        });

        this.service.getAppData().subscribe(d => {
            this.houseHoldDetails = this.service.getHouseHoldDetails;
            if (this.houseHoldDetails.houseHoldPersons) {
                this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
            }
            this.otherIncomeDetailsMap =
                {
                    ...this.houseHoldDetails.pageAction?.otherIncomeDetailsMap,
                } || {};
            this.cd.detectChanges();
        });

        this.activatedRoute.params.
            subscribe((p) => {
                if (Object.keys(p).length === 0) {
                    this.currentUserIndex =
                        this.utilService.getCurrentUserIdOnNoParams(
                            this.otherIncomeDetailsMap
                        );

                } else {
                    this.currentUserIndex = p.userId || "";
                }

                if (this.houseHoldPersons.length > 0) {
                    this.currentUser =
                        this.service.extractUser(
                            this.houseHoldPersons,
                            this.currentUserIndex
                        ) || "";
                }
                this.cd.detectChanges();
            });

        this.activatedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "0";
            if (this.fragment !== "new") {
                this.setFormValues(this.fragment);
            }
        });
        this.setOrResetValidator();
    }

    setFormValues(fragment: any) {
        setTimeout(() => {
            const existingOtherIncome = this.currentUser?.individualIncome?.otherIncome
            if (
                existingOtherIncome &&
                existingOtherIncome.length >= fragment &&
                existingOtherIncome[fragment]) {
                if (existingOtherIncome[fragment].address != null) {
                    this.otherIncomeAddressForm.get("nameOfFinancialInstitution").patchValue(existingOtherIncome[fragment].nameOfFinancialInstitution);
                    const existingAddress = existingOtherIncome[fragment].address;
                    this.otherIncomeAddressForm.get("addressLine1").patchValue(existingAddress?.addressLine1);
                    this.otherIncomeAddressForm.get("addressline2").patchValue(existingAddress?.addressline2);
                    this.otherIncomeAddressForm.get("city").patchValue(existingAddress?.city);
                    this.otherIncomeAddressForm.get("state").patchValue(existingAddress?.state);
                    this.otherIncomeAddressForm.get("zip").patchValue(existingAddress?.zip);
                    this.otherIncomeAddressForm.get("isDifferentAddress").patchValue("Yes");
                } else {
                    this.otherIncomeAddressForm.get("isDifferentAddress").patchValue("No");
                }
            }
            this.cd.detectChanges();
        }, 100);
    }

    OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    goNext() {
        this.service.validateAllFormFields(this.otherIncomeAddressForm);
        if (this.otherIncomeAddressForm.status.toLowerCase() === "valid") {
            const existingHouseHoldDetails = this.houseHoldDetails;
            let isNextPage = false;
            this.otherIncomeDetailsMap[this.currentUserIndex] = true;
            const existingOtherIncome = this.currentUser.individualIncome?.otherIncome || [];
            if (existingOtherIncome.length > 0) {
                let otherIncomeDetails = existingOtherIncome.map((cs, i) => {
                    if (this.fragment === 'new' && i === existingOtherIncome.length - 1 && this.otherIncomeAddressForm.get("isDifferentAddress").value !== "No") {
                        return {
                            ...cs,
                            ...{ address: this.otherIncomeAddressForm.value },
                            ...{ nameOfFinancialInstitution: this.otherIncomeAddressForm.get("nameOfFinancialInstitution").value }
                        }
                    } else if (this.fragment !== 'new' && i === parseInt(this.fragment) && this.otherIncomeAddressForm.get("isDifferentAddress").value === "Yes") {
                        return {
                            ...cs,
                            ...{ address: this.otherIncomeAddressForm.value },
                            ...{ nameOfFinancialInstitution: this.otherIncomeAddressForm.get("nameOfFinancialInstitution").value }
                        }
                    } else {
                        return cs;
                    }
                });

                const updatedHouseholdPersons =
                    this.houseHoldDetails.houseHoldPersons?.map(
                        (person: IHouseHold) => {
                            if (person.id === this.currentUser.id) {
                                const personIndividualIncome = { ...person.individualIncome };
                                personIndividualIncome.otherIncome = otherIncomeDetails;
                                return { ...person, ...{ individualIncome: personIndividualIncome } };
                            } else {
                                return person;
                            }
                        }
                    );

                const updatedPageAction = {
                    ...existingHouseHoldDetails?.pageAction,
                    otherIncomeDetailsMap: {
                        ...existingHouseHoldDetails?.pageAction?.otherIncomeDetailsMap,
                        ...this.otherIncomeDetailsMap,
                    },
                    otherIncomeDetailsDirection: PageDirection.NEXT,
                };

                if (existingHouseHoldDetails)
                    this.service.updateHouseHoldDetails({
                        ...existingHouseHoldDetails,
                        ...{ pageAction: updatedPageAction },
                        ...{ houseHoldPersons: updatedHouseholdPersons },
                    });
                if (this.otherIncomeDetailsMap != null) {
                    isNextPage = this.utilService.isNextPage(this.otherIncomeDetailsMap);
                }
                if (isNextPage) {
                    this.utilService

                        .getCurrentUserIdPageAction(
                            this.otherIncomeDetailsMap,
                            PageDirection.NEXT
                        )

                        .subscribe((id: any) => {
                            this.currentUserIndex = id.toString();

                            this.route.navigate([
                                RoutePath.APPLYNOW +
                                "/" +
                                RoutePath.APPLYNOW_INCOME +
                                "/" +
                                RoutePath.APPLYNOW_INCOME_OTHERINCOME +
                                "/" +
                                RoutePath.APPLYNOW_INCOME_OTHERINCOMEDETAILS,
                                { userId: this.currentUserIndex },
                            ], { fragment: this.fragment });
                        });

                    // this.init();
                } else {
                    this.route.navigate([
                        RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_INCOME +
                        "/" +
                        RoutePath.APPLYNOW_INCOME_OTHERINCOME +
                        "/" +
                        RoutePath.APPLYNOW_INCOME_OTHERINCOMESUMMARY,
                    ]);
                }
            }
        }
    }

    goBack() {
        this.route.navigate([
            RoutePath.APPLYNOW
            + "/" + RoutePath.APPLYNOW_INCOME
            + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOME
            + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOMEDETAILS,
            { userId: this.currentUserIndex },
        ]);
    }

    setOrResetValidator() {
        let householdBenefits = this.service?.getBenefits() as string[];
        const fields = [{
            fieldName: ' isDifferentAddress',
            optionalProgram: ProgramConstants.INCOME_OTHERINCOMEADDRESS_ISDIFFERENTADDRESS_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: ' nameOfFinancialInstitution',
            optionalProgram: ProgramConstants.INCOME_OTHERINCOMEADDRESS_NAMEOFFINANCIALINSTITUTION_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'addressLine1',
            optionalProgram: ProgramConstants.INCOME_OTHERINCOMEADDRESS_ADDRESSLINE1_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: ' addressline2',
            optionalProgram: ProgramConstants.INCOME_OTHERINCOMEADDRESS_ADDRESSLINE2_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'city',
            optionalProgram: ProgramConstants.INCOME_OTHERINCOMEADDRESS_CITY_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'state',
            optionalProgram: ProgramConstants.INCOME_OTHERINCOMEADDRESS_STATE_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        },

        {
            fieldName: 'zip',
            optionalProgram: ProgramConstants.INCOME_OTHERINCOMEADDRESS_ZIP_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        },



        ] as FormValidatorField[]
        if (householdBenefits != null && householdBenefits.length > 0) {
            const requiredOrOptionalValidatorField =
                {

                    selectedPrograms: householdBenefits,
                    requiredFields: this.requiredFields,
                    formGroup: this.otherIncomeAddressForm,
                    fields: fields
                } as RequiredOrOptionalValidatorField
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
            this.otherIncomeAddressForm = requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
        }
    }
}





