import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    EventEmitter,
    OnInit,
    Output,
} from "@angular/core";
import { MenuItemState } from "../../../shared/menu-item-state";
import { FormGroup} from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IHouseHold, IHouseHoldDetails } from "../../household/household-model";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { ApplyNowDrivingLicenseStrategy } from "../../../shared/route-strategies/apply-now/driving-license";
import { PageDirection } from "../general-details/state/general-details-model";
import { RoutePath } from "../../../shared/route-strategies";
import { UtilService } from "../../../shared/services/util.service";
import { AppStoreService } from "../../../app-store-service";
import {
    FormValidatorField,
    RequiredOrOptionalValidatorField, Utility,
} from "../../../shared/utilities/Utility";
import {
    IND_FOSTER_CARE,
    IND_PRIMARY_CARE,
    IND_FOSTER_ADULT,
    INDIVIDUAL_PROGRAMS,
} from "../../../shared/constants/Individual_Programs_Constants";
import {EntryScreenQueueUtil} from "../individuals-entry-gatepost";
@Component({
    selector: "compass-ui-driving-license",
    templateUrl: "./driving-license.component.html",
    styleUrls: ["./driving-license.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ApplyNowDrivingLicenseStrategy],
})
export class DrivingLicenseComponent implements OnInit {
    drivingLicenseForm: FormGroup | any;
    states: any;
    submitted = false;
    showLicenseInfo = false;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    personsMap!: any;
    houseHoldPersons: IHouseHold[] = [];
    houseHoldDetails!: IHouseHoldDetails;
    requiredFields = [] as string[];
    fieldDisplays!: any;
    @Output() formState = new EventEmitter<MenuItemState>();
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private activedRoute: ActivatedRoute,
        private utilService: UtilService,
        private appService: AppStoreService,
        private routingStrategy: ApplyNowDrivingLicenseStrategy,
        private queueService:EntryScreenQueueUtil
    ) {}
    ngOnInit() {
        this.formState.emit(MenuItemState.INPROGRESS);
        this.drivingLicenseForm = this.fb.group({
            licenseStatus: [""],
            licenseID: [""],
            stateID: [""],
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
            if (this.currentUser.licensedState) {
                if (this.currentUser.licensedState === "Y") {
                    this.showLicenseInfo = true;
                    this.cd.detectChanges();
                    this.drivingLicenseForm
                        .get("licenseStatus")
                        .patchValue("Yes");
                } else {
                    this.drivingLicenseForm
                        .get("licenseStatus")
                        .patchValue("No");
                    this.showLicenseInfo = false;
                }
            }
            this.drivingLicenseForm
                .get("stateID")
                .patchValue(
                    this.currentUser.citizenship?.identification?.licensedState
                );
            this.drivingLicenseForm
                .get("licenseID")
                .patchValue(
                    this.currentUser.citizenship?.identification
                        ?.driversLicenceNumberOrStateId
                );
            this.cd.detectChanges();
        });
        this.appService.getStates().subscribe((states) => {
            this.states = states;
            this.cd.detectChanges();
        });
    }
    showLicenseDetails(show: boolean) {
        this.showLicenseInfo = show;
    }
    setFieldProgramValidations(ind: IHouseHold) {
        const indBenfits = this.service?.getAppliedBenefitsForIndividual(
            ind
        ) as string[];
        const fields = [
            {
                fieldName: "licenseID",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.ABR,
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.FSR,
                    INDIVIDUAL_PROGRAMS.LN,
                    INDIVIDUAL_PROGRAMS.LNR,
                    INDIVIDUAL_PROGRAMS.LI,
                    INDIVIDUAL_PROGRAMS.LIR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                    INDIVIDUAL_PROGRAMS.WN,
                    INDIVIDUAL_PROGRAMS.WNR,
                    INDIVIDUAL_PROGRAMS.WAR,
                    INDIVIDUAL_PROGRAMS.ECA,
                ],
                requiredProgram:[]
            },
            {
                fieldName: "stateID",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.HC,
                    INDIVIDUAL_PROGRAMS.MCR,
                    INDIVIDUAL_PROGRAMS.CHR,
                    INDIVIDUAL_PROGRAMS.HA,
                    INDIVIDUAL_PROGRAMS.MAR,
                    INDIVIDUAL_PROGRAMS.ABR,
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.FSR,
                    INDIVIDUAL_PROGRAMS.LN,
                    INDIVIDUAL_PROGRAMS.LNR,
                    INDIVIDUAL_PROGRAMS.LI,
                    INDIVIDUAL_PROGRAMS.LIR,
                    INDIVIDUAL_PROGRAMS.FP,
                    INDIVIDUAL_PROGRAMS.FPR,
                    INDIVIDUAL_PROGRAMS.WN,
                    INDIVIDUAL_PROGRAMS.WNR,
                    INDIVIDUAL_PROGRAMS.WAR,
                    INDIVIDUAL_PROGRAMS.ECA,
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
                formGroup: this.drivingLicenseForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.drivingLicenseForm =
                requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
    }
    get f() {
        return this.drivingLicenseForm.controls;
    }
    previous(): void {
        this.queueService.back();
    }
    isFieldValid(field: string): boolean {
        if (this.drivingLicenseForm.get(field).status !== "VALID") {
            console.log("invalid");
            console.log(field);
            console.log(this.drivingLicenseForm.get(field).touched);
        }
        return (
            this.drivingLicenseForm.get(field).status !== "VALID" &&
            this.drivingLicenseForm.get(field).touched
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            case "licenseStatus":
                if (
                    this.drivingLicenseForm.get("licenseStatus").errors.required
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
        // identification?: {
        //  name: string;
        //  licensedState: string;
        //  driversLicenceNumberOrStateId: string;
        //  };

        //  this.service.updateGeneralDetails(updatedHouseHoldDetails);
        const storedHouseholdDetails = this.houseHoldDetails;
        const getAdults =
            storedHouseholdDetails.houseHoldPersons?.filter(
                (ind: IHouseHold) => {
                    return Utility.getAge(ind.dateOfBirth) > 18;
                }
            ) || [];
        const benefits = this.service.getAppliedBenefitsForIndividual(
            this.currentUser
        );

        const showPrimaryCare = this.service.areProgramsExist(
            benefits as string[],
            IND_PRIMARY_CARE
        );
        const showFosterCare = this.service.areProgramsExist(
            benefits as string[],
            IND_FOSTER_CARE
        );
        const showFosterAdult = this.service.areProgramsExist(
            benefits as string[],
            IND_FOSTER_ADULT
        );
      const showCitizenship =  this.service.areProgramsExist(
        benefits as string[],
        [INDIVIDUAL_PROGRAMS.HC, INDIVIDUAL_PROGRAMS.MCR, INDIVIDUAL_PROGRAMS.CHR,
      INDIVIDUAL_PROGRAMS.HA, INDIVIDUAL_PROGRAMS.MAR, INDIVIDUAL_PROGRAMS.ABR, INDIVIDUAL_PROGRAMS.CA,
          INDIVIDUAL_PROGRAMS.CAR, INDIVIDUAL_PROGRAMS.FS, INDIVIDUAL_PROGRAMS.ES, INDIVIDUAL_PROGRAMS.FSR,
          INDIVIDUAL_PROGRAMS.ESR, INDIVIDUAL_PROGRAMS.LN, INDIVIDUAL_PROGRAMS.LNR, INDIVIDUAL_PROGRAMS.LI,
          INDIVIDUAL_PROGRAMS.LIR, INDIVIDUAL_PROGRAMS.FP, INDIVIDUAL_PROGRAMS.FPR, INDIVIDUAL_PROGRAMS.WN, INDIVIDUAL_PROGRAMS.WNR,
          INDIVIDUAL_PROGRAMS.WAR, INDIVIDUAL_PROGRAMS.MI]
      );
        //iterantive over absent relatives , find the current from the absent relvative map and update address
        const updatedHouseholdPersons =
            this.houseHoldDetails.houseHoldPersons?.map(
                (person: IHouseHold) => {
                    if (
                        person.id?.toString() ===
                        this.currentUser.id?.toString()
                    ) {
                        const personToBeUpdated = { ...person };
                        (personToBeUpdated.licensedState =
                            this.drivingLicenseForm
                                .get("licenseStatus")
                                .value.charAt(0)),
                            (personToBeUpdated.citizenship = {
                                ...person.citizenship,
                                identification: {
                                    name: person.firstName || "",
                                    licensedState:
                                        this.drivingLicenseForm.get("stateID")
                                            .value,
                                    driversLicenceNumberOrStateId:
                                        this.drivingLicenseForm.get("licenseID")
                                            .value,
                                },
                            });

                        return personToBeUpdated;
                    } else {
                        return person;
                    }
                }
            );
        if (storedHouseholdDetails) {
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ houseHoldPersons: updatedHouseholdPersons },
            });
        }
        //this.route.navigate([this.routingStrategy.nextRoute()]);
        if (
            this.currentUser.citizenship?.citizenshipCode !== "1" &&
            showCitizenship
        ) {
            this.route.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_CITIZENSHIP,

                { userId: this.currentUserIndex },
            ]);
        } else if (
            Utility.getAge(this.currentUser.dateOfBirth) < 18 &&
            showPrimaryCare &&
            getAdults?.length > 0
        ) {
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
            showFosterAdult
        ) {
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
            //store current path in session storage
            sessionStorage.setItem(
                "lastpath",
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_DRIVING_LICENSE
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
                        this.currentUserIndex = id.toString();
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

    ngOnDestroy(): void {
        this.formState.emit(MenuItemState.COMPLETED);
    }
}
