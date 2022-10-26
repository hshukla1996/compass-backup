import { ChangeDetectorRef, Component, OnInit  } from "@angular/core";
import { FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { UtilService } from "../../../shared/services/util.service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHold, IHouseHoldDetails } from "../../household/household-model";
import {
    FormValidatorField,
    RequiredOrOptionalValidatorField,
    Utility,
} from "../../../shared/utilities/Utility";

import { IND_CHILD_CARE,INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
@Component({
    selector: "ui-compass-adult-foster-care-details",
    templateUrl: "./adult-foster-care-details.component.html",
    styleUrls: ["./adult-foster-care-details.component.css"],
})
export class AdultFosterCareDetailsComponent {
    adultFosterCareDetailsForm: FormGroup | any | null;
    applyNowState: IApplyNowState | undefined;
    data: any;
    currentUserIndex!: string;
    currentUser: IHouseHold = {};
    personsMap!: any;
    houseHoldPersons: IHouseHold[] = [];
    states: any;
    houseHoldDetails!: IHouseHoldDetails;
    requiredFields = [] as string[];
    fieldDisplays!: any;
    constructor(
        private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private appService: AppStoreService,
        private router: Router,
        private activedRoute: ActivatedRoute,
        private utilService: UtilService
    ) {}
    ngOnInit() {
        this.adultFosterCareDetailsForm = this.fb.group({
            fosterCareAge: ["", Validators.required],
            state: ["", Validators.required],
        });
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
        });
        this.appService.getStates().subscribe((states) => {
            this.states = states;
            this.cd.detectChanges();
        });
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        this.personsMap =
            { ...this.houseHoldDetails.pageAction?.personsMap } || {};
        this.activedRoute.params.subscribe((p) => {
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.personsMap
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
                this.setFieldProgramValidations(this.currentUser);

                this.adultFosterCareDetailsForm
                    .get("fosterCareAge")
                    .patchValue(
                        this.currentUser.wereYouinFosterCareatAge18orOlder
                            ? this.currentUser
                                  .wereYouinFosterCareatAge18orOlder === "Y"
                                ? "Yes"
                                : "No"
                            : ""
                    );
                this.adultFosterCareDetailsForm
                    .get("state")
                    .patchValue(
                        this.currentUser.wereYouinFosterCareatAge18orOlder
                            ? this.currentUser
                                  .wereYouinFosterCareatAge18orOlder === "Y"
                                ? this.currentUser.stateFosterCare
                                : ""
                            : ""
                    );
                this.cd.detectChanges();
            }
        });
    }
    setFieldProgramValidations(ind: IHouseHold) {
        const indBenfits = this.service?.getAppliedBenefitsForIndividual(
            ind
        ) as string[];
        const fields = [
            {
                fieldName: "fosterCareAge",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                    INDIVIDUAL_PROGRAMS.PE,
                    INDIVIDUAL_PROGRAMS.MI,
                ],
            },
            {
                fieldName: "state",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                    INDIVIDUAL_PROGRAMS.PE,
                    INDIVIDUAL_PROGRAMS.MI,
                ],
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
                formGroup: this.adultFosterCareDetailsForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.adultFosterCareDetailsForm =
                requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
    }
    get f() {
        return this.adultFosterCareDetailsForm.controls;
    }
    onSubmit(): void {
        console.log(this.adultFosterCareDetailsForm.value);
        this.service.validateAllFormFields(this.adultFosterCareDetailsForm);
        const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
        const clonedUpdatedPerson: IHouseHold[] = [];

        this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach(
            (person: IHouseHold) => {
                const clonedPerson = { ...person };
                if (clonedPerson.firstName === this.currentUser.firstName) {
                    (clonedPerson.wereYouinFosterCareatAge18orOlder =
                        this.adultFosterCareDetailsForm.controls[
                            "fosterCareAge"
                        ].value.charAt(0)),
                        (clonedPerson.stateFosterCare =
                            this.adultFosterCareDetailsForm.controls[
                                "state"
                            ].value);
                }
                clonedUpdatedPerson.push(clonedPerson);
            }
        );

        if (storedHouseholdDetails) {
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ houseHoldPersons: clonedUpdatedPerson },
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
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_FOSTER_CARE_DETAILS,
        ]);
    }
}