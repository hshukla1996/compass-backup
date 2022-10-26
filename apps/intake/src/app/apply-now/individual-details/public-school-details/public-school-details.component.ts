import { ChangeDetectorRef, Component, OnInit  } from "@angular/core";
import { FormGroup} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { UtilService } from "../../../shared/services/util.service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import {IHouseHold, IHouseHoldDetails, PageDirection} from "../../household/household-model";
import {
    FormValidatorField,
    RequiredOrOptionalValidatorField,
    Utility,
} from "../../../shared/utilities/Utility";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
@Component({
    selector: "ui-compass-public-school-details",
    templateUrl: "./public-school-details.component.html",
    styleUrls: ["./public-school-details.component.css"],
})
export class PublicSchoolDetailsComponent implements OnInit {
    publicSchoolDetailsForm: FormGroup | any | null;
    data: any;
    nslpMap!: any[];
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    schoolDistricts!: any[];
    applyNowState: IApplyNowState | undefined;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
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
    ) {
        this.data = this.getData();
    }
    ngOnInit() {
        this.publicSchoolDetailsForm = this.fb.group({
            schoolDistrict: [""],
            schoolbuilding: [""],
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
                this.publicSchoolDetailsForm.patchValue({
                    schoolDistrict: this.currentUser?.education?.schoolDistrict,
                    schoolbuilding: this.currentUser?.education?.schoolBuilding,
                });
            }, 500);
            this.cd.detectChanges();
        });
        this.appService.getSchoolDistricts().subscribe((c) => {
            this.schoolDistricts = c;
            console.log(this.schoolDistricts);
            this.cd.detectChanges();
        });
    }
    setFieldProgramValidations(ind: IHouseHold) {
        const indBenfits = this.service?.getAppliedBenefitsForIndividual(
            ind
        ) as string[];
        const fields = [
            {
                fieldName: "schoolDistrict",
                optionalProgram: [],
                requiredProgram: [INDIVIDUAL_PROGRAMS.BL],
            },
            {
                fieldName: "schoolbuilding",
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
                formGroup: this.publicSchoolDetailsForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.publicSchoolDetailsForm =
                requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
    }
    get f() {
        return this.publicSchoolDetailsForm.controls;
    }
    getData() {
        return {
            schoolbuildings: [
                {
                    key: "buidling1",
                    value: "Buidling 1",
                },
                {
                    key: "buidling2",
                    value: "Buidling 2",
                },
            ],
        };
    }
    onSubmit(): void {
        // var district =
        //     this.publicSchoolDetailsForm.get("schoolDistrict").value;
        // console.log(district);
        let isNextPage = false;
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        const storedHouseholdDetails = this.houseHoldDetails;
        const updatedHouseholdPersons =
            this.houseHoldDetails.houseHoldPersons?.map(
                (person: IHouseHold) => {
                    if (person.id === this.currentUser.id) {
                        const personToBeUpdated = { ...person };
                        personToBeUpdated.education = {
                            ...personToBeUpdated.education,
                            schoolDistrict:
                                this.publicSchoolDetailsForm.get(
                                    "schoolDistrict"
                                ).value,
                            schoolBuilding:
                                this.publicSchoolDetailsForm.get(
                                    "schoolbuilding"
                                ).value,
                        };
                        console.log(personToBeUpdated);
                        return personToBeUpdated;
                    } else {
                        return person;
                    }
                }
            );
        if (this.nslpMap != null) {
            isNextPage = this.utilService.isNextPage(this.nslpMap);
        }
        this.nslpMap[parseInt(this.currentUserIndex)] = true;
        const updatedPageAction = {
            ...storedHouseholdDetails?.pageAction,
            nslpMap: {
                ...storedHouseholdDetails?.pageAction?.nslpMap,
                ...this.nslpMap,
            },
            nslpDirection: PageDirection.NEXT,
        };
        if (storedHouseholdDetails)
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ pageAction: updatedPageAction },
                ...{ houseHoldPersons: updatedHouseholdPersons },
            });
        if (this.nslpMap != null) {
            isNextPage = this.utilService.isNextPage(this.nslpMap);
        }
        if (isNextPage) {
            this.utilService
                .getCurrentUserIdPageAction(this.nslpMap, PageDirection.NEXT)
                .subscribe((id: any) => {
                    this.currentUserIndex = id.toString();
                    this.route.navigate([
                        RoutePath.APPLYNOW +
                            "/" +
                            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                            "/" +
                            RoutePath.APPLYNOW_NATIONAL_SCHOOL_LUNCH_PROGRAM,
                        { userId: this.currentUserIndex },
                    ]);
                });
        } else {
            this.route.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_NSLP_SUMMARY,
            ]);
        }
    }
    previous(): void {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_NATIONAL_SCHOOL_LUNCH_PROGRAM,
        ]);
    }
}
