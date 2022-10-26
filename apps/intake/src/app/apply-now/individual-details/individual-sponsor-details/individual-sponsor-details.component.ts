import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import { FormGroup} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { RoutePath } from "../../../shared/route-strategies";
import {IHouseHold, IHouseHoldDetails, PageDirection} from "../../household/household-model";
import {IApplyNowState, Programs} from "../../+state/apply-now.models";
import {ApplyNowStoreService} from "../../apply-now-store-service";
import {UtilService} from "../../../shared/services/util.service";
import {AppStoreService} from "../../../app-store-service";
import {
    FormValidatorField,
    RequiredOrOptionalValidatorField,
    Utility,
} from "../../../shared/utilities/Utility";
import {
    IND_FOSTER_CARE,
    IND_PRIMARY_CARE,
    INDIVIDUAL_PROGRAMS
} from "../../../shared/constants/Individual_Programs_Constants";
import { EntryScreenQueueUtil } from "../individuals-entry-gatepost";
@Component({
    selector: "ui-compass-individual-sponsor-details",
    templateUrl: "./individual-sponsor-details.component.html",
    styleUrls: ["./individual-sponsor-details.component.css"],
})
export class IndividualSponsorDetailsComponent implements OnInit {
    individualSponsorDetailsForm: FormGroup | any | null;
    data: any;
    states: any;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    personsMap!: any;
    houseHoldPersons: IHouseHold[] = [];
    houseHoldDetails!: IHouseHoldDetails;
    applyNowState: IApplyNowState | undefined;
    requiredFields = [] as string[];
    fieldDisplays!: any;
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private activedRoute: ActivatedRoute,
        private utilService: UtilService,
        private appService: AppStoreService,
        private queueService: EntryScreenQueueUtil
    ) {}
    ngOnInit() {
        this.individualSponsorDetailsForm = this.fb.group({
            firstName: [""],
            middleName: [""],
            lastName: [""],
            address: [""],
            address2: [""],
            city: [""],
            state: [""],
            zip: [""],
        });
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }

        this.personsMap =
            {
                ...this.houseHoldDetails.pageAction?.personsMap,
            } || {};

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
            

            setTimeout(() => {
                this.individualSponsorDetailsForm.patchValue({
                    firstName: this.currentUser.citizenship?.sponsor?.firstName,
                    lastName: this.currentUser.citizenship?.sponsor?.lastName,
                    address:
                        this.currentUser.citizenship?.sponsor?.address
                            ?.addressLine1,
                    address2:
                        this.currentUser.citizenship?.sponsor?.address
                            ?.addressline2,
                    city: this.currentUser.citizenship?.sponsor?.address?.city,
                    state: this.currentUser.citizenship?.sponsor?.address
                        ?.state,
                    zip: this.currentUser.citizenship?.sponsor?.address?.zip,
                });

            }, 500);
            this.individualSponsorDetailsForm.controls["zip"].setValidators([
                Utility.zipCodeValidator()
            ]);
            this.cd.detectChanges();
        });

        this.appService.getStates().subscribe((states) => {
            this.states = states;
            this.cd.detectChanges();
        });
    }
    setFieldProgramValidations(ind: IHouseHold) {
        const indBenfits = this.service?.getAppliedBenefitsForIndividual(
            ind
        ) as string[];
        const fields = [
            {
                fieldName: "firstName",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.ABR,
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.LN,
                    INDIVIDUAL_PROGRAMS.LNR,
                    INDIVIDUAL_PROGRAMS.LI,
                    INDIVIDUAL_PROGRAMS.LIR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                    INDIVIDUAL_PROGRAMS.WN,
                    INDIVIDUAL_PROGRAMS.WNR,
                    INDIVIDUAL_PROGRAMS.WAR,
                ],
                requiredProgram: [],
            },
            {
                fieldName: "middleName",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.ABR,
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.LN,
                    INDIVIDUAL_PROGRAMS.LNR,
                    INDIVIDUAL_PROGRAMS.LI,
                    INDIVIDUAL_PROGRAMS.LIR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                    INDIVIDUAL_PROGRAMS.WN,
                    INDIVIDUAL_PROGRAMS.WNR,
                    INDIVIDUAL_PROGRAMS.WAR,
                ],
                requiredProgram: [],
            },
            {
                fieldName: "lastName",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.ABR,
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.LN,
                    INDIVIDUAL_PROGRAMS.LNR,
                    INDIVIDUAL_PROGRAMS.LI,
                    INDIVIDUAL_PROGRAMS.LIR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                    INDIVIDUAL_PROGRAMS.WN,
                    INDIVIDUAL_PROGRAMS.WNR,
                    INDIVIDUAL_PROGRAMS.WAR,
                ],
                requiredProgram: [],
            },
            {
                fieldName: "address",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.ABR,
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.LN,
                    INDIVIDUAL_PROGRAMS.LNR,
                    INDIVIDUAL_PROGRAMS.LI,
                    INDIVIDUAL_PROGRAMS.LIR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                    INDIVIDUAL_PROGRAMS.WN,
                    INDIVIDUAL_PROGRAMS.WNR,
                    INDIVIDUAL_PROGRAMS.WAR,
                ],
                requiredProgram: [],
            },
            {
                fieldName: "address2",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.ABR,
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.LN,
                    INDIVIDUAL_PROGRAMS.LNR,
                    INDIVIDUAL_PROGRAMS.LI,
                    INDIVIDUAL_PROGRAMS.LIR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                    INDIVIDUAL_PROGRAMS.WN,
                    INDIVIDUAL_PROGRAMS.WNR,
                    INDIVIDUAL_PROGRAMS.WAR,
                ],
                requiredProgram: [],
            },
            {
                fieldName: "city",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.ABR,
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.LN,
                    INDIVIDUAL_PROGRAMS.LNR,
                    INDIVIDUAL_PROGRAMS.LI,
                    INDIVIDUAL_PROGRAMS.LIR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                    INDIVIDUAL_PROGRAMS.WN,
                    INDIVIDUAL_PROGRAMS.WNR,
                    INDIVIDUAL_PROGRAMS.WAR,
                ],
                requiredProgram: [],
            },
            {
                fieldName: "state",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.ABR,
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.LN,
                    INDIVIDUAL_PROGRAMS.LNR,
                    INDIVIDUAL_PROGRAMS.LI,
                    INDIVIDUAL_PROGRAMS.LIR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                    INDIVIDUAL_PROGRAMS.WN,
                    INDIVIDUAL_PROGRAMS.WNR,
                    INDIVIDUAL_PROGRAMS.WAR,
                ],
                requiredProgram: [],
            },
            {
                fieldName: "zip",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.ABR,
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.LN,
                    INDIVIDUAL_PROGRAMS.LNR,
                    INDIVIDUAL_PROGRAMS.LI,
                    INDIVIDUAL_PROGRAMS.LIR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                    INDIVIDUAL_PROGRAMS.WN,
                    INDIVIDUAL_PROGRAMS.WNR,
                    INDIVIDUAL_PROGRAMS.WAR,
                ],
                requiredProgram: [],
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
                formGroup: this.individualSponsorDetailsForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.individualSponsorDetailsForm =
                requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
    }
    get f() {
        return this.individualSponsorDetailsForm.controls;
    }
    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case "zip":
                if (
                    this.individualSponsorDetailsForm.get("zip").errors.required
                ) {
                    return "Please enter valid zip code";
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }
    isFieldValid(field: string): boolean {
        if (this.individualSponsorDetailsForm.get(field).status !== "VALID") {
        }
        return (
            this.individualSponsorDetailsForm.get(field).status !== "VALID" &&
            this.individualSponsorDetailsForm.get(field).touched
        );
    }
    onSubmit(): void {
         this.service.validateAllFormFields(this.individualSponsorDetailsForm);
        if (this.individualSponsorDetailsForm.status.toLowerCase() !== "valid") {
            return;
        }
        const storedHouseholdDetails = this.houseHoldDetails;
        const updatedHouseholdPersons = this.houseHoldPersons?.map(
            (person: IHouseHold) => {
                if (person.id === this.currentUser.id) {
                    const personToBeUpdated = { ...person };

                    personToBeUpdated.citizenship = {
                        ...person.citizenship,
                        sponsor: {
                            firstName:
                                this.individualSponsorDetailsForm.get(
                                    "firstName"
                                ).value,
                            lastName:
                                this.individualSponsorDetailsForm.get(
                                    "lastName"
                                ).value,
                            address: {
                                addressLine1:
                                    this.individualSponsorDetailsForm.get(
                                        "address"
                                    ).value,
                                addressline2:
                                    this.individualSponsorDetailsForm.get(
                                        "address2"
                                    ).value || "",
                                city: this.individualSponsorDetailsForm.get(
                                    "city"
                                ).value,
                                state: this.individualSponsorDetailsForm.get(
                                    "state"
                                ).value,
                                zip: this.individualSponsorDetailsForm.get(
                                    "zip"
                                ).value,
                                zipExtension: "",
                                county: "",
                                isThisAddressEffectiveImmediately: true,
                                addressEffectiveDate: new Date()
                                    .toISOString()
                                    .slice(0, 10),
                            },
                            haveASponsorSpecified: true,
                            typeSpecified: true,
                            sponsorType: "individual",
                        },
                    };
                    return personToBeUpdated;
                } else {
                    return person;
                }
            }
        );

        const benefits = this.service.getAppliedBenefitsForIndividual(
            this.currentUser
        );
        const adultsInHousehold =
            storedHouseholdDetails.houseHoldPersons?.filter(
                (ind: IHouseHold) => {
                    return Utility.getAge(ind.dateOfBirth) > 18;
                }
            ) || [];
        const showPrimaryCare = this.service.areProgramsExist(
            benefits as string[],
            IND_PRIMARY_CARE
        );
        const showFosterCare = this.service.areProgramsExist(
            benefits as string[],
            IND_FOSTER_CARE
        );
        if (
            Utility.getAge(this.currentUser.dateOfBirth) < 18 &&
            showPrimaryCare &&
            adultsInHousehold.length > 0
        ) {
            if (storedHouseholdDetails) {
                this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });
            }
            this.route.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_PRIMARY_CARETACKER,
                { userId: this.currentUserIndex },
            ]);
        } else if (
            Utility.getAge(this.currentUser.dateOfBirth) >= 18 &&
            Utility.getAge(this.currentUser.dateOfBirth) <= 25 &&
            showFosterCare
        ) {
            if (storedHouseholdDetails) {
                this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });
            }
            this.route.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_ADULT_FOSTER_DETAILS,
                { userId: this.currentUserIndex },
            ]);
        } else {
            let isNextPage = false;
            this.personsMap[this.currentUserIndex] = true;
            sessionStorage.setItem(
                "lastpath",
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_INDIVDUAL_SPONSOR_DETAILS
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
                            this.houseHoldPersons,
                            this.currentUserIndex
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
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_CITIZENSHIP,
            { userId: this.currentUserIndex },
        ]);
    }
    public restrictStSplCharacters(event: any) {
        var inp = String.fromCharCode(event.keyCode);
        if (/[#\\.0-9a-zA-Z\s,-]/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }
    public restrictCharacters(event: any) {
        var inp = String.fromCharCode(event.keyCode);
        if (/[0-9]/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }
    OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    public restrictMidCharacters(event: any) {
        var inp = String.fromCharCode(event.keyCode);
        if (/[a-zA-Z]/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }
}
