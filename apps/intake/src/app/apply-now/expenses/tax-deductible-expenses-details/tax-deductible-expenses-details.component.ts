import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
    FormGroup,
    FormBuilder,
    Validators,
    AbstractControl,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import { AppStoreService } from "../../../app-store-service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import {IHouseHold, IHouseHoldDetails, ITaxDeductableExpenses, PageDirection} from "../../household/household-model";
import {UtilService} from "../../../shared/services/util.service";
import { select, Store } from "@ngrx/store";
import { State as AppState } from "../../../+state";
import * as AppSelectors from "../../../+state/app.selectors";
import { AppPageActions } from "../../../+state/actions";
import { ScreenQueueUtil } from "./../expenses-gatepost/expenses-gatepost.paths";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";

@Component({
    selector: "ui-compass-tax-deductible-expenses-details",
    templateUrl: "./tax-deductible-expenses-details.component.html",
    styleUrls: ["./tax-deductible-expenses-details.component.css"],
})
export class TaxDeductibleExpDlsComponent implements OnInit {
    taxDeductibleExpDlsForm: FormGroup | any | null;
    daysData: any;
    minDateRange:any;
    maxDateRange: any;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    taxdeductableMap!: any;
    fragment!: string;
    deducatables: any[] = [];
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    today = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
    requiredFields = [] as string[];
    fieldDisplays: any = {};
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private cd: ChangeDetectorRef,
        private appService: AppStoreService,
        private service: ApplyNowStoreService,
        private utilService: UtilService,
        private appstore: Store<AppState>,
        private activedRoute: ActivatedRoute,
        private queueService: ScreenQueueUtil
    ) {}
    getDeductableSources() {
        return this.appstore.pipe(select(AppSelectors.getDeductableSources));
    }
    ngOnInit() {
      this.maxDateRange = new Date().toISOString().slice(0, 10);
      this.minDateRange = new Date().toISOString().slice(0, 10);
        this.appstore.dispatch(AppPageActions.getDeductableSources());
        this.taxDeductibleExpDlsForm = this.fb.group({
            soruceOfDeductibleExpenses: [""],
            whatIsTheAmount: [""],
            taxHowOftenIsPaid: [""],
            taxDeductibleExpenceBeginDate: [""],
            taxDeductibleExpenceEndDate: [""],
        });
        this.taxDeductibleExpDlsForm.reset();
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        this.taxdeductableMap =
            {
                ...this.houseHoldDetails.pageAction?.taxdeductableMap,
            } || {};
        this.activedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "";
            if (this.fragment !== "new") this.setFormValues(this.fragment);
        });
        this.activedRoute.params.subscribe((p) => {
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.taxdeductableMap
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
          this.taxDeductibleExpDlsForm.controls['taxDeductibleExpenceBeginDate'].setValidators([Utility.dateMaxValidator()]);

           //  this.trainingDetailsForm.controls['programmeEndDate'].setValidators([Utility.dateMinValidator()]);


          this.taxDeductibleExpDlsForm.controls['whatIsTheAmount'].setValidators([Utility.maxAmountValidator(1000000)]);

          this.cd.detectChanges();
        });
        this.getDeductableSources().subscribe((exp: any) => {
            this.deducatables = exp;
            this.cd.detectChanges();
        });
        this.appService.getPay().subscribe((pay) => {
            this.daysData = pay;
            this.cd.detectChanges();
        });
    }
  setStartDate(startDate:any){
      this.minDateRange = new Date(startDate);
    this.taxDeductibleExpDlsForm.controls['taxDeductibleExpenceEndDate'].setValidators([Utility.dateStartValidator(startDate)]);

  }
  setEndDate(endDate:any){
      this.maxDateRange = new Date(endDate)
    this.taxDeductibleExpDlsForm.controls['taxDeductibleExpenceBeginDate'].setValidators([Utility.dateEndValidator(endDate)]);

  }

    setProgramFieldValidation(currentUser: IHouseHold) {
        let householdBenefits = this.service?.getAppliedBenefitsForIndividual(
            currentUser
        ) as string[];
        const fields = [
            {
                fieldName: "soruceOfDeductibleExpenses",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                    INDIVIDUAL_PROGRAMS.PE,
                    INDIVIDUAL_PROGRAMS.MI,
                ],
            },
            {
                fieldName: "whatIsTheAmount",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                    INDIVIDUAL_PROGRAMS.PE,
                    INDIVIDUAL_PROGRAMS.MI,
                ],
            },
            {
                fieldName: "taxHowOftenIsPaid",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                    INDIVIDUAL_PROGRAMS.PE,
                    INDIVIDUAL_PROGRAMS.MI,
                ],
            },
            {
                fieldName: "taxDeductibleExpenceBeginDate",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                    INDIVIDUAL_PROGRAMS.MI,
                ],
            },
            {
                fieldName: "taxDeductibleExpenceEndDate",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                    INDIVIDUAL_PROGRAMS.MI,
                ],
                requiredProgram: [],
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
                formGroup: this.taxDeductibleExpDlsForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.taxDeductibleExpDlsForm =
                requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
    }

    setFormValues(fragment: any) {
        setTimeout(() => {
            if (
                this.currentUser.expense?.taxDeductableExpenses &&
                this.currentUser.expense?.taxDeductableExpenses[fragment]
            )
                this.taxDeductibleExpDlsForm.patchValue(
                    this.currentUser.expense?.taxDeductableExpenses[fragment]
                );
            this.cd.detectChanges();
        }, 100);
    }
    get f() {
        return this.taxDeductibleExpDlsForm.controls;
    }

    isFieldValid(field: string): boolean {
        return (
            this.taxDeductibleExpDlsForm.get(field).status !== "VALID" &&
            this.taxDeductibleExpDlsForm.get(field).touched
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            case "soruceOfDeductibleExpenses":
                if (
                    this.taxDeductibleExpDlsForm.get(
                        "soruceOfDeductibleExpenses"
                    ).errors.required
                ) {
                    return "No source is selected from the dropdown";
                }

                break;
            case "whatIsTheAmount":
                if (
                    this.taxDeductibleExpDlsForm.get("whatIsTheAmount").errors
                        .required
                ) {
                    return "No amount is entered";
                }
              if (
                this.taxDeductibleExpDlsForm.get("whatIsTheAmount").errors
                  .invalidAmount
              ) {
                return "The total amount should be less than 1000000"
              }
                break;
            case "taxHowOftenIsPaid":
                if (
                    this.taxDeductibleExpDlsForm.get("taxHowOftenIsPaid").errors
                        .required
                ) {
                    return "No frequency is entered";
                }
                break;
            case "taxDeductibleExpenceBeginDate":
                if (
                    this.taxDeductibleExpDlsForm.get(
                        "taxDeductibleExpenceBeginDate"
                    ).errors.required
                ) {
                    return "No date is entered";
                }
              if (
                this.taxDeductibleExpDlsForm.get(
                  "taxDeductibleExpenceBeginDate"
                ).errors.invalidDate
              ) {
                return "Tax start date should not be greater than tax end date";
              }
              if (this.taxDeductibleExpDlsForm.get("taxDeductibleExpenceBeginDate").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            case "taxDeductibleExpenceEndDate":
                if (
                    this.taxDeductibleExpDlsForm.get(
                        "taxDeductibleExpenceEndDate"
                    ).errors.required
                ) {
                    return "No date is entered";
                }
              if (
                this.taxDeductibleExpDlsForm.get(
                  "taxDeductibleExpenceEndDate"
                ).errors.invalidDate
              ) {
                return "Tax end date should not be less than tax start date";
              }
              if (this.taxDeductibleExpDlsForm.get("taxDeductibleExpenceEndDate").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }

    dateOfBirthValidator(control: AbstractControl) {
        if (control) {
            if (
                control.value == null ||
                control.value === undefined ||
                control.value === ""
            ) {
                return { date_error: "date error message" };
            }
        }
        return null;
    }

    onSubmit() {
        let isNextPage = false;
        this.taxdeductableMap[this.currentUserIndex] = true;
        const storedHouseholdDetails = this.service.getHouseHoldDetails;
        this.service.validateAllFormFields(this.taxDeductibleExpDlsForm);
        if (this.taxDeductibleExpDlsForm.status.toLowerCase() === "valid") {
            const storedTransportExpenses =
                this.currentUser.expense?.taxDeductableExpenses || [];
            let currentTaxDeductableExpenses: ITaxDeductableExpenses[];
            if (this.taxDeductibleExpDlsForm.status.toLowerCase() === "valid") {
                if (Number.isInteger(parseInt(this.fragment))) {
                    currentTaxDeductableExpenses = storedTransportExpenses.map(
                        (cs, i) => {
                            if (i === parseInt(this.fragment)) {
                                return this.taxDeductibleExpDlsForm.value;
                            } else {
                                return cs;
                            }
                        }
                    );
                } else {
                    currentTaxDeductableExpenses = [
                        ...storedTransportExpenses,
                        ...[this.taxDeductibleExpDlsForm.value],
                    ];
                }
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
                                taxDeductableExpenses:
                                    currentTaxDeductableExpenses,
                            };
                        }
                        return personToBeUpdated;
                    }
                );
            const updatedPageAction = {
                ...storedHouseholdDetails?.pageAction,
                taxdeductableMap: {
                    ...storedHouseholdDetails?.pageAction?.taxdeductableMap,
                    ...this.taxdeductableMap,
                },
                taxdeductableDirection: PageDirection.NEXT,
            };
            if (storedHouseholdDetails)
                this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ pageAction: updatedPageAction },
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });

            this.taxDeductibleExpDlsForm.reset();
            if (this.taxdeductableMap != null) {
                isNextPage = this.utilService.isNextPage(this.taxdeductableMap);
            }
            if (isNextPage && !Number.isInteger(parseInt(this.fragment))) {
                this.utilService

                    .getCurrentUserIdPageAction(
                        this.taxdeductableMap,
                        PageDirection.NEXT
                    )

                    .subscribe((id: any) => {
                        this.currentUserIndex = id.toString();

                        this.route.navigate([
                            RoutePath.APPLYNOW +
                                "/" +
                                RoutePath.APPLYNOW_EXPENSES +
                                "/" +
                                RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES_DETAILS,
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
                        RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES_SUMMARY,
                ]);
            }
        }
    }
    previous(): void {
        this.taxdeductableMap[this.currentUserIndex] = false;
        const storeHouseholdDetails = this.houseHoldDetails;
        const updatedPageAction = {
            taxdeductableMap: {
                ...storeHouseholdDetails.pageAction?.taxdeductableMap,
                ...this.taxdeductableMap,
            },
            taxdeductableDirection: PageDirection.NEXT,
        };

        this.service.updateHouseHoldDetails({
            ...storeHouseholdDetails,
            ...{ pageAction: updatedPageAction },
        });

        if (
            Object.keys(this.taxdeductableMap)[0].toString() !==
                this.currentUserIndex.toString() &&
            !Number.isInteger(parseInt(this.fragment))
        ) {
            this.utilService
                .getCurrentUserIdPageAction(
                    this.taxdeductableMap,
                    PageDirection.BACK
                )
                .subscribe((id: any) => {
                    this.currentUserIndex = id.toString();
                    this.route.navigate([
                        RoutePath.APPLYNOW +
                            "/" +
                            RoutePath.APPLYNOW_EXPENSES +
                            "/" +
                            RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES_DETAILS,
                        { userId: this.currentUserIndex },
                    ]);
                });
        } else {
            this.queueService.back();
        }
    }
}

