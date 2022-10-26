import { ChangeDetectorRef, Component, OnInit  } from "@angular/core";
import { FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { IApplyNowState } from "../../+state/apply-now.models";
import { RoutePath } from "../../../shared/route-strategies";
import { UtilService } from "../../../shared/services/util.service";
import {
    FormValidatorField,
    RequiredOrOptionalValidatorField,
    Utility,
} from "../../../shared/utilities/Utility";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHold } from "../../household/household-model";
import {
    IND_CHILD_CARE,
    INDIVIDUAL_PROGRAMS,
} from "../../../shared/constants/Individual_Programs_Constants";
@Component({
    selector: "ui-compass-foster-care-details",
    templateUrl: "./foster-care-details.component.html",
    styleUrls: ["./foster-care-details.component.css"],
})
export class FosterCareDetailsComponent {
    fosterCareDetailsForm: FormGroup | any | null;
    applyNowState: IApplyNowState | undefined;
    data: any;
    currentUserIndex!: string;
    currentUser: IHouseHold = {};
    personsMap!: any;
    houseHoldPersons: IHouseHold[] = [];
    showFosterInfo = false;
    requiredFields = [] as string[];
    fieldDisplays:any = {};
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private service: ApplyNowStoreService,
        private router: Router,
        private cd: ChangeDetectorRef,
        private activedRoute: ActivatedRoute,
        private utilService: UtilService
    ) {}
    ngOnInit() {
        this.fosterCareDetailsForm = this.fb.group({
            isFosterChild: ["", Validators.required],
            amtGivenToEachMonth: ["", Validators.required],
            mealBenefit: [""],
        });
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            if (this.applyNowState.houseHoldDetails.houseHoldPersons) {
                this.houseHoldPersons =
                    this.applyNowState.houseHoldDetails.houseHoldPersons;
            }
            this.personsMap =
                {
                    ...this.applyNowState.houseHoldDetails.pageAction
                        ?.personsMap,
                } || {};
        });
        this.activedRoute.params.subscribe((p) => {
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.personsMap
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
                    this.setFieldProgramValidations(this.currentUser);
            // setTimeout(() => {
            //     setTimeout(() => {
            if (this.currentUser.fosterChild) {
                if (this.currentUser.fosterChild?.isFosterChild === "Y") {
                    this.fosterCareDetailsForm
                        .get("isFosterChild")
                        .patchValue("Yes");
                    this.showFosterInfo = true;
                } else {
                    this.fosterCareDetailsForm
                        .get("isFosterChild")
                        .patchValue("No");
                    this.showFosterInfo = false;
                }
            }
            if (this.currentUser.fosterChild?.amtGivenToEachMonth) {
                this.fosterCareDetailsForm
                    .get("amtGivenToEachMonth")
                    .patchValue(
                        this.currentUser.fosterChild?.amtGivenToEachMonth
                    );
            }
            this.fosterCareDetailsForm
                .get("mealBenefit")
                .patchValue(
                    this.currentUser.fosterChild?.mealBenefit
                        ? this.currentUser.fosterChild?.mealBenefit === "Y"
                            ? "Yes"
                            : "No"
                        : ""
                );
            // }, 500);
            //   this.fosterCareDetailsForm
            //     .get("socialSecurityNumber")
            //    .patchValue(this.currentUser.socialSecurityNumber);
            // }, 500);
            this.cd.detectChanges();
        });
    }

    setFieldProgramValidations(ind: IHouseHold) {
        const indBenfits = this.service?.getAppliedBenefitsForIndividual(
            ind
        ) as string[];
        console.log("indBenefits");
        console.log(indBenfits)
        const fields = [
            {
                fieldName: "isFosterChild",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.BL,
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.CHR,
                ],
            },
            {
                fieldName: "amtGivenToEachMonth",
                optionalProgram: [],
                requiredProgram: [INDIVIDUAL_PROGRAMS.BL],
            },
            {
                fieldName: "mealBenefit",
                optionalProgram: [],
                requiredProgram: [INDIVIDUAL_PROGRAMS.BL],
            },
        ] as FormValidatorField[];
        this.fieldDisplays = {};
        fields.forEach((fieldObj: FormValidatorField) => {
            this.fieldDisplays[fieldObj.fieldName] =
                this.service.areProgramsExist(indBenfits, [
                    ...fieldObj.optionalProgram,
                    ...fieldObj.requiredProgram,
                ]);
        });
        if (indBenfits != null && indBenfits.length > 0) {
            const requiredOrOptionalValidatorField = {
                selectedPrograms: indBenfits,
                requiredFields: [],
                formGroup: this.fosterCareDetailsForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.fosterCareDetailsForm =
                requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
    }
    get f() {
        return this.fosterCareDetailsForm.controls;
    }
    showFosterDetails(show: boolean) {
        this.showFosterInfo = show;
    }

    isFieldValid(field: string): boolean {
        return (
            this.fosterCareDetailsForm.get(field).status !== "VALID" &&
            this.fosterCareDetailsForm.get(field).touched
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            case "isFosterChild":
                if (
                    this.fosterCareDetailsForm.get("isFosterChild").errors
                        .required
                ) {
                    return "The question is not answered.";
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }

    onSubmit(): void {
        console.log(this.fosterCareDetailsForm.value);
        // isFosterChild: ["", Validators.required],
        //    amtGivenToEachMonth: ["", Validators.required],
        //    mealBenefit: [""],
        const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
        const updatedHouseholdPersons =
            this.applyNowState?.houseHoldDetails.houseHoldPersons?.map(
                (person: IHouseHold) => {
                    if (person.id === this.currentUser.id) {
                        let personToBeUpdated = { ...person };
                        personToBeUpdated.fosterChild = {
                            isFosterChild: this.fosterCareDetailsForm
                                .get("isFosterChild")
                                .value.charAt(0),
                            amtGivenToEachMonth: parseInt(
                                this.fosterCareDetailsForm
                                    .get("isFosterChild")
                                    .value.charAt(0) === "Y"
                                    ? this.fosterCareDetailsForm.get(
                                          "amtGivenToEachMonth"
                                      ).value
                                    : null
                            ),
                            mealBenefit:
                                this.fosterCareDetailsForm
                                    .get("isFosterChild")
                                    .value.charAt(0) === "Y"
                                    ? this.fosterCareDetailsForm
                                          .get("mealBenefit")
                                          .value.charAt(0)
                                    : "",
                        };
                        return personToBeUpdated;
                    } else {
                        return person;
                    }
                }
            );
        console.log("updatedHouseholdPersons");
        console.log(updatedHouseholdPersons);
        if (storedHouseholdDetails) {
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ houseHoldPersons: updatedHouseholdPersons },
            });
        }
        const benefits = this.service.getAppliedBenefitsForIndividual(
            this.currentUser
        );
        const showChildCare = this.service.areProgramsExist(
            benefits as string[],
            IND_CHILD_CARE
        );
        if (showChildCare) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_CHILD_CARE_SERVICE,
                { userId: this.currentUserIndex },
            ]);
        } else {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_DEMOGRAPHIC_SUMMARY,
            ]);
        }
    }
    previous(): void {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_PRIMARY_CARETACKER,
        ]);
    }
}