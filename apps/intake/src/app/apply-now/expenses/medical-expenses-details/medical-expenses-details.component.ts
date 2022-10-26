import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import { AppStoreService } from "../../../app-store-service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import {IHouseHold, IHouseHoldDetails, IMedicalExpenses, PageDirection} from "../../household/household-model";
import {UtilService} from "../../../shared/services/util.service";
import {select, Store} from "@ngrx/store";
import {State as AppState} from "../../../+state";
import {AppPageActions} from "../../../+state/actions";
import * as AppSelectors from "../../../+state/app.selectors";
import { ScreenQueueUtil } from "./../expenses-gatepost/expenses-gatepost.paths";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";

@Component({
    selector: "ui-compass-medical-expenses-details",
    templateUrl: "./medical-expenses-details.component.html",
    styleUrls: ["./medical-expenses-details.component.css"],
})
export class MedicalExpDlsComponent implements OnInit {
    medicalExpDlsForm: FormGroup | any | null;
    daysData: any;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    medicalMap!: any;
    fragment!: string;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    medicalExpensesopts: any[] = [];
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
        private queueService: ScreenQueueUtil,
        private appstore: Store<AppState>
    ) {}
    getMedicalExpenses() {
        return this.appstore.pipe(select(AppSelectors.getMedicalExpenses));
    }
    ngOnInit() {
        this.appstore.dispatch(AppPageActions.getMedicalExpenses());
        this.medicalExpDlsForm = this.fb.group({
            willExpensesContinue: [""],
            subExpenseType: [""],
            amountActuallyPaid: [""],
            frequency: [""],
        });

        this.medicalExpDlsForm.reset();
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        this.medicalMap =
            {
                ...this.houseHoldDetails.pageAction?.medicalMap,
            } || {};

        this.activedRoute.params.subscribe((p) => {
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.medicalMap
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
          this.medicalExpDlsForm.controls['amountActuallyPaid'].setValidators([Utility.maxAmountValidator(1000000)]);
          this.activedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "";
            if (this.fragment !== "new") this.setFormValues(this.fragment);
          });
            this.cd.detectChanges();
        });
        this.getMedicalExpenses().subscribe((exp: any) => {
            this.medicalExpensesopts = exp;
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
        console.log(householdBenefits);
        const fields = [
            {
                fieldName: "willExpensesContinue",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.ES,
                    INDIVIDUAL_PROGRAMS.ESR,
                    INDIVIDUAL_PROGRAMS.FSR,
                    INDIVIDUAL_PROGRAMS.CI,
                    INDIVIDUAL_PROGRAMS.CIR,
                ],
                requiredProgram: [],
            },
            {
                fieldName: "subExpenseType",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.FSR,
                ],
                requiredProgram: [],
            },
            {
                fieldName: "amountActuallyPaid",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.ES,
                    INDIVIDUAL_PROGRAMS.ESR,
                    INDIVIDUAL_PROGRAMS.FSR,
                    INDIVIDUAL_PROGRAMS.CI,
                    INDIVIDUAL_PROGRAMS.CIR,
                ],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.CI,
                    INDIVIDUAL_PROGRAMS.CIR,
                ],
            },
            {
                fieldName: "frequency",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.ES,
                    INDIVIDUAL_PROGRAMS.ESR,
                    INDIVIDUAL_PROGRAMS.FSR,
                    INDIVIDUAL_PROGRAMS.CI,
                    INDIVIDUAL_PROGRAMS.CIR,
                ],
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
                formGroup: this.medicalExpDlsForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.medicalExpDlsForm = requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
    }

    setFormValues(fragment: any) {
      let updatedFragment = parseInt(fragment);
      if (!fragment && this.currentUser.expense?.medicalExpenses) {
        updatedFragment =
          this.currentUser.expense?.medicalExpenses?.length-1;
      }
      setTimeout(() => {
            if (
                this.currentUser?.expense?.medicalExpenses &&
                this.currentUser.expense.medicalExpenses[updatedFragment]
            )
                this.medicalExpDlsForm.patchValue(
                    this.currentUser.expense.medicalExpenses[updatedFragment]
                );
            this.cd.detectChanges();
        }, 100);
    }
    get f() {
        return this.medicalExpDlsForm.controls;
    }

    isFieldValid(field: string): boolean {
        if (this.medicalExpDlsForm.get(field).status !== "VALID") {
        }
        return (
            this.medicalExpDlsForm.get(field).status !== "VALID" &&
            this.medicalExpDlsForm.get(field).touched
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            case "amountActuallyPaid":
                if (
                    this.medicalExpDlsForm.get("amountActuallyPaid").errors
                        .required
                ) {
                    return "No amount is entered";
                }
              if (
                this.medicalExpDlsForm.get("amountActuallyPaid").errors
                  .invalidAmount
              ) {
                return "Total amount should be less than 1000000";
              }
                break;
            case "frequency":
                if (this.medicalExpDlsForm.get("frequency").errors.required) {
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
        this.service.validateAllFormFields(this.medicalExpDlsForm);
        if (this.medicalExpDlsForm.status.toLowerCase() === "valid") {
            let isNextPage = false;
            this.medicalMap[this.currentUserIndex] = true;
            const storedHouseholdDetails = this.service.getHouseHoldDetails;

            const storedMedicalExpenses =
                this.currentUser.expense?.medicalExpenses || [];
            let currentMedicalExpenses: IMedicalExpenses[];
            if (Number.isInteger(parseInt(this.fragment))) {
                currentMedicalExpenses = storedMedicalExpenses.map((cs, i) => {
                    if (i === parseInt(this.fragment)) {
                        return this.medicalExpDlsForm.value;
                    } else {
                        return cs;
                    }
                });
            } else {
                currentMedicalExpenses = [
                    ...storedMedicalExpenses,
                    ...[this.medicalExpDlsForm.value],
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
                                medicalExpenses: currentMedicalExpenses,
                            };
                        }
                        return personToBeUpdated;
                    }
                );
            const updatedPageAction = {
                ...storedHouseholdDetails?.pageAction,
                medicalMap: {
                    ...storedHouseholdDetails?.pageAction?.medicalMap,
                    ...this.medicalMap,
                },
                medicalDirection: PageDirection.NEXT,
            };
            if (storedHouseholdDetails)
                this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ pageAction: updatedPageAction },
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });

            this.medicalExpDlsForm.reset();
            if (this.medicalMap != null) {
                isNextPage = this.utilService.isNextPage(this.medicalMap);
            }
            if (isNextPage && !Number.isInteger(parseInt(this.fragment))) {
                this.utilService

                    .getCurrentUserIdPageAction(
                        this.medicalMap,
                        PageDirection.NEXT
                    )

                    .subscribe((id: any) => {
                        this.currentUserIndex = id.toString();

                        this.route.navigate([
                            RoutePath.APPLYNOW +
                                "/" +
                                RoutePath.APPLYNOW_EXPENSES +
                                "/" +
                                RoutePath.APPLYNOW_MEDICAL_EXPENSES_DETAILS,
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
                        RoutePath.APPLYNOW_MEDICAL_EXPENSES_SUMMARY,
                ]);
            }
        }
    }
    previous(): void {
        this.medicalMap[this.currentUserIndex] = false;
        const storeHouseholdDetails = this.houseHoldDetails;
        const updatedPageAction = {
            medicalMap: {
                ...storeHouseholdDetails.pageAction?.medicalMap,
                ...this.medicalMap,
            },
            medicalDirection: PageDirection.NEXT,
        };

        this.service.updateHouseHoldDetails({
            ...storeHouseholdDetails,
            ...{ pageAction: updatedPageAction },
        });

        if (
            Object.keys(this.medicalMap)[0].toString() !==
                this.currentUserIndex.toString() &&
            !Number.isInteger(parseInt(this.fragment))
        ) {
            this.utilService
                .getCurrentUserIdPageAction(this.medicalMap, PageDirection.BACK)
                .subscribe((id: any) => {
                    this.currentUserIndex = id.toString();
                    this.route.navigate([
                        RoutePath.APPLYNOW +
                            "/" +
                            RoutePath.APPLYNOW_EXPENSES +
                            "/" +
                            RoutePath.APPLYNOW_MEDICAL_EXPENSES_DETAILS,
                        { userId: this.currentUserIndex },
                    ]);
                });
        } else {
          this.route.navigate([
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_EXPENSES +
            "/" +
            RoutePath.APPLYNOW_MEDICAL_EXPENSES,
          ]);
        }
    }
}

