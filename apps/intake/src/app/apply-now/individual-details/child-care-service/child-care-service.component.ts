import { ChangeDetectorRef, Component, OnInit  } from "@angular/core";
import { FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { UtilService } from "../../../shared/services/util.service";
import {FormValidatorField, RequiredOrOptionalValidatorField, Utility} from "../../../shared/utilities/Utility";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHold, IHouseHoldDetails, PageDirection } from "../../household/household-model";
import { INDIVIDUAL_PROGRAMS
} from "../../../shared/constants/Individual_Programs_Constants";
import { EntryScreenQueueUtil } from "../individuals-entry-gatepost";
@Component({
    selector: "ui-compass-child-care-service",
    templateUrl: "./child-care-service.component.html",
    styleUrls: ["./child-care-service.component.css"],
})
export class ChildCareServiceComponent implements OnInit {
    childCareServiceForm: FormGroup | any | null;
    data: any;
    immunizations: any;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    personsMap!: any;
    days!: any[];
    houseHoldPersons: IHouseHold[] = [];
    houseHoldDetails!: IHouseHoldDetails;
    applyNowState: IApplyNowState | undefined;
    elders!: IHouseHold[];
    fieldDisplays: any;
    requiredFields: any;

    constructor(
        private fb: FormBuilder,
        private route: Router,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private activedRoute: ActivatedRoute,
        private utilService: UtilService,
        private appService: AppStoreService,
        private queueService: EntryScreenQueueUtil
    ) {
        this.data = this.getData();
    }
    ngOnInit() {
        this.childCareServiceForm = this.fb.group({
            parentOrGuardian: [""],
            firstparentOrGuardian: [""],
            secondparentOrGuardian: [""],
            daysNeedChildCare: [""],
            hrsNeedChildCare: [""],
            immunizations: [""],
        });
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        this.personsMap =
            {
                ...this.houseHoldDetails.pageAction?.personsMap,
            } || {};

        this.elders = this.houseHoldPersons?.filter(
            (person: IHouseHold) => Utility.getAge(person.dateOfBirth) > 18
        );
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

            this.setProgramFieldValidations(this.currentUser);
            setTimeout(() => {
                this.childCareServiceForm.patchValue({
                    parentOrGuardian:
                        this.currentUser.childCareServices?.parentOrGuardian,
                    firstparentOrGuardian:
                        this.currentUser.childCareServices
                            ?.firstparentOrGuardian,
                    secondparentOrGuardian:
                        this.currentUser.childCareServices
                            ?.secondparentOrGuardian,
                    daysNeedChildCare:
                        this.currentUser.childCareServices
                            ?.noOfDaysNeedChildCare,
                    hrsNeedChildCare:
                        this.currentUser.childCareServices
                            ?.hoursPerWeekNeedhChildCare,
                    immunizations:
                        this.currentUser.childCareServices
                            ?.recivedAgeAppropriageImmunizations,
                });
            }, 500);
            this.cd.detectChanges();
        });
        this.appService.getImmunizations().subscribe((c) => {
            this.immunizations = c;
            this.cd.detectChanges();
        });
        this.appService.getChildCareDays().subscribe((d) => {
            this.days = d;
            this.cd.detectChanges();
        });
    }
    setProgramFieldValidations(currentUser: IHouseHold) {
        const applyNowService = this.service;

        const individualBenefits =
            this.service?.getAppliedBenefitsForIndividual(
                currentUser
            ) as string[];

        const fields = [
            {
                fieldName: "parentOrGuardian",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.CI,
                    INDIVIDUAL_PROGRAMS.CIR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.ABR,
                ] as string[],
            },
            {
                fieldName: "firstparentOrGuardian",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.CI,
                    INDIVIDUAL_PROGRAMS.CIR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.ABR,
                ] as string[],
            },
            {
                fieldName: "secondparentOrGuardian",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.CI,
                    INDIVIDUAL_PROGRAMS.CIR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.ABR,
                ],
                requiredProgram: [] as string[],
            },
            {
                fieldName: "daysNeedChildCare",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.CI,
                    INDIVIDUAL_PROGRAMS.CIR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.ABR,
                ] as string[],
            },
            {
                fieldName: "hrsNeedChildCare",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.CI,
                    INDIVIDUAL_PROGRAMS.CIR,
                ] as string[],
            },

            {
                fieldName: "immunizations",
                optionalProgram: [],
                requiredProgram: [
                    INDIVIDUAL_PROGRAMS.CI,
                    INDIVIDUAL_PROGRAMS.CIR,
                ] as string[],
            },
        ] as FormValidatorField[];
        this.fieldDisplays = {};
        fields.forEach((fieldObj: FormValidatorField) => {
            this.fieldDisplays[fieldObj.fieldName] =
                applyNowService.areProgramsExist(individualBenefits, [
                    ...fieldObj.optionalProgram,
                    ...fieldObj.requiredProgram,
                ]);
        });
        if (individualBenefits != null && individualBenefits.length > 0) {
            const requiredOrOptionalValidatorField = {
                selectedPrograms: individualBenefits,
                requiredFields: [],
                formGroup: this.childCareServiceForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.childCareServiceForm =
                requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
    }
    get f() {
        return this.childCareServiceForm.controls;
    }
    getData() {
        return {
            parentOrGuardian: [
                {
                    key: "parent",
                    value: "Parent",
                },
                {
                    key: "grandparent",
                    value: "Grandparent",
                },
                {
                    key: "guardian",
                    value: "Guardian",
                },
            ],

            immunizations: [
                {
                    key: "10",
                    value: "10",
                },
                {
                    key: "15",
                    value: "15",
                },
                {
                    key: "20",
                    value: "20",
                },
            ],
        };
    }
    isFieldValid(field: string): boolean {
        if (this.childCareServiceForm.get(field).status !== "VALID") {
        }
        return (
            this.childCareServiceForm.get(field).status !== "VALID" &&
            this.childCareServiceForm.get(field).touched
        );
    }
    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case "parentOrGuardian":
                if (
                    this.childCareServiceForm.get("parentOrGuardian").errors
                        .required
                ) {
                    return "Parent/Guardian is required.";
                }
                break;
            case "firstparentOrGuardian":
                if (
                    this.childCareServiceForm.get("firstparentOrGuardian")
                        .errors.required
                ) {
                    return "First Parent/Guardian is required.";
                }
                break;
            case "secondparentOrGuardian":
                if (
                    this.childCareServiceForm.get("secondparentOrGuardian")
                        .errors.required
                ) {
                    return "Second Parent/Guardian is required.";
                }
                break;
            case "daysNeedChildCare":
                if (
                    this.childCareServiceForm.get("daysNeedChildCare").errors
                        .required
                ) {
                    return "No. of days are required.";
                }
                break;
            case "hrsNeedChildCare":
                if (
                    this.childCareServiceForm.get("hrsNeedChildCare").errors
                        .required
                ) {
                    return "Hours are required.";
                }
                break;
            case "immunizations":
                if (
                    this.childCareServiceForm.get("immunizations").errors
                        .required
                ) {
                    return "Immunizations are required.";
                }
                break;
            default:
                return "";
                break;
        }

        return "";
    }
    onSubmit(): void {
        console.log(this.childCareServiceForm.value);
        this.service.validateAllFormFields(this.childCareServiceForm);
        if (this.childCareServiceForm.status.toLowerCase() === "valid") {
            let isNextPage = false;
            this.personsMap[this.currentUserIndex] = true;
            sessionStorage.setItem(
                "lastpath",
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_CHILD_CARE_SERVICE
            );
            //store pathsession store
            const storedHouseholdDetails = this.houseHoldDetails;
            const updatedHouseholdPersons = this.houseHoldPersons?.map(
                (person: IHouseHold) => {
                    if (person.id === this.currentUser.id) {
                        let personToBeUpdated = { ...person };
                        personToBeUpdated.childCareServices = {
                            parentOrGuardian:
                                this.childCareServiceForm.get(
                                    "parentOrGuardian"
                                ).value,
                            firstparentOrGuardian:
                                this.childCareServiceForm.get(
                                    "firstparentOrGuardian"
                                ).value,
                            secondparentOrGuardian:
                                this.childCareServiceForm.get(
                                    "secondparentOrGuardian"
                                ).value,
                            noOfDaysNeedChildCare:
                                this.childCareServiceForm.get(
                                    "daysNeedChildCare"
                                ).value,
                            hoursPerWeekNeedhChildCare:
                                this.childCareServiceForm.get(
                                    "hrsNeedChildCare"
                                ).value,
                            recivedAgeAppropriageImmunizations:
                                this.childCareServiceForm.get("immunizations")
                                    .value,
                        };
                        return personToBeUpdated;
                    } else {
                        return person;
                    }
                }
            );
            const updatedPageAction = {
                ...storedHouseholdDetails?.pageAction,
                personsMap: {
                    ...storedHouseholdDetails?.pageAction?.personsMap,
                    ...this.personsMap,
                },
                serviceDirection: PageDirection.NEXT,
            };
            if (storedHouseholdDetails)
                this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ pageAction: updatedPageAction },
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });
            if (this.personsMap != null) {
                isNextPage = this.utilService.isNextPage(this.personsMap);
            }
            if (isNextPage) {
                this.utilService

                    .getCurrentUserIdPageAction(
                        this.personsMap,
                        PageDirection.NEXT
                    )

                    .subscribe((id: any) => {
                        this.currentUserIndex = id;
                        this.currentUser = this.service.extractUser(
                            this.currentUserIndex,
                            this.houseHoldPersons
                        );
                        this.queueService.initDynamicRoutes(
                            this.currentUser,
                            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                                "/" +
                                RoutePath.APPLYNOW_DEMOGRAPHIC_SUMMARY
                        );
                        this.queueService.navigateToPath();
                    });

                // this.init();
            } else {
                this.route.navigate([
                    RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                        "/" +
                        RoutePath.APPLYNOW_DEMOGRAPHIC_SUMMARY,
                ]);
            }
        }
    }
    previous(): void {
        if (Utility.getAge(this.currentUser.dateOfBirth) < 18) {
            this.route.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_FOSTER_CARE_DETAILS,
                { userId: this.currentUserIndex },
            ]);
        } else if (
            Utility.getAge(this.currentUser.dateOfBirth) >= 18 &&
            Utility.getAge(this.currentUser.dateOfBirth) <= 25
        ) {
            this.route.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_ADULT_FOSTER_DETAILS,
                { userId: this.currentUserIndex },
            ]);
        }
    }
}
