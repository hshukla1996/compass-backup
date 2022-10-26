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
import { IHouseHold, IHouseHoldDetails, PageDirection } from "../../household/household-model";
import { UtilService } from "../../../shared/services/util.service";
import { Store } from "@ngrx/store";
import { State as AppState } from './../../../+state';
//import { ScreenQueueUtil } from "../income-gatepost/income-gatepost.path";
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';

@Component({
    selector: "compass-ui-income-pastjobmoredetails",
    templateUrl: "./income-pastjobmoredetails.component.html",
    styleUrls: ["./income-pastjobmoredetails.component.scss"],
    providers: [ApplyNowHouseholdHeadStrategy],
})

export class IncomePastJobMoreDetailsComponent implements OnInit {
    incomePastJobMoreDetailsForm: FormGroup | any | null;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    pastEmploymentDetailsMap!: any;
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
        this.incomePastJobMoreDetailsForm = this.fb.group({
            startDate: [""],
            endDate: [""],
            numberOfHoursWorkedPerWeek: [""],
            mostRecentPayDate: [""]
        });

        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
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
            if (
                this.currentUser?.individualIncome?.pastEmployment &&
                this.currentUser?.individualIncome.pastEmployment[fragment]
            )
                this.incomePastJobMoreDetailsForm.patchValue(
                    this.currentUser.individualIncome.pastEmployment[fragment]
                );
            this.cd.detectChanges();
        }, 100);
    }

   
    isFieldValid(field: string): boolean {
        return (
            this.incomePastJobMoreDetailsForm.get(field).status !== "VALID" &&
            this.incomePastJobMoreDetailsForm.get(field).touched
        );
    }
    OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return ''
        }

        switch (field) {
            case "startDate":
                if (this.incomePastJobMoreDetailsForm.get("startDate").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            case "endDate":
                if (this.incomePastJobMoreDetailsForm.get("endDate").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            case "mostRecentPayDate":
                if (this.incomePastJobMoreDetailsForm.get("mostRecentPayDate").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            }
        return "";
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
                        "/" + RoutePath.APPLYNOW_INCOME_PASTJOBMOREDETAILS,
                        { userId: this.currentUserIndex },
                    ]);
                });
        } else {
            this.queueService.back();
        }
        this.route.navigate([
            RoutePath.APPLYNOW +
            "/" + RoutePath.APPLYNOW_INCOME +
            "/" + RoutePath.APPLYNOW_INCOME_PASTJOBDETAILS
        ]);
    }
    goNext(): void {
        this.service.validateAllFormFields(this.incomePastJobMoreDetailsForm);
        if (this.incomePastJobMoreDetailsForm.status.toLowerCase() === "valid") {
            const existingHouseHoldDetails = this.houseHoldDetails;
            let isNextPage = false;
            this.pastEmploymentDetailsMap[this.currentUserIndex] = true;

            const existingPastEmployment = this.currentUser.individualIncome?.pastEmployment || [];

            if (existingPastEmployment.length > 0) {

                let index = 0;
                if (Number.isInteger(parseInt(this.fragment))) {
                    index = parseInt(this.fragment);
                }

                const updatedHouseholdPersons =
                    this.houseHoldDetails.houseHoldPersons?.map(
                        (person: IHouseHold) => {
                            if (person.id === this.currentUser.id) {
                                const personIndividualIncome = { ...person.individualIncome };

                                const pastIncome = personIndividualIncome.pastEmployment ? [...personIndividualIncome.pastEmployment] : []
                                pastIncome[index] = pastIncome[index] ? { ...pastIncome[index], ...this.incomePastJobMoreDetailsForm.value } : this.incomePastJobMoreDetailsForm.value
                                personIndividualIncome.pastEmployment = pastIncome;
                                const updatePerson: IHouseHold = { ...person, ...{ individualIncome: personIndividualIncome } };
                                return updatePerson;
                            }
                            return person;
                        }

                    )

                const updatedPageAction = {
                    ...existingHouseHoldDetails?.pageAction,
                    pastEmploymentDetailsMap: {
                        ...existingHouseHoldDetails?.pageAction?.pastEmploymentDetailsMap,
                        ...this.pastEmploymentDetailsMap,
                    },
                    pastEmploymentDetailsDirection: PageDirection.NEXT,
                };
                //debugger
                if (existingHouseHoldDetails)
                    this.service.updateHouseHoldDetails({
                        ...existingHouseHoldDetails,
                        ...{ pageAction: updatedPageAction },
                        ...{ houseHoldPersons: updatedHouseholdPersons },
                    });
                //sdebugger
                if (this.pastEmploymentDetailsMap != null) {
                    isNextPage = this.utilService.isNextPage(this.pastEmploymentDetailsMap);
                }
                if (isNextPage) {
                    this.utilService

                        .getCurrentUserIdPageAction(
                            this.pastEmploymentDetailsMap,
                            PageDirection.NEXT
                        )

                        .subscribe((id: any) => {
                            this.currentUserIndex = id.toString();

                            this.route.navigate([
                                RoutePath.APPLYNOW +
                                "/" + RoutePath.APPLYNOW_INCOME +
                                "/" + RoutePath.APPLYNOW_INCOME_PASTJOBDETAILS,
                                { userId: this.currentUserIndex },
                            ], { fragment: "new" });
                        });
                } else {
                    this.route.navigate([
                        RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_INCOME +
                        "/" +
                        RoutePath.APPLYNOW_INCOME_INCOMEPASTJOBSUMMARY,
                    ]);
                }
            }
        }
    }
}
