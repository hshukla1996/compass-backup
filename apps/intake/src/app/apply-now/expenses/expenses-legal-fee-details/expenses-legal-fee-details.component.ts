import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { ScreenQueueUtil } from "./../expenses-gatepost/expenses-gatepost.paths";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";

import {
    IHouseHold,
    IHouseHoldDetails,
    ILegalFeeExpenses,
    PageDirection,
} from "../../household/household-model";
import { UtilService } from "../../../shared/services/util.service";

@Component({
    selector: "ui-compass-expenses-legal-fee-details",
    templateUrl: "./expenses-legal-fee-details.component.html",
    styleUrls: ["./expenses-legal-fee-details.component.css"],
})
export class ExpLegalFeeDlsComponent implements OnInit {
    expLegalFeeDlsCmpForm: FormGroup | any | null;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    legalfeeMap!: any;
    fragment!: string;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    requiredFields = [] as string[];
    fieldDisplays: any = {};
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private utilService: UtilService,
        private activedRoute: ActivatedRoute,
        private queueService: ScreenQueueUtil
    ) {}

    ngOnInit() {
        this.expLegalFeeDlsCmpForm = this.fb.group({
            legalFee: [""],
        });
        this.expLegalFeeDlsCmpForm.reset();
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        this.legalfeeMap =
            {
                ...this.houseHoldDetails.pageAction?.legalfeeMap,
            } || {};
        this.activedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "";
            if (this.fragment !== "new") this.setFormValues(this.fragment);
        });
        this.activedRoute.params.subscribe((p) => {
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.legalfeeMap
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
    }

    setProgramFieldValidation(currentUser: IHouseHold) {
        let householdBenefits = this.service?.getAppliedBenefitsForIndividual(
            currentUser
        ) as string[];
        const fields = [
            {
                fieldName: "legalFee",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.MAR,
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
                formGroup: this.expLegalFeeDlsCmpForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.expLegalFeeDlsCmpForm =
                requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
    }

    setFormValues(fragment: any) {
        setTimeout(() => {
            if (
                this.currentUser.expense?.legalFeeExpenses &&
                this.currentUser.expense?.legalFeeExpenses[fragment]
            )
                this.expLegalFeeDlsCmpForm.patchValue(
                    this.currentUser.expense.legalFeeExpenses[fragment]
                );
            this.cd.detectChanges();
        }, 100);
    }
    get f() {
        return this.expLegalFeeDlsCmpForm.controls;
    }
    isFieldValid(field: string): boolean {
        if (this.expLegalFeeDlsCmpForm.get(field).status !== "VALID") {
            //console.log("invalid");
            //console.log(field);
            //console.log(this.expLegalFeeDlsCmpForm.get(field).touched);
        }
        return (
            this.expLegalFeeDlsCmpForm.get(field).status !== "VALID" &&
            this.expLegalFeeDlsCmpForm.get(field).touched
        );
    }
    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case "legalFee":
                if (
                    this.expLegalFeeDlsCmpForm.get("legalFee").errors.required
                ) {
                    return "How much are legal fees each month is required.";
                }
                break;
            default:
                return "";
                break;
        }

        return "";
    }

    onSubmit() {
        let isNextPage = false;
        this.legalfeeMap[this.currentUserIndex] = true;
        this.service.validateAllFormFields(this.expLegalFeeDlsCmpForm);
        const storedHouseholdDetails = this.service.getHouseHoldDetails;
        if (this.expLegalFeeDlsCmpForm.status.toLowerCase() === "valid") {
            this.service.validateAllFormFields(this.expLegalFeeDlsCmpForm);
            const storedMedicalExpenses =
                this.currentUser.expense?.legalFeeExpenses || [];
            let currentLegalFeeExpenses: ILegalFeeExpenses[];
            if (Number.isInteger(parseInt(this.fragment))) {
                currentLegalFeeExpenses = storedMedicalExpenses.map((cs, i) => {
                    if (i === parseInt(this.fragment)) {
                        return this.expLegalFeeDlsCmpForm.value;
                    } else {
                        return cs;
                    }
                });
            } else {
                currentLegalFeeExpenses = [
                    ...storedMedicalExpenses,
                    ...[this.expLegalFeeDlsCmpForm.value],
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
                                legalFeeExpenses: currentLegalFeeExpenses,
                            };
                        }
                        return personToBeUpdated;
                    }
                );
            const updatedPageAction = {
                ...storedHouseholdDetails?.pageAction,
                legalfeeMap: {
                    ...storedHouseholdDetails?.pageAction?.legalfeeMap,
                    ...this.legalfeeMap,
                },
                legalfeeDirection: PageDirection.NEXT,
            };
            if (storedHouseholdDetails)
                this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ pageAction: updatedPageAction },
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });

            this.expLegalFeeDlsCmpForm.reset();
            if (this.legalfeeMap != null) {
                isNextPage = this.utilService.isNextPage(this.legalfeeMap);
            }
            if (isNextPage && !Number.isInteger(parseInt(this.fragment))) {
                this.utilService

                    .getCurrentUserIdPageAction(
                        this.legalfeeMap,
                        PageDirection.NEXT
                    )

                    .subscribe((id: any) => {
                        this.currentUserIndex = id.toString();

                        this.route.navigate([
                            RoutePath.APPLYNOW +
                                "/" +
                                RoutePath.APPLYNOW_EXPENSES +
                                "/" +
                                RoutePath.APPLYNOW_EXPENSES_LEGALFEE_DETAILS,
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
                        RoutePath.APPLYNOW_EXPENSESLEGALFEESUMMARY,
                ]);
            }
        }
    }
    previous(): void {
        this.legalfeeMap[this.currentUserIndex] = false;
        const storeHouseholdDetails = this.houseHoldDetails;
        const updatedPageAction = {
            legalfeeMap: {
                ...storeHouseholdDetails.pageAction?.legalfeeMap,
                ...this.legalfeeMap,
            },
            legalfeeDirection: PageDirection.NEXT,
        };

        this.service.updateHouseHoldDetails({
            ...storeHouseholdDetails,
            ...{ pageAction: updatedPageAction },
        });

        if (
            Object.keys(this.legalfeeMap)[0].toString() !==
                this.currentUserIndex.toString() &&
            !Number.isInteger(parseInt(this.fragment))
        ) {
            this.utilService
                .getCurrentUserIdPageAction(
                    this.legalfeeMap,
                    PageDirection.BACK
                )
                .subscribe((id: any) => {
                    this.currentUserIndex = id.toString();
                    this.route.navigate([
                        RoutePath.APPLYNOW +
                            "/" +
                            RoutePath.APPLYNOW_EXPENSES +
                            "/" +
                            RoutePath.APPLYNOW_EXPENSES_LEGALFEE_DETAILS,
                        { userId: this.currentUserIndex },
                    ]);
                });
        } else {
            this.queueService.back();
        }

        /*
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSESLEGALFEE,
        ]); */
    }
}
