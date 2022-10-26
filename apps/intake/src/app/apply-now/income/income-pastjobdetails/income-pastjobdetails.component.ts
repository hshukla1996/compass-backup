import { ChangeDetectorRef, Component, Directive, EventEmitter, OnInit, Output, } from "@angular/core";
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, AbstractControl, } from "@angular/forms";
import { ApplyNowHouseholdHeadStrategy } from "../../../shared/route-strategies/apply-now/householdHead";
import {ActivatedRoute, Router} from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
//import { HouseholdFormDataService } from "../services/household-form-data.service";
import { IApplyNowState } from "../../+state/apply-now.models";
import { delay, of } from "rxjs";
import { RoutePath } from "../../../shared/route-strategies";
import { IHouseHold, IHouseHoldDetails, IPastEmploymentDetails, PageDirection } from "../../household/household-model";
import { UtilService } from "../../../shared/services/util.service";
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { State as AppState } from './../../../+state';
import { Store } from "@ngrx/store";

@Component({
    selector: "compass-ui-income-pastjobdetails",
    templateUrl: "./income-pastjobdetails.component.html",
    styleUrls: ["./income-pastjobdetails.component.scss"],
    //providers: [ApplyNowHouseholdHeadStrategy],
})

export class IncomePastJobDetailsComponent implements OnInit {
    incomePastJobDetailsForm: FormGroup | any | null;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    states: any;
    pastEmploymentDetailsMap!: any;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    applyNowState: IApplyNowState | undefined;
    fragment!: string;
    payList: any;
    maxDateRange = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().slice(0, 10);

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
        this.incomePastJobDetailsForm = this.fb.group({
            name: ['', Validators.required],
            addressLine1: ['', Validators.required],
            addressline2: [''],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required],
            phoneNumber: [''],
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
            this.pastEmploymentDetailsMap =
                {
                    ...this.houseHoldDetails.pageAction?.pastEmploymentDetailsMap,
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
                            this.pastEmploymentDetailsMap
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
         
    }

    setFormValues(fragment: any) {

        setTimeout(() => {
            const index = parseInt(fragment);
            if (fragment && this.currentUser?.individualIncome?.pastEmployment) {
                const existingPastEmployment = this.currentUser?.individualIncome?.pastEmployment[index]
                {
                    this.incomePastJobDetailsForm.get("name").patchValue(existingPastEmployment.name);
                    const existingAddress = existingPastEmployment.address;
                    this.incomePastJobDetailsForm.get("addressLine1").patchValue(existingAddress?.addressLine1);
                    this.incomePastJobDetailsForm.get("addressline2").patchValue(existingAddress?.addressline2);
                    this.incomePastJobDetailsForm.get("city").patchValue(existingAddress?.city);
                    this.incomePastJobDetailsForm.get("state").patchValue(existingAddress?.state);
                    this.incomePastJobDetailsForm.get("zip").patchValue(existingAddress?.zip);
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
    
    isFieldValid(field: string): boolean {
        return (
            this.incomePastJobDetailsForm.get(field).status !== "VALID" &&
            this.incomePastJobDetailsForm.get(field).touched
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case "name":
                if (this.incomePastJobDetailsForm.get("name").errors?.required) {
                    return "Required Field";
                }
                break;
            case "addressLine1":
                if (this.incomePastJobDetailsForm.get("addressLine1").errors?.required) {
                    return "Address is required.";
                }
                break;
            case "city":
                if (this.incomePastJobDetailsForm.get("city").errors?.required) {
                    return "City is required.";
                }
                break;
            case "state":
                if (this.incomePastJobDetailsForm.get("state").errors?.required) {
                    return "State is required.";
                }
                break;
            case "zip":
                if (this.incomePastJobDetailsForm.get("zip").errors?.required) {
                    return "Zipcode is required.";
                }
                break;

            default:
                return "";
                break;
        }
        return "";
    }

    OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    checkCity(check: any) {
        let charCode = check.charCode;
        return ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)
            || charCode == 39 || charCode == 92 || charCode == 45);
    }

    goNext(): void {
        this.service.validateAllFormFields(this.incomePastJobDetailsForm);
        if (this.incomePastJobDetailsForm.status.toLowerCase() === "valid") {
            const existingHouseHoldDetails = this.houseHoldDetails;

            let index = 0
            if (Number.isInteger(parseInt(this.fragment))) {
                index = parseInt(this.fragment);
            }
            else {
                index = this.currentUser?.individualIncome?.pastEmployment?.length || 0;
            }
            const modifiedFormObj = {
                name: this.incomePastJobDetailsForm.get('name').value,
                address: {
                    addressLine1: this.incomePastJobDetailsForm.get('addressLine1').value,
                    addressline2: this.incomePastJobDetailsForm.get('addressline2').value,
                    city: this.incomePastJobDetailsForm.get('city').value,
                    state: this.incomePastJobDetailsForm.get('state').value,
                    zip: this.incomePastJobDetailsForm.get('zip').value,
                },
                phoneNumber: this.incomePastJobDetailsForm.get('phoneNumber').value
            }

            const updatedHouseholdPersons =
                this.houseHoldDetails.houseHoldPersons?.map(
                    (person: IHouseHold) => {
                        if (person.id === this.currentUser.id) {
                            const personIndividualIncome = { ...person.individualIncome };

                            const pastIncome = personIndividualIncome.pastEmployment ? [...personIndividualIncome.pastEmployment] : []
                            pastIncome[index] = pastIncome[index] ? { ...pastIncome[index], ...modifiedFormObj } : modifiedFormObj
                            personIndividualIncome.pastEmployment = pastIncome;

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
                RoutePath.APPLYNOW_INCOME_PASTJOBMOREDETAILS,
                { userId: this.currentUserIndex }], { fragment: this.fragment });

        }

    }

    goBack(): void {
        this.pastEmploymentDetailsMap[this.currentUserIndex] = false;
        const storeHouseholdDetails = this.houseHoldDetails;
        const updatedPageAction = {
            pastEmploymentDetailsMap: {
                ...storeHouseholdDetails.pageAction?.pastEmploymentDetailsMap,
                ...this.pastEmploymentDetailsMap,
            },
            pastEmploymentDetailsDirection: PageDirection.NEXT,
        };

        this.service.updateHouseHoldDetails({
            ...storeHouseholdDetails,
            ...{ pageAction: updatedPageAction },
        });

        if (
            Object.keys(this.pastEmploymentDetailsMap)[0].toString() !==
            this.currentUserIndex.toString()
        ) {
            this.utilService
                .getCurrentUserIdPageAction(this.pastEmploymentDetailsMap, PageDirection.BACK)
                .subscribe((id: any) => {
                    this.currentUserIndex = id.toString();
                    this.route.navigate([
                        RoutePath.APPLYNOW +
                        "/" + RoutePath.APPLYNOW_INCOME +
                        "/" + RoutePath.APPLYNOW_INCOME_PASTJOBDETAILS,
                        { userId: this.currentUserIndex },
                    ]);
                });
        } else {
            this.queueService.back();
        }

        this.route.navigate([
            RoutePath.APPLYNOW +
            "/" + RoutePath.APPLYNOW_INCOME +
            "/" + RoutePath.APPLYNOW_INCOME_PASTJOB
        ]);

    }
   
}
