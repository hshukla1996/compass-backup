import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import { AppStoreService } from "../../../app-store-service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import {
    IChildAdultCare,
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
    selector: "ui-compass-child-or-adult-care-expenses-details",
    templateUrl: "./child-or-adult-care-expenses-details.component.html",
    styleUrls: ["./child-or-adult-care-expenses-details.component.css"],
})
export class CldOradultExpDlsComponent implements OnInit {
    cldOradultExpDlsCmpForm: FormGroup | any | null;
    daysData: any;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    fragment!: string;
    paidFor!: string;
    adultCareMap!: any;
    requiredFields = [] as string[];
    fieldDisplays: any = {};
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
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
        this.cldOradultExpDlsCmpForm = this.fb.group({
            isCareExpensesPaidForWork: [""],
            jobPaidFor: [""],
            careReceivedBy: [""],
            careExpensesAmount: [""],
            careExpensesFrequency: [""],
        });


        this.activedRoute.params.subscribe((p) => {
          this.cldOradultExpDlsCmpForm.reset();
          this.houseHoldDetails = this.service.getHouseHoldDetails;
          if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
          }
          this.adultCareMap = {
            ...this.houseHoldDetails.pageAction.adultCareMap,
          };
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.adultCareMap
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
          this.activedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "";
            if (this.fragment !== "new") this.setFormValues(this.fragment);
          });
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
        console.log("householdBenefits");
        console.log(householdBenefits);
        const fields = [
            {
                fieldName: "isCareExpensesPaidForWork",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.CI,
                    INDIVIDUAL_PROGRAMS.CIR,
                ],
            },
            {
                fieldName: "jobPaidFor",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.CI,
                    INDIVIDUAL_PROGRAMS.CIR,
                ],
            },
            {
                fieldName: "careReceivedBy",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.FSR,
                ],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.ABR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                ],
            },
            {
                fieldName: "careExpensesAmount",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.FSR,
                ],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.ABR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                ],
            },
            {
                fieldName: "careExpensesFrequency",
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
                formGroup: this.cldOradultExpDlsCmpForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.cldOradultExpDlsCmpForm =
                requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
    }

    setFormValues(fragment: any) {
      let updatedFragment = parseInt(fragment) || 0;
      if (!fragment && this.currentUser.expense?.childOrAdultCareExpenses) {
        updatedFragment =
          this.currentUser.expense?.childOrAdultCareExpenses?.length-1;
      }
      if(updatedFragment === -1){
        updatedFragment = 0;
      }


        setTimeout(() => {
      //    alert( JSON.stringify(this.currentUser.expense))
          if (
                this.currentUser.expense?.childOrAdultCareExpenses &&
                this.currentUser.expense?.childOrAdultCareExpenses[updatedFragment]
            ) {

            this.cldOradultExpDlsCmpForm.patchValue(
                this.currentUser.expense?.childOrAdultCareExpenses[updatedFragment]
              );
                 }
            this.cd.detectChanges();
        }, 100);
    }
    get f() {
        return this.cldOradultExpDlsCmpForm.controls;
    }
    //
    public inputValidator(event: any) {
        const pattern = /^[0-9]*$/;
        if (!pattern.test(event.target.value)) {
            event.target.value = event.target.value.replace(/[^0-9]/g, "");
        }
        if (event.target.value == 0) {
            event.target.value = event.target.value.replace(
                event.target.value,
                ""
            );
        }
        if (event.target.value > 12) {
            event.target.value = event.target.value.replace(
                event.target.value,
                event.target.value.slice(0, 1)
            );
        }
    }

    expensesPaidFor(paidFor: any) {
        this.paidFor = paidFor;
    }
    isFieldValid(field: string): boolean {
        if (this.cldOradultExpDlsCmpForm.get(field).status !== "VALID") {
            //console.log("invalid");
            //console.log(field);
            //console.log(this.cldOradultExpDlsCmpForm.get(field).touched);
        }
        return (
            this.cldOradultExpDlsCmpForm.get(field).status !== "VALID" &&
            this.cldOradultExpDlsCmpForm.get(field).touched
        );
    }
    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case "isCareExpensesPaidForWork":
                if (
                    this.cldOradultExpDlsCmpForm.get(
                        "isCareExpensesPaidForWork"
                    ).errors.required
                ) {
                    return "This field is required.";
                }
                break;
            case "careReceivedBy":
                if (
                    this.cldOradultExpDlsCmpForm.get("careReceivedBy").errors
                        .required
                ) {
                    return "No one is selected from the dropdown.";
                }
                break;
            case "careExpensesAmount":
                if (
                    this.cldOradultExpDlsCmpForm.get("careExpensesAmount")
                        .errors.required
                ) {
                    return "No amount is entered";
                }
                break;
            default:
                return "";
                break;
        }

        return "";
    }
    onSubmit() {
        this.service.validateAllFormFields(this.cldOradultExpDlsCmpForm);
        console.log(this.cldOradultExpDlsCmpForm);
        if (this.cldOradultExpDlsCmpForm.status.toLowerCase() === "valid") {
            let isNextPage = false;
            this.adultCareMap[this.currentUserIndex] = true;
            const storedHouseholdDetails = this.service.getHouseHoldDetails;

            const storedChildOrAdultExpenses =
                this.currentUser.expense?.childOrAdultCareExpenses || [];
            //iterantive over absent relatives , find the current from the absent relvative map and update address
            let currentChildAdultExpenses: IChildAdultCare[];
            if (Number.isInteger(parseInt(this.fragment))) {
                currentChildAdultExpenses = storedChildOrAdultExpenses.map(
                    (cs, i) => {
                        if (i === parseInt(this.fragment)) {
                            return this.cldOradultExpDlsCmpForm.value;
                        } else {
                            return cs;
                        }
                    }
                );
            } else {
                currentChildAdultExpenses = [
                    ...storedChildOrAdultExpenses,
                    ...[this.cldOradultExpDlsCmpForm.value],
                ];
            }
            const updatedHouseholdPersons =
                storedHouseholdDetails.houseHoldPersons?.map(
                    (person: IHouseHold) => {
                        const personToBeUpdated = { ...person };
                        const storedExpense = person.expense;
                        if (
                            person.id?.toString() ===
                            this.currentUser.id?.toString()
                        ) {
                            personToBeUpdated.expense = {
                                ...storedExpense,
                                childOrAdultCareExpenses:
                                    currentChildAdultExpenses,
                            };
                        }
                        return personToBeUpdated;
                    }
                );
            const updatedPageAction = {
                ...storedHouseholdDetails?.pageAction,
                adultCareMap: {
                    ...storedHouseholdDetails?.pageAction?.adultCareMap,
                    ...this.adultCareMap,
                },
                adultCareDirection: PageDirection.NEXT,
            };
            if (storedHouseholdDetails)
                this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ pageAction: updatedPageAction },
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });

            this.cldOradultExpDlsCmpForm.reset();
            if (this.adultCareMap != null) {
                isNextPage = this.utilService.isNextPage(this.adultCareMap);
            }
            if (isNextPage && !Number.isInteger(this.fragment)) {
                this.utilService

                    .getCurrentUserIdPageAction(
                        this.adultCareMap,
                        PageDirection.NEXT
                    )

                    .subscribe((id: any) => {
                        this.currentUserIndex = id.toString();

                        this.route.navigate([
                            RoutePath.APPLYNOW +
                                "/" +
                                RoutePath.APPLYNOW_EXPENSES +
                                "/" +
                                RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_DETAILS,
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
                        RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_SUMMARY,
                ]);
            }
        }
    }
    previous(): void {
        this.adultCareMap[this.currentUserIndex] = false;
        const storeHouseholdDetails = this.houseHoldDetails;
        const updatedPageAction = {
            adultCareMap: {
                ...storeHouseholdDetails.pageAction?.adultCareMap,
                ...this.adultCareMap,
            },
            adultCareDirection: PageDirection.NEXT,
        };

        this.service.updateHouseHoldDetails({
            ...storeHouseholdDetails,
            ...{ pageAction: updatedPageAction },
        });

        if (
            Object.keys(this.adultCareMap)[0].toString() !==
                this.currentUserIndex.toString() &&
            !Number.isInteger(parseInt(this.fragment))
        ) {
            this.utilService
                .getCurrentUserIdPageAction(
                    this.adultCareMap,
                    PageDirection.BACK
                )
                .subscribe((id: any) => {
                    this.currentUserIndex = id.toString();
                    this.route.navigate([
                        RoutePath.APPLYNOW +
                            "/" +
                            RoutePath.APPLYNOW_EXPENSES +
                            "/" +
                            RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_DETAILS,
                        { userId: this.currentUserIndex },
                    ]);
                });
        } else {
          this.route.navigate([
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_EXPENSES +
            "/" +
            RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES,
          ]);
        }
    }
}
