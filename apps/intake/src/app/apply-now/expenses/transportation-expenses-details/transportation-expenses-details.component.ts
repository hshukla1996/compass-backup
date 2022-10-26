import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import { AppStoreService } from "../../../app-store-service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import {IHouseHold, IHouseHoldDetails, ITransportExpenses, PageDirection} from "../../household/household-model";
import {UtilService} from "../../../shared/services/util.service";
import { ScreenQueueUtil } from "./../expenses-gatepost/expenses-gatepost.paths";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";

@Component({
    selector: "ui-compass-transportation-expenses-details",
    templateUrl: "./transportation-expenses-details.component.html",
    styleUrls: ["./transportation-expenses-details.component.css"],
})
export class TransportationExpDlsComponent implements OnInit {
    transportationExpDlsForm: FormGroup | any | null;
    daysData: any;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    fragment!: string;
    transportationMap!: any;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    requiredFields = [] as string[];
    fieldDisplays: any = {};
    employeerList: any = [];
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
        this.transportationExpDlsForm = this.fb.group({
            employer: [""],
            costPerWeek: [""],
            milesDrivenForJob: [""],
            montlyCarPayment: [""],
            otherIncomeType: [],
        });
        this.transportationExpDlsForm.reset();
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        this.transportationMap =
            {
                ...this.houseHoldDetails.pageAction?.transportationMap,
            } || {};
        this.activedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "";
            if (this.fragment !== "new") this.setFormValues(this.fragment);
        });
        this.activedRoute.params.subscribe((p) => {
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.transportationMap
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
            //console.log(this.currentUser.individualIncome?.currentEmployment);
            this.currentUser.individualIncome?.currentEmployment?.forEach(
                (obj) => {
                    this.employeerList.push({
                        key: obj?.name,
                        displayValue: obj?.name,
                    });
                }
            );
            this.employeerList.push({
                key: "Self-Employment",
                displayValue:
                    "Self-Employment (including baby sitting, cleaning, mowing lawns, etc.)",
            });
            this.employeerList.push({
                key: "Self-Employment-Farming",
                displayValue: "Self-Employment - Farming",
            });
            this.setProgramFieldValidation(this.currentUser);
            this.cd.detectChanges();
        });
        this.appService.getPay().subscribe((pay) => {
            this.daysData = pay;
            this.cd.detectChanges();
        });
    }
    selectEmployer(employer:any) {
        console.log(employer);
        if(employer!= 'Self-Employment-Farming')
        this.transportationExpDlsForm.get('otherIncomeType').value ="";
    }
    setProgramFieldValidation(currentUser: IHouseHold) {
        const householdBenefits = this.service?.getAppliedBenefitsForIndividual(
            currentUser
        ) as string[];
        const fields = [
            {
                fieldName: "employer",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.MAR,
                ],
            },
            {
                fieldName: "costPerWeek",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.MAR,
                ],
                requiredProgram: [],
            },
            {
                fieldName: "milesDrivenForJob",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.MAR,
                ],
                requiredProgram: [],
            },
            {
                fieldName: "montlyCarPayment",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.MAR,
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
                formGroup: this.transportationExpDlsForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.transportationExpDlsForm =
                requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
    }
    setFormValues(fragment: any) {
        setTimeout(() => {
            if (
                fragment &&
                this.currentUser.expense?.transportExpenses &&
                this.currentUser.expense?.transportExpenses[fragment]
            )
                this.transportationExpDlsForm.patchValue(
                    this.currentUser.expense.transportExpenses[fragment]
                );
            this.cd.detectChanges();
        }, 100);
    }
    get f() {
        return this.transportationExpDlsForm.controls;
    }
    isFieldValid(field: string): boolean {
        return (
            this.transportationExpDlsForm.get(field).status !== "VALID" &&
            this.transportationExpDlsForm.get(field).touched
        );
    }
    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            case "employer":
                if (
                    this.transportationExpDlsForm.get("employer").errors
                        .required
                ) {
                    return "No Employer is selected from the dropdown";
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }

    onSubmit() {
        this.service.validateAllFormFields(this.transportationExpDlsForm);
        if (this.transportationExpDlsForm.status.toLowerCase() === "valid") {
            let isNextPage = false;
            this.transportationMap[this.currentUserIndex] = true;
            const storedHouseholdDetails = this.service.getHouseHoldDetails;
            const storedTransportExpenses =
                this.currentUser.expense?.transportExpenses || [];
            //iterantive over absent relatives , find the current from the absent relvative map and update address
            let currentTransportExpenses: ITransportExpenses[];
            if (Number.isInteger(parseInt(this.fragment))) {
                currentTransportExpenses = storedTransportExpenses.map(
                    (cs, i) => {
                        if (i === parseInt(this.fragment)) {
                            return this.transportationExpDlsForm.value;
                        } else {
                            return cs;
                        }
                    }
                );
            } else {
                currentTransportExpenses = [
                    ...storedTransportExpenses,
                    ...[this.transportationExpDlsForm.value],
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
                                transportExpenses: currentTransportExpenses,
                            };
                        }
                        return personToBeUpdated;
                    }
                );
            const updatedPageAction = {
                ...storedHouseholdDetails?.pageAction,
                transportationMap: {
                    ...storedHouseholdDetails?.pageAction?.transportationMap,
                    ...this.transportationMap,
                },
                adultCareDirection: PageDirection.NEXT,
            };
            if (storedHouseholdDetails)
                this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ pageAction: updatedPageAction },
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });

            this.transportationExpDlsForm.reset();
            if (this.transportationMap != null) {
                isNextPage = this.utilService.isNextPage(
                    this.transportationMap
                );
            }
            if (isNextPage && !Number.isInteger(parseInt(this.fragment))) {
                this.utilService

                    .getCurrentUserIdPageAction(
                        this.transportationMap,
                        PageDirection.NEXT
                    )

                    .subscribe((id: any) => {
                        this.currentUserIndex = id.toString();

                        this.route.navigate([
                            RoutePath.APPLYNOW +
                                "/" +
                                RoutePath.APPLYNOW_EXPENSES +
                                "/" +
                                RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_DETAILS,
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
                        RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_SUMMARY,
                ]);
            }
        }
    }
    previous(): void {
        this.transportationMap[this.currentUserIndex] = false;
        const storeHouseholdDetails = this.houseHoldDetails;
        const updatedPageAction = {
            transportationMap: {
                ...storeHouseholdDetails.pageAction?.transportationMap,
                ...this.transportationMap,
            },
            transportationDirection: PageDirection.NEXT,
        };

        this.service.updateHouseHoldDetails({
            ...storeHouseholdDetails,
            ...{ pageAction: updatedPageAction },
        });

        if (
            Object.keys(this.transportationMap)[0].toString() !==
                this.currentUserIndex.toString() &&
            !Number.isInteger(parseInt(this.fragment))
        ) {
            this.utilService
                .getCurrentUserIdPageAction(
                    this.transportationMap,
                    PageDirection.BACK
                )
                .subscribe((id: any) => {
                    this.currentUserIndex = id.toString();
                    this.route.navigate([
                        RoutePath.APPLYNOW +
                            "/" +
                            RoutePath.APPLYNOW_EXPENSES +
                            "/" +
                            RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_DETAILS,
                        { userId: this.currentUserIndex },
                    ]);
                });
        } else {
            this.route.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES,
            ]);
        }
    }
    /*this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES,
        ]);*/
}

