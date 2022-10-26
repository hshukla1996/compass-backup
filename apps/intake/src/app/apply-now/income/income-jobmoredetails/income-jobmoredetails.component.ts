import { ChangeDetectorRef, Component, Directive, EventEmitter, OnInit, Output, } from "@angular/core";
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, AbstractControl, } from "@angular/forms";
import { ApplyNowHouseholdHeadStrategy } from "../../../shared/route-strategies/apply-now/householdHead";
import {ActivatedRoute, Router} from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
//import { HouseholdFormDataService } from "../services/household-form-data.service";
import { IApplyNowState } from "../../+state/apply-now.models";
import { delay, Observable, of } from "rxjs";
import { RoutePath } from "../../../shared/route-strategies";
import { IHouseHold, IHouseHoldDetails, PageDirection } from "../../household/household-model";
import { UtilService } from "../../../shared/services/util.service";
import { Store } from "@ngrx/store";
import { State as AppState } from './../../../+state';
//import { ScreenQueueUtil } from "../income-gatepost/income-gatepost.path";
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';

@Component({
    selector: "compass-ui-income-jobmoredetails",
    templateUrl: "./income-jobmoredetails.component.html",
    styleUrls: ["./income-jobmoredetails.component.scss"],
    providers: [ApplyNowHouseholdHeadStrategy],
})

export class IncomeJobMoreDetailsComponent implements OnInit {
    incomeJobMoreDetailsForm: FormGroup | any | null;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    currentEmploymentDetailsMap!: any;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    applyNowState: IApplyNowState | undefined;
    payList: any;
    fragment!: string;
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
    ) { }

    ngOnInit(): void {
        this.incomeJobMoreDetailsForm = this.fb.group({
            startDate: ["", Validators.required],
            onStrike: ["", Validators.required],
            onStrikeStartDate: [""],
            numberOfHoursWorkedPerWeek: ["", Validators.required],
            frequency: ["", Validators.required],
            grossIncome: ["", Validators.required],
            payRate: [""],
            mostRecentPayDate: ["", Validators.required]
        });

        this.appService.getPay().subscribe((pay) => {
            this.payList = pay;
            // console.log("relative", this.payList)
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

    }

    setFormValues(fragment: any) {
        setTimeout(() => {
            if (
                this.currentUser?.individualIncome?.currentEmployment &&
                this.currentUser?.individualIncome.currentEmployment[fragment]
            )
                this.incomeJobMoreDetailsForm.patchValue(
                    this.currentUser.individualIncome.currentEmployment[fragment]
                );
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
    
    isFieldValid(field: string): boolean {
        return (
            this.incomeJobMoreDetailsForm.get(field).status !== "VALID" &&
            this.incomeJobMoreDetailsForm.get(field).touched
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case "startDate":
                if (this.incomeJobMoreDetailsForm.get("startDate").errors?.required) {
                    return "Required Field";
                }
                if (this.incomeJobMoreDetailsForm.get("startDate").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            case "onStrike":
                if (this.incomeJobMoreDetailsForm.get("onStrike").errors?.required) {
                    return "Required Field";
                }
                break;
            case "onStrikeStartDate":
                if (this.incomeJobMoreDetailsForm.get("onStrikeStartDate").errors?.required) {
                    return "Required Field";
                }
                if (this.incomeJobMoreDetailsForm.get("onStrikeStartDate").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            case "numberOfHoursWorkedPerWeek":
                if (this.incomeJobMoreDetailsForm.get("numberOfHoursWorkedPerWeek").errors?.required) {
                    return "Required Field";
                }
                break;
            case "frequency":
                if (this.incomeJobMoreDetailsForm.get("frequency").errors?.required) {
                    return "Required Field";
                }
                break;
            case "grossIncome":
                if (this.incomeJobMoreDetailsForm.get("grossIncome").errors?.required) {
                    return "Required Field";
                }
                break;
            case "mostRecentPayDate":
                if (this.incomeJobMoreDetailsForm.get("mostRecentPayDate").errors?.required) {
                    return "Required Field";
                }
                if (this.incomeJobMoreDetailsForm.get("mostRecentPayDate").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;

            default:
                return "";
                break;
        }
        return "";
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
                        "/" + RoutePath.APPLYNOW_INCOME_JOBMOREDETAILS,
                        { userId: this.currentUserIndex },
                    ]);
                });
        } else {
            this.queueService.back();
        }
        this.route.navigate([
            RoutePath.APPLYNOW +
            "/" + RoutePath.APPLYNOW_INCOME +
            "/" + RoutePath.APPLYNOW_INCOME_JOBDETAILS
        ]);
    }

    goNext(): void {
        this.service.validateAllFormFields(this.incomeJobMoreDetailsForm);
        if (this.incomeJobMoreDetailsForm.status.toLowerCase() === "valid") {
            const existingHouseHoldDetails = this.houseHoldDetails;
            let isNextPage = false;
            this.currentEmploymentDetailsMap[this.currentUserIndex] = true;

            const existingCurrentEmployment = this.currentUser.individualIncome?.currentEmployment || [];

            if (existingCurrentEmployment.length > 0) {

                let index= 0;
              if (Number.isInteger(parseInt(this.fragment))) {
                index = parseInt(this.fragment);
              }
              this.incomeJobMoreDetailsForm.value.grossIncome = this.incomeJobMoreDetailsForm.value.grossIncome.toString();
              this.incomeJobMoreDetailsForm.value.onStrike = this.incomeJobMoreDetailsForm.value.onStrike.charAt(0);
              this.incomeJobMoreDetailsForm.value.payRate = this.incomeJobMoreDetailsForm.value.payRate.toString() || null;
                const updatedHouseholdPersons =
                    this.houseHoldDetails.houseHoldPersons?.map(
                        (person: IHouseHold) => {
                            if (person.id === this.currentUser.id) {
                                    const personIndividualIncome = { ...person.individualIncome };

                                    const currentIncome =personIndividualIncome.currentEmployment ? [...personIndividualIncome.currentEmployment] : []
                                //    currentIncome[index] = { ...currentIncome[index], ...this.incomeJobMoreDetailsForm.value }
                              currentIncome[index] = currentIncome[index] ?{ ...currentIncome[index] ,...this.incomeJobMoreDetailsForm.value} :this.incomeJobMoreDetailsForm.value
                                    personIndividualIncome.currentEmployment = currentIncome;
                                    const updatePerson:IHouseHold =  { ...person, ...{ individualIncome: personIndividualIncome } };
                                    return updatePerson;
                                }
                               //return personToBeUpdated

                                return person;
                            }

                    )

                const updatedPageAction = {
                    ...existingHouseHoldDetails?.pageAction,
                    currentEmploymentDetailsMap: {
                        ...existingHouseHoldDetails?.pageAction?.currentEmploymentDetailsMap,
                        ...this.currentEmploymentDetailsMap,
                    },
                    currentEmploymentDetailsDirection: PageDirection.NEXT,
                };

                if (existingHouseHoldDetails)
                    this.service.updateHouseHoldDetails({
                        ...existingHouseHoldDetails,
                        ...{ pageAction: updatedPageAction },
                        ...{ houseHoldPersons: updatedHouseholdPersons },
                    });
                if (this.currentEmploymentDetailsMap != null) {
                    isNextPage = this.utilService.isNextPage(this.currentEmploymentDetailsMap);
                }
                if (isNextPage) {
                    this.utilService

                        .getCurrentUserIdPageAction(
                            this.currentEmploymentDetailsMap,
                            PageDirection.NEXT
                        )

                        .subscribe((id: any) => {
                            this.currentUserIndex = id.toString();

                            this.route.navigate([
                                RoutePath.APPLYNOW +
                                "/" + RoutePath.APPLYNOW_INCOME +
                                "/" + RoutePath.APPLYNOW_INCOME_JOBDETAILS,
                                { userId: this.currentUserIndex },
                            ], { fragment: "new" });
                        });
                } else {
                    this.route.navigate([
                        RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_INCOME +
                        "/" +
                        RoutePath.APPLYNOW_INCOME_INCOMEJOBSUMMARY,
                    ]);
                }
            }
        }

    }


}
