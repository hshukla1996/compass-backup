import { ChangeDetectorRef, Component, Directive, EventEmitter, OnInit, Output, } from "@angular/core";
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, AbstractControl, } from "@angular/forms";
import { ApplyNowHouseholdHeadStrategy } from "../../../shared/route-strategies/apply-now/householdHead";
import { ActivatedRoute, Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
//import { HouseholdFormDataService } from "../services/household-form-data.service";
import { IApplyNowState } from "../../+state/apply-now.models";
import { delay, of } from "rxjs";
import { RoutePath } from "../../../shared/route-strategies";
import { ICurrentEmploymentDetails, IHouseHold, IHouseHoldDetails, PageDirection } from "../../household/household-model";
import { UtilService } from "../../../shared/services/util.service";
import { Store } from "@ngrx/store";
import { State as AppState } from './../../../+state';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
//import { ScreenQueueUtil } from '../income-gatepost/income-gatepost.path';
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";

@Component({
    selector: "compass-ui-income-jobdetails",
    templateUrl: "./income-jobdetails.component.html",
    styleUrls: ["./income-jobdetails.component.scss"],
    ///providers: [ApplyNowHouseholdHeadStrategy],
})

export class IncomeJobDetailsComponent implements OnInit {
    incomeJobDetailsForm: FormGroup | any | null;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    states: any;
    currentEmploymentDetailsMap!: any;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    applyNowState: IApplyNowState | undefined;
    fragment!: string;
    payList: any;
    maxDateRange = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().slice(0, 10);
    today = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
    requiredFields = [] as string[];

    constructor(
        private fb: FormBuilder,
        private route: Router,
        private service: ApplyNowStoreService,
        private appService: AppStoreService,
        private activatedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private utilService: UtilService,
        private appstore: Store<AppState>,
        private queueService: ScreenQueueUtil
    ) {

    }

    ngOnInit(): void {
        this.incomeJobDetailsForm = this.fb.group({
            isSelfEmployment: [""],
            name: [""],
            addressLine1: [""],
            addressline2: [""],
            city: [""],
            state: [""],
            zip: [""],
            phoneNumber: [""],
        });

        this.appService.getStates().subscribe((states) => {
            this.states = states;
            this.cd.detectChanges();
        });

        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
            this.houseHoldDetails = this.service.getHouseHoldDetails;
            if (this.houseHoldDetails.houseHoldPersons) {
                this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
            }
            this.currentEmploymentDetailsMap =
                {
                    ...this.houseHoldDetails.pageAction?.currentEmploymentDetailsMap,
                } || {};
            this.cd.detectChanges();
        });

        this.activatedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "0";
            if (this.fragment !== "new") this.setFormValues(this.fragment);
        });

        this.activatedRoute.params.
            subscribe((p) => {
                if (Object.keys(p).length === 0) {
                    this.currentUserIndex =
                        this.utilService.getCurrentUserIdOnNoParams(
                            this.currentEmploymentDetailsMap
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
        this.setOrResetValidator();
    }

    setFormValues(fragment: any) {

        setTimeout(() => {
            const index = parseInt(fragment);
            if (fragment && this.currentUser?.individualIncome?.currentEmployment) {
                const existingCurrentEmployment = this.currentUser?.individualIncome?.currentEmployment[index]
                {
                    this.incomeJobDetailsForm.get("name").patchValue(existingCurrentEmployment.name);
                    const existingAddress = existingCurrentEmployment.address;
                    this.incomeJobDetailsForm.get("addressLine1").patchValue(existingAddress?.addressLine1);
                    this.incomeJobDetailsForm.get("addressline2").patchValue(existingAddress?.addressline2);
                    this.incomeJobDetailsForm.get("city").patchValue(existingAddress?.city);
                    this.incomeJobDetailsForm.get("state").patchValue(existingAddress?.state);
                    this.incomeJobDetailsForm.get("zip").patchValue(existingAddress?.zip);
                    this.incomeJobDetailsForm.get("isSelfEmployment").patchValue(existingCurrentEmployment.isSelfEmployment === "Y" ? "Yes" : "No");
                }
            }
            this.cd.detectChanges();
        }, 100);

    }

    checkAddress(check: any) {
        let charCode = check.charCode;
        return ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91)
            || (charCode > 96 && charCode < 123) || charCode == 39 || charCode == 35
            || charCode == 46 || charCode == 92 || charCode == 45 || charCode == 44
            || charCode == 38 || charCode == 40 || charCode == 41 || charCode == 47);
    }

    checkCity(check: any) {
        let charCode = check.charCode;
        return ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)
            || charCode == 39 || charCode == 92 || charCode == 45);
    }

    OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    isFieldValid(field: string): boolean {
        const formField = this.incomeJobDetailsForm.get(field);
        return (
            formField &&
            this.incomeJobDetailsForm.get(field).status !== "VALID" &&
            this.incomeJobDetailsForm.get(field).touched
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case "isSelfEmployment":
                if (this.incomeJobDetailsForm.get("isSelfEmployment").errors.required) {
                    return "Required Field";
                }
                break;
            case "name":
                if (this.incomeJobDetailsForm.get("name").errors.required) {
                    return "Required Field";
                }
                break;
            case "addressLine1":
                if (this.incomeJobDetailsForm.get("addressLine1").errors.required) {
                    return "No street address is entered";
                }
                break;
            case "city":
                if (this.incomeJobDetailsForm.get("city").errors.required) {
                    return "No city is entered";
                }
                break;
            case "state":
                if (this.incomeJobDetailsForm.get("state").errors.required) {
                    return "No state is selected from the dropdown";
                }
                break;
            case "zip":
                if (this.incomeJobDetailsForm.get("zip").errors.required) {
                    return "No zip code is entered";
                }
                break;

            default:
                return "";
                break;
        }
        return "";
    }


    goNext(): void {
        this.service.validateAllFormFields(this.incomeJobDetailsForm);
        //debugger
        if (this.incomeJobDetailsForm.status.toLowerCase() === "valid") {

            const existingHouseHoldDetails = this.houseHoldDetails;


            let index = 0
            if (Number.isInteger(parseInt(this.fragment))) {
                index = parseInt(this.fragment);
            }
            else {
                index = this.currentUser?.individualIncome?.currentEmployment?.length || 0;
            }
            const modifiedFormObj = {
                isSelfEmployment: this.incomeJobDetailsForm.get('isSelfEmployment').value.charAt(0),
                name: this.incomeJobDetailsForm.get('name').value,
                address: {
                    addressLine1: this.incomeJobDetailsForm.get('addressLine1').value,
                    addressline2: this.incomeJobDetailsForm.get('addressline2').value,
                    city: this.incomeJobDetailsForm.get('city').value,
                    state: this.incomeJobDetailsForm.get('state').value,
                    zip: this.incomeJobDetailsForm.get('zip').value,
                },
                phoneNumber: this.incomeJobDetailsForm.get('phoneNumber').value
            }
            const updatedHouseholdPersons =
                this.houseHoldDetails.houseHoldPersons?.map(
                    (person: IHouseHold) => {
                        if (person.id === this.currentUser.id) {
                            const personIndividualIncome = { ...person.individualIncome };

                            const currentIncome = personIndividualIncome.currentEmployment ? [...personIndividualIncome.currentEmployment] : []
                            currentIncome[index] = currentIncome[index] ? { ...currentIncome[index], ...modifiedFormObj } : modifiedFormObj
                            personIndividualIncome.currentEmployment = currentIncome;

                            return { ...person, ...{ individualIncome: personIndividualIncome } };
                        } else {
                            return person;
                        }
                    }
                );

            if (existingHouseHoldDetails)
                this.service.updateHouseHoldDetails({
                    ...existingHouseHoldDetails,
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });
            this.route.navigate([
                RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INCOME +
                "/" +
                RoutePath.APPLYNOW_INCOME_JOBMOREDETAILS,
                { userId: this.currentUserIndex }], { fragment: index.toString() });

        }

    }
    goBack(): void {
        this.currentEmploymentDetailsMap[this.currentUserIndex] = false;
        const storeHouseholdDetails = this.houseHoldDetails;
        const updatedPageAction = {
            currentEmploymentDetailsMap: {
                ...storeHouseholdDetails.pageAction?.currentEmploymentDetailsMap,
                ...this.currentEmploymentDetailsMap,
            },
            currentEmploymentDetailsDirection: PageDirection.NEXT,
        };

        this.service.updateHouseHoldDetails({
            ...storeHouseholdDetails,
            ...{ pageAction: updatedPageAction },
        });

        if (
            Object.keys(this.currentEmploymentDetailsMap)[0].toString() !==
            this.currentUserIndex.toString()
        ) {
            this.utilService
                .getCurrentUserIdPageAction(this.currentEmploymentDetailsMap, PageDirection.BACK)
                .subscribe((id: any) => {
                    this.currentUserIndex = id.toString();
                    this.route.navigate([
                        RoutePath.APPLYNOW +
                        "/" + RoutePath.APPLYNOW_INCOME +
                        "/" + RoutePath.APPLYNOW_INCOME_JOBDETAILS,
                        { userId: this.currentUserIndex },
                    ]);
                });
        } else {
            this.queueService.back();
        }

        this.route.navigate([
            RoutePath.APPLYNOW +
            "/" + RoutePath.APPLYNOW_INCOME +
            "/" + RoutePath.APPLYNOW_INCOME_FUTUREJOB
        ]);

    }

    setOrResetValidator() {
        let householdBenefits = this.service?.getBenefits() as string[];
        const fields = [{
            fieldName: 'isSelfEmployment',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.INCOME_CURRENTJOB_ISSELFEMPLOYMENT_REQUIRED_PROGRAM as string[]
        },
        {
            fieldName: 'name',
            optionalProgram: ProgramConstants.INCOME_CURRENTJOB_EMPLOYERNAME_OPTIONAL_PROGRAM as string[],
            requiredProgram: ProgramConstants.INCOME_CURRENTJOB_EMPLOYERNAME_REQUIRED_PROGRAM as string[]
        },
        {
            fieldName: 'addressLine1',
            optionalProgram: ProgramConstants.INCOME_CURRENTJOB_STREETADDRESS1_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'addressLine2',
            optionalProgram: ProgramConstants.INCOME_CURRENTJOB_STREETADDRESS2_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'city',
            optionalProgram: ProgramConstants.INCOME_CURRENTJOB_CITY_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'state',
            optionalProgram: ProgramConstants.INCOME_CURRENTJOB_STATE_OPTIONAL_PROGRAM as string[],
            requiredProgram: ProgramConstants.INCOME_CURRENTJOB_STATE_REQUIRED_PROGRAM as string[]
        },
        {
            fieldName: 'zip',
            optionalProgram: ProgramConstants.INCOME_CURRENTJOB_ZIP_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'phoneNumber',
            optionalProgram: ProgramConstants.INCOME_CURRENTJOB_PHONE_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        }
        ] as FormValidatorField[]
        if (householdBenefits != null && householdBenefits.length > 0) {
            const requiredOrOptionalValidatorField =
                {

                    selectedPrograms: householdBenefits,
                    requiredFields: this.requiredFields,
                    formGroup: this.incomeJobDetailsForm,
                    fields: fields
                } as RequiredOrOptionalValidatorField
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
            this.incomeJobDetailsForm = requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
        }
    }
}
