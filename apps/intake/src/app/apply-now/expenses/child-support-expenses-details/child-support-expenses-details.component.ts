import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import { AppStoreService } from "../../../app-store-service";
import {IChildSupportExpenses, IHouseHold, IHouseHoldDetails, PageDirection} from "../../household/household-model";
import {ApplyNowStoreService} from "../../apply-now-store-service";
import { ScreenQueueUtil } from "./../expenses-gatepost/expenses-gatepost.paths";
import {UtilService} from "../../../shared/services/util.service";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";

@Component({
    selector: "ui-compass-child-support-expenses-details",
    templateUrl: "./child-support-expenses-details.component.html",
    styleUrls: ["./child-support-expenses-details.component.css"],
})
export class ChildSupExpDlsComponent implements OnInit {
    childSuptExpDelsCmpForm: FormGroup | any | null;
    daysData: any;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    childSupportMap!: any;
    fragment!: string;
    partTimeOrFullTime!: any;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    requiredFields = [] as string[];
    fieldDisplays: any = {};
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private service: ApplyNowStoreService,
        private queueService: ScreenQueueUtil,
        private activedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private utilService: UtilService,
        private appService: AppStoreService
    ) {}
    ngOnInit() {

      this.childSuptExpDelsCmpForm = this.fb.group({
        amountOfSupportOrder: [""],
        amountActuallyPaid: [""],
        frequency: [""],
      });
      this.childSuptExpDelsCmpForm.reset();
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      if (this.houseHoldDetails.houseHoldPersons) {
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
      }
      this.childSupportMap =
        {
          ...this.houseHoldDetails.pageAction?.childSupportMap,
        } || {};
        this.activedRoute.params.subscribe((p) => {

          this.houseHoldDetails = this.service.getHouseHoldDetails;
          if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
          }
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.childSupportMap
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
            if (this.fragment !== "new")
              this.setFormValues(this.fragment);
           });

            this.cd.detectChanges();
        });
        this.appService.getPay().subscribe((c) => {
            this.daysData = c;
            this.cd.detectChanges();
        });
    }

    setProgramFieldValidation(currentUser: IHouseHold) {
        let householdBenefits = this.service?.getAppliedBenefitsForIndividual(
            currentUser
        ) as string[];
        const fields = [
          {
            fieldName: "amountOfSupportOrder",
            optionalProgram: [
              INDIVIDUAL_PROGRAMS.FS, INDIVIDUAL_PROGRAMS.FSR, INDIVIDUAL_PROGRAMS.ES, INDIVIDUAL_PROGRAMS.ESR
            ],
            requiredProgram: [

            ],
          },
            {
                fieldName: "amountActuallyPaid",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.CI,
                    INDIVIDUAL_PROGRAMS.CIR,
                ],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.FSR,
                ],
            },
            {
                fieldName: "frequency",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.CI,
                    INDIVIDUAL_PROGRAMS.CIR,
                ],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.FSR,
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
                formGroup: this.childSuptExpDelsCmpForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.childSuptExpDelsCmpForm =
                requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
    }

    setFormValues(fragment: any) {

      let updatedFragment = parseInt(fragment) || 0;

        if (!fragment && this.currentUser.expense?.childSupportExpenses) {
          updatedFragment = this.currentUser.expense?.childSupportExpenses?.length-1;
        }
        if(updatedFragment === -1){
            updatedFragment = 0;
        }

        setTimeout(() => {
          if( this.currentUser.expense?.childSupportExpenses) {
            console.log("updatedFragment");
          console.log(updatedFragment);
          console.log(this.currentUser)
        }
            if (
              this.currentUser.expense?.childSupportExpenses &&
              this.currentUser.expense.childSupportExpenses[updatedFragment]
            )
                this.childSuptExpDelsCmpForm.patchValue(
                  this.currentUser.expense.childSupportExpenses[updatedFragment]
                );
            this.cd.detectChanges();
        }, 500);
    }
    get f() {
        return this.childSuptExpDelsCmpForm.controls;
    }
    isFieldValid(field: string): boolean {
        return (
            this.childSuptExpDelsCmpForm.get(field).status !== "VALID" &&
            this.childSuptExpDelsCmpForm.get(field).touched
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            case "amountActuallyPaid":
                if (
                    this.childSuptExpDelsCmpForm.get("amountActuallyPaid")
                        .errors.required
                ) {
                    return "No amount is entered";
                }
                break;
            case "frequency":
                if (
                    this.childSuptExpDelsCmpForm.get("frequency").errors
                        .required
                ) {
                    return "No frequency is entered";
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }

    onSubmit() {
        console.log("this.childSuptExpDelsCmpForm");
        console.log(this.childSuptExpDelsCmpForm);
        this.service.validateAllFormFields(this.childSuptExpDelsCmpForm);
        if (this.childSuptExpDelsCmpForm.status.toLowerCase() === "valid") {
            let isNextPage = false;
            this.childSupportMap[this.currentUserIndex] = true;
            const storedHouseholdDetails = this.service.getHouseHoldDetails;

            const storedChildSupportExpense =
                this.currentUser.expense?.childSupportExpenses || [];
            //iterantive over absent relatives , find the current from the absent relvative map and update address
            let currentChildSupportExpenses: IChildSupportExpenses[];
            if (Number.isInteger(parseInt(this.fragment))) {
                currentChildSupportExpenses = storedChildSupportExpense.map(
                    (cs, i) => {
                        if (i === parseInt(this.fragment)) {
                            return this.childSuptExpDelsCmpForm.value;
                        } else {
                            return cs;
                        }
                    }
                );
            } else {
                currentChildSupportExpenses = [
                    ...storedChildSupportExpense,
                    ...[this.childSuptExpDelsCmpForm.value],
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
                                childSupportExpenses:
                                    currentChildSupportExpenses,
                            };
                        }
                        return personToBeUpdated;
                    }
                );
            const updatedPageAction = {
                ...storedHouseholdDetails?.pageAction,
                childSupport: {
                    ...storedHouseholdDetails?.pageAction?.childSupportMap,
                    ...this.childSupportMap,
                },
                childSupportDirection: PageDirection.NEXT,
            };
            if (storedHouseholdDetails)
                this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ pageAction: updatedPageAction },
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });

            this.childSuptExpDelsCmpForm.reset();
            if (this.childSupportMap != null) {
                isNextPage = this.utilService.isNextPage(this.childSupportMap);
            }

            if (isNextPage && !Number.isInteger(parseInt(this.fragment))) {
                this.utilService

                    .getCurrentUserIdPageAction(
                        this.childSupportMap,
                        PageDirection.NEXT
                    )

                    .subscribe((id: any) => {
                        this.currentUserIndex = id.toString();

                        this.route.navigate(
                            [
                                RoutePath.APPLYNOW +
                                    "/" +
                                    RoutePath.APPLYNOW_EXPENSES +
                                    "/" +
                                    RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_DETAILS,
                                { userId: this.currentUserIndex },
                            ],
                            { fragment: this.fragment }
                        );
                    });

                // this.init();
            } else {
                this.route.navigate([
                    RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_EXPENSES +
                        "/" +
                        RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_SUMMARY,
                ]);
            }
        }
    }
    previous(): void {
        this.childSupportMap[this.currentUserIndex] = false;
         const storeHouseholdDetails = this.service.getHouseHoldDetails;
        const updatedPageAction = {
            childSupportMap: {
                ...storeHouseholdDetails.pageAction?.childSupportMap,
                ...this.childSupportMap,
            },
            childSupportDirection: PageDirection.NEXT,
        };

        this.service.updateHouseHoldDetails({
            ...storeHouseholdDetails,
            ...{ pageAction: updatedPageAction },
        });

        if (
            Object.keys(this.childSupportMap)[0].toString() !==
                this.currentUserIndex.toString() &&
            !Number.isInteger(parseInt(this.fragment))
        ) {
            this.utilService
                .getCurrentUserIdPageAction(
                    this.childSupportMap,
                    PageDirection.BACK
                )
                .subscribe((id: any) => {
                    this.currentUserIndex = id.toString();
                      if(parseInt(this.currentUserIndex)){
                    this.route.navigate([
                        RoutePath.APPLYNOW +
                            "/" +
                            RoutePath.APPLYNOW_EXPENSES +
                            "/" +
                            RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_DETAILS,
                        { userId: this.currentUserIndex },
                    ]);
                      }
                      else {
                        this.route.navigate([
                          RoutePath.APPLYNOW +
                          "/" +
                          RoutePath.APPLYNOW_EXPENSES +
                          "/" +
                          RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_DETAILS
                        ]);
                      }
                });

        } else {
            this.route.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSES,
            ]);
        }
    }
}

