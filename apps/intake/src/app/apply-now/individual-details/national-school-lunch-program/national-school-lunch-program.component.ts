import { ChangeDetectorRef, Component, OnInit  } from "@angular/core";
import { FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { UtilService } from "../../../shared/services/util.service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import {IHouseHold, IHouseHoldDetails} from "../../household/household-model";
import {
    FormValidatorField,
    RequiredOrOptionalValidatorField,
    Utility,
} from "../../../shared/utilities/Utility";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";

@Component({
    selector: "ui-compass-national-school-lunch-program",
    templateUrl: "./national-school-lunch-program.component.html",
    styleUrls: ["./national-school-lunch-program.component.css"],
})
export class NationalSchoolLunchProgramComponent implements OnInit {
    nationalSchoolLunchProgramForm: FormGroup | any | null;
    data: any;
    schoolTypes!: any;
    schoolGrades!: any;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    nslpMap!: any;
    counties!: any;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    applyNowState: IApplyNowState | undefined;
    requiredFields = [] as string[];
    fieldDisplays!: any;
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private service: ApplyNowStoreService,
        private activedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private utilService: UtilService,
        private appService: AppStoreService
    ) {}
    ngOnInit() {
        this.nationalSchoolLunchProgramForm = this.fb.group({
            grade: ["", Validators.required],
            country: ["", Validators.required],
            schoolType: ["", Validators.required],
        });
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        this.nslpMap =
            {
                ...this.houseHoldDetails.pageAction?.nslpMap,
            } || {};

        this.activedRoute.params.subscribe((p) => {
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(this.nslpMap);
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

            setTimeout(() => {
                this.nationalSchoolLunchProgramForm.patchValue({
                    grade: this.currentUser?.education?.currentGrade,
                    country: this.currentUser?.education?.schoolCounty,
                    schoolType:
                        this.currentUser?.education?.charterOrPrivateSchoolType,
                });
            }, 500);
            this.cd.detectChanges();
        });

        this.appService.getSchoolGrades().subscribe((c: any) => {
            this.schoolGrades = c;
            this.cd.detectChanges();
        });
        this.appService.getCounties().subscribe((c: any) => {
            this.counties = c.tableRows;
            this.cd.detectChanges();
        });

        this.appService.getNSLPSchoolTypes().subscribe((c: any) => {
            this.schoolTypes = c;
            this.cd.detectChanges();
        });
    }
    isFieldValid(field: string): boolean {
        if (this.nationalSchoolLunchProgramForm.get(field).status !== "VALID") {
        }
        return (
            this.nationalSchoolLunchProgramForm.get(field).status !== "VALID" &&
            this.nationalSchoolLunchProgramForm.get(field).touched
        );
    }
    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case "grade":
                if (
                    this.nationalSchoolLunchProgramForm.get("grade").errors
                        .required
                ) {
                    return "Grade is required.";
                }
                break;
            case "country":
                if (
                    this.nationalSchoolLunchProgramForm.get("country").errors
                        .required
                ) {
                    return "Country is required.";
                }
                break;
            case "schoolType":
                if (
                    this.nationalSchoolLunchProgramForm.get("schoolType").errors
                        .required
                ) {
                    return "School Type is required.";
                }
                break;

            default:
                return "";
                break;
        }

        return "";
    }
    setFieldProgramValidations(ind: IHouseHold) {
        const indBenfits = this.service?.getAppliedBenefitsForIndividual(
            ind
        ) as string[];
        const fields = [
            {
                fieldName: "grade",
                optionalProgram: [],
                requiredProgram: [INDIVIDUAL_PROGRAMS.BL],
            },
            {
                fieldName: "country",
                optionalProgram: [],
                requiredProgram: [INDIVIDUAL_PROGRAMS.BL],
            },
            {
                fieldName: "schoolType",
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
                formGroup: this.nationalSchoolLunchProgramForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.nationalSchoolLunchProgramForm =
                requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
    }
    get f() {
        return this.nationalSchoolLunchProgramForm.controls;
    }

    onSubmit(): void {
        this.service.validateAllFormFields(this.nationalSchoolLunchProgramForm);
        if (
            this.nationalSchoolLunchProgramForm.status.toLowerCase() === "valid"
        ) {
            var nslpType =
                this.nationalSchoolLunchProgramForm.get("schoolType").value;
            const storedHouseholdDetails = this.houseHoldDetails;
            const updatedHouseholdPersons =
                this.houseHoldDetails.houseHoldPersons?.map(
                    (person: IHouseHold) => {
                        if (person.id === this.currentUser.id) {
                            const personToBeUpdated = { ...person };
                            personToBeUpdated.education = {
                                ...personToBeUpdated.education,
                                currentGrade:
                                    this.nationalSchoolLunchProgramForm.get(
                                        "grade"
                                    ).value,
                                schoolCounty:
                                    this.nationalSchoolLunchProgramForm.get(
                                        "country"
                                    ).value,
                                charterOrPrivateSchoolType:
                                    this.nationalSchoolLunchProgramForm.get(
                                        "schoolType"
                                    ).value,
                            };
                            console.log(personToBeUpdated);
                            return personToBeUpdated;
                        } else {
                            return person;
                        }
                    }
                );

            if (storedHouseholdDetails)
                this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });

            if (nslpType.toLowerCase() == "p") {
                this.route.navigate([
                    RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                        "/" +
                        RoutePath.APPLYNOW_PUBLIC_SCHOOL_DETAILS,
                    { userId: this.currentUserIndex },
                ]);
            } else {
                this.route.navigate([
                    RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                        "/" +
                        RoutePath.APPLYNOW_CHARTER_SCHOOL_DETAILS,
                    { userId: this.currentUserIndex },
                ]);
            }
        }
    }
    previous(): void {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_DEMOGRAPHIC_SUMMARY,
        ]);
    }
}
