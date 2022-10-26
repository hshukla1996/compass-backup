import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import { AppStoreService } from "../../../app-store-service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import {
    IAlimony,
    IHouseHold,
    IHouseHoldDetails,
    PageDirection,
} from "../../household/household-model";
import { UtilService } from "../../../shared/services/util.service";
import { AppPageActions } from "../../../+state/actions";
import { select, Store } from "@ngrx/store";
import { State as AppState } from "../../../+state";
import * as AppSelectors from "../../../+state/app.selectors";
import { ScreenQueueUtil } from "./../expenses-gatepost/expenses-gatepost.paths";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
import {
    FormValidatorField,
    RequiredOrOptionalValidatorField,
    Utility,
} from "../../../shared/utilities/Utility";

@Component({
    selector: "ui-compass-alimony-expenses-details",
    templateUrl: "./alimony-expenses-details.component.html",
    styleUrls: ["./alimony-expenses-details.component.css"],
})
export class AlmonyExpDlsComponent implements OnInit {
    almonyExpDlsCmpForm: FormGroup | any | null;
    daysData: any;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    alimonyMap!: any;
    fragment!: string;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    requiredFields = [] as string[];
    fieldDisplays: any = {};
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private cd: ChangeDetectorRef,
        private appService: AppStoreService,
        private service: ApplyNowStoreService,
        private utilService: UtilService,
        private activedRoute: ActivatedRoute,
        private queueService: ScreenQueueUtil
    ) {}

    ngOnInit() {
        this.almonyExpDlsCmpForm = this.fb.group({
            amountActuallyPaid: [""],
            frequency: [""],
        });
        this.almonyExpDlsCmpForm.reset();
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        this.alimonyMap =
            {
                ...this.houseHoldDetails.pageAction?.alimonyMap,
            } || {};
        this.activedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "";
            if (this.fragment !== "new") this.setFormValues(this.fragment);
        });
        this.activedRoute.params.subscribe((p) => {
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.alimonyMap
                    );
            } else {
                this.currentUserIndex = p.userId || "";
            }
            if (this.houseHoldPersons.length > 0)
                this.currentUser =
                    this.service.extractUser(
                        this.houseHoldPersons,
                        this.currentUserIndex
                    ) || "";
            this.setProgramFieldValidation(this.currentUser);
            this.cd.detectChanges();
        });
        this.appService.getPay().subscribe((pay) => {
            this.daysData = pay;
            this.cd.detectChanges();
        });
    }

    setProgramFieldValidation(currentUser: IHouseHold) {
        let householdBenefits = this.service?.getAppliedBenefitsForIndividual(
            currentUser
        ) as string[];
        const fields = [
            {
                fieldName: "amountActuallyPaid",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.CI,
                    INDIVIDUAL_PROGRAMS.CIR,
                ],
            },
            {
                fieldName: "frequency",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.CI,
                    INDIVIDUAL_PROGRAMS.CIR,
                ],
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
        if (householdBenefits != null && householdBenefits.length > 0) {
            const requiredOrOptionalValidatorField = {
                selectedPrograms: householdBenefits,
                requiredFields: [],
                formGroup: this.almonyExpDlsCmpForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.almonyExpDlsCmpForm =
                requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
        
    }

    setFormValues(fragment: any) {
        setTimeout(() => {
            if (
                this.currentUser.expense?.alimonyExpenses &&
                this.currentUser.expense?.alimonyExpenses[fragment]
            )
                this.almonyExpDlsCmpForm.patchValue(
                    this.currentUser.expense.alimonyExpenses[fragment]
                );
            this.cd.detectChanges();
        }, 100);
    }
    get f() {
        return this.almonyExpDlsCmpForm.controls;
    }
    isFieldValid(field: string): boolean {
        if (this.almonyExpDlsCmpForm.get(field).status !== "VALID") {
            //console.log("invalid");
            //console.log(field);
            //console.log(this.almonyExpDlsCmpForm.get(field).touched);
        }
        return (
            this.almonyExpDlsCmpForm.get(field).status !== "VALID" &&
            this.almonyExpDlsCmpForm.get(field).touched
        );
    }
    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case "amountActuallyPaid":
                if (
                    this.almonyExpDlsCmpForm.get("amountActuallyPaid").errors
                        .required
                ) {
                    return "How much is paid is required.";
                }
                break;
            case "frequency":
                if (this.almonyExpDlsCmpForm.get("frequency").errors.required) {
                    return "How often is required.";
                }
                break;
            default:
                return "";
                break;
        }

        return "";
    }
    onSubmit() {
        this.service.validateAllFormFields(this.almonyExpDlsCmpForm);
        if (this.almonyExpDlsCmpForm.status.toLowerCase() === "valid") {
            let isNextPage = false;
            this.alimonyMap[this.currentUserIndex] = true;
            const storedHouseholdDetails = this.service.getHouseHoldDetails;

            const storedAlimonyExpenses =
                this.currentUser.expense?.alimonyExpenses || [];
            //iterantive over absent relatives , find the current from the absent relvative map and update address
            let currentAlimonyExpenses: IAlimony[];
            if (Number.isInteger(parseInt(this.fragment))) {
                currentAlimonyExpenses = storedAlimonyExpenses.map((cs, i) => {
                    if (i === parseInt(this.fragment)) {
                        return this.almonyExpDlsCmpForm.value;
                    } else {
                        return cs;
                    }
                });
            } else {
                currentAlimonyExpenses = [
                    ...storedAlimonyExpenses,
                    ...[this.almonyExpDlsCmpForm.value],
                ];
            }
            const updatedHouseholdPersons =
                this.service.getHouseHoldDetails.houseHoldPersons?.map(
                    (person: IHouseHold) => {
                        const personToBeUpdated = { ...person };
                        const storedExpense = person.expense;
                        if (
                            person.id?.toString() ===
                            this.currentUser.id?.toString()
                        ) {
                            personToBeUpdated.expense = {
                                ...storedExpense,
                                alimonyExpenses: currentAlimonyExpenses,
                            };
                        }
                        return personToBeUpdated;
                    }
                );
            const updatedPageAction = {
                ...storedHouseholdDetails?.pageAction,
                childSupport: {
                    ...storedHouseholdDetails?.pageAction?.alimonyMap,
                    ...this.alimonyMap,
                },
                childSupportDirection: PageDirection.NEXT,
            };
            if (storedHouseholdDetails)
                this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ pageAction: updatedPageAction },
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });

            this.almonyExpDlsCmpForm.reset();
            if (this.alimonyMap != null) {
                isNextPage = this.utilService.isNextPage(this.alimonyMap);
            }
            if (isNextPage && !Number.isInteger(parseInt(this.fragment))) {
                this.utilService

                    .getCurrentUserIdPageAction(
                        this.alimonyMap,
                        PageDirection.NEXT
                    )

                    .subscribe((id: any) => {
                        this.currentUserIndex = id.toString();

                        this.route.navigate([
                            RoutePath.APPLYNOW +
                                "/" +
                                RoutePath.APPLYNOW_EXPENSES +
                                "/" +
                                RoutePath.APPLYNOW_ALIMONY_EXPENSES_DETAILS,
                            { userId: this.currentUserIndex },
                        ]);
                    });

                // this.init();
            } else {
                this.route.navigate([
                    RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_EXPENSES +
                        "/" +
                        RoutePath.APPLYNOW_ALIMONY_EXPENSES_SUMMARY,
                ]);
            }
        }
    }

    previous(): void {
        this.alimonyMap[this.currentUserIndex] = false;
        const storeHouseholdDetails = this.houseHoldDetails;
        const updatedPageAction = {
            alimonyMap: {
                ...storeHouseholdDetails.pageAction?.alimonyMap,
                ...this.alimonyMap,
            },
            alimonyDirection: PageDirection.NEXT,
        };

        this.service.updateHouseHoldDetails({
            ...storeHouseholdDetails,
            ...{ pageAction: updatedPageAction },
        });

        if (
            Object.keys(this.alimonyMap)[0].toString() !==
                this.currentUserIndex.toString() &&
            !Number.isInteger(parseInt(this.fragment))
        ) {
            this.utilService
                .getCurrentUserIdPageAction(this.alimonyMap, PageDirection.BACK)
                .subscribe((id: any) => {
                    this.currentUserIndex = id.toString();
                    this.route.navigate([
                        RoutePath.APPLYNOW +
                            "/" +
                            RoutePath.APPLYNOW_EXPENSES +
                            "/" +
                            RoutePath.APPLYNOW_ALIMONY_EXPENSES_DETAILS,
                        { userId: this.currentUserIndex },
                    ]);
                });
        } else {
            this.queueService.back();
        }
    }
}
