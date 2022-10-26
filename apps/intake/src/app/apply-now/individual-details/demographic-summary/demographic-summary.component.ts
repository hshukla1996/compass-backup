import {
    Component,
    ChangeDetectorRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from "@angular/core";

import { Router } from "@angular/router";

import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { IApplyNowState, Programs } from "../../+state/apply-now.models";
import {IHouseHold, IHouseHoldDetails} from "../../household/household-model";
import { PageDirection } from "../../../referrals/+state/referrals.models";
import { Utility } from "../../../shared/utilities/Utility";
import {INDIVIDUAL_PROGRAMS} from "../../../shared/constants/Individual_Programs_Constants";
import { EntryScreenQueueUtil } from "../individuals-entry-gatepost";
import { ApplyNowGeneralDetailsStrategy } from "../../../shared/route-strategies/apply-now/general-details";
import { UtilService } from "../../../shared/services/util.service";
// import { timeStamp } from 'console';

@Component({
    selector: "compass-ui-demographic-summary",
    templateUrl: "./demographic-summary.component.html",
    styleUrls: ["./demographic-summary.component.scss"],
    providers: [ApplyNowGeneralDetailsStrategy],
})
export class DemographicSummaryComponent implements OnInit {
    jsonData: any;
    citizenshipStatus!: any[];
    maritalStatusTypes!: any[];
    educations!: any[];
    countries!: any[];
    docTypes!: any[];
    states!: any[];
    immunizations!: any[];
    races!: any[];
    selectedData!: any[];
    applyNowState!: IApplyNowState;
    houseHoldPersons: IHouseHold[] = [];
    personsMap!: any;
    houseHoldDetails!: IHouseHoldDetails;
    nslpMap: any = {};
    demographicData = {
        questionText: "Your individual details.",
        subHeading:
            "Look below to make sure all individuals in the household are here.",
        toolTip: "",
        questionAnswers: [
            {
                accordionHeader: "{replace} Sample 65 (M)",
                accordionSubHeading: "",
                accordionRightHeading: "",
                accordionRightSubHeading: "",
                userId: 1,
                accordionData: [{}],
                editButton: "Edit",
                deleteButton: "",
            },
        ],
        addtionalButton: "",
    };
    constructor(
        private router: Router,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private appService: AppStoreService,
        private routingStratagy: ApplyNowGeneralDetailsStrategy,
        private queueService: EntryScreenQueueUtil,
        private utilService: UtilService
    ) {}

    ngOnInit(): void {
        this.appService.getCitizenship().subscribe((c) => {
            this.citizenshipStatus = c;
            this.cd.detectChanges();
        });
        this.appService.getMaritalStatus().subscribe((c) => {
            this.maritalStatusTypes = c;
            this.cd.detectChanges();
        });
        this.appService.getEducationData().subscribe((c) => {
            this.educations = c;
            this.cd.detectChanges();
        });
        this.appService.getCountries().subscribe((c) => {
            this.countries = c;
            this.cd.detectChanges();
        });
        this.appService.getDocumentTypes().subscribe((c) => {
            this.docTypes = c;
            this.cd.detectChanges();
        });
        this.appService.getStates().subscribe((states) => {
            this.states = states;
            this.cd.detectChanges();
        });
        this.appService.getImmunizations().subscribe((c) => {
            this.immunizations = c;
            this.cd.detectChanges();
        });
        this.appService.getRaces().subscribe((r) => {
            this.races = r;
            this.cd.detectChanges();
        });
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        this.personsMap =
            {
                ...this.houseHoldDetails.pageAction?.personsMap,
            } || {};
        this.houseHoldPersons =
            this.service.getHouseHoldDetails.houseHoldPersons || [];
        this.houseHoldPersons.forEach((ind, i) => {
            const indBenfits =
                this.service.getAppliedBenefitsForIndividual(ind);
            const isBL = this.service.areProgramsExist(indBenfits, [
                INDIVIDUAL_PROGRAMS.BL,
            ]);
            let formattedEnteredDate;
            let formattedCountry = "";
            let formattedDocument = "";
            let documentExpiryDate = "";
            let spouseDeathDate = "";
            let separationDate = "";
            let formattedState = "";
            let formattedRaces: any[] = [];
            let formattedImmunization = "";
            let guardian: any[] = [];
            let primaryCareTaker: any[] = [];
            if (ind.primaryCareTaker) {
                primaryCareTaker = this.houseHoldPersons.filter(
                    (person: any) =>
                        person.id?.toString() === ind.primaryCareTaker
                );
            }
            if (ind.childCareServices?.parentOrGuardian) {
                guardian = this.houseHoldPersons.filter(
                    (person: any) =>
                        person.id?.toString() ===
                        ind.childCareServices?.parentOrGuardian
                );
            }
            if (ind.citizenship?.dateEnteredUS) {
                const date = <string>ind.citizenship?.dateEnteredUS;
                const [year, month, day] = date.split("-");
                formattedEnteredDate = [month, day, year].join("/");
            }

            if (ind.raceInformation?.length) {
                //console.log(this.races);
                //console.log(ind.raceInformation);

                ind.raceInformation.map((selectedRace: any) => {
                    //console.log(selectedRace);
                    this.races.filter((race: any) => {
                        if (selectedRace == race.id)
                            formattedRaces.push(race.displayValue);
                    });
                });
                console.log(formattedRaces);
            }
            if (ind.citizenship?.country) {
                formattedCountry = this.countries.filter(
                    (c: any) => c.id === ind.citizenship?.country
                )[0].displayValue;
            }
            if (ind.citizenship?.documentType) {
                formattedDocument = this.docTypes.filter(
                    (c: any) => c.id === ind.citizenship?.documentType
                )[0].displayValue;
            }
            if (ind.citizenship?.documentExpiryDate) {
                const date = <string>ind.citizenship?.documentExpiryDate;
                const [year, month, day] = date.split("-");
                documentExpiryDate = [month, day, year].join("/");
            }
            if (ind.spouseDeathDate) {
                const date = <string>ind.spouseDeathDate;
                const [year, month, day] = date.split("-");
                spouseDeathDate = [month, day, year].join("/");
            }
            if (ind.separationDate) {
                const date = <string>ind.separationDate;
                const [year, month, day] = date.split("-");
                separationDate = [month, day, year].join("/");
            }
            if (ind.stateFosterCare) {
                formattedState = this.states.filter(
                    (c: any) => c.id === ind.stateFosterCare
                )[0].displayValue;
            }
            if (ind.childCareServices?.recivedAgeAppropriageImmunizations) {
                formattedImmunization = this.immunizations.filter(
                    (c: any) =>
                        c.id ===
                        ind.childCareServices
                            ?.recivedAgeAppropriageImmunizations
                )[0].displayValue;
            }

            this.demographicData["questionAnswers"][i] = {
                accordionHeader:
                    ind.firstName +
                        " " +
                        ind.lastName +
                        " " +
                        Utility.getAge(ind.dateOfBirth) || "",
                accordionSubHeading: "",
                accordionRightHeading: "",
                accordionRightSubHeading: "",
                userId: ind.id || 0,

                accordionData: [
                    {
                        label: `What is ${ind.firstName}'s citizenship status?`,
                        value: this.citizenshipStatus.filter(
                            (c: any) =>
                                c.id === ind.citizenship?.citizenshipCode
                        )[0].displayValue,
                        bold: false,
                    },
                    {
                        label: `What is ${ind.firstName}'s marital status?`,
                        value: this.maritalStatusTypes.filter(
                            (c: any) => c.id === ind.maritalStatus
                        )[0].displayValue,
                        bold: false,
                    },
                    {
                        label: `What was the name of ${ind.firstName}'s spouse?`,
                        value: <string>ind.spouseName || "",
                        bold: false,
                    },
                    {
                        label: `What was the date of ${ind.firstName}'s spouse's death?`,
                        value: spouseDeathDate,
                        bold: false,
                    },
                    {
                        label: "What was the date of separation?",
                        value: separationDate,
                        bold: false,
                    },
                    {
                        label: `What is the highest grade level completed by ${ind.firstName}?`,
                        value: this.educations.filter(
                            (c: any) => c.id === ind.highestGradeLevelCompleted
                        )[0].displayValue,
                        bold: false,
                    },
                    {
                        label: `Is ${ind.firstName} a runaway?`,
                        value: isBL ? (ind.runaway === "Y" ? "Yes" : "No") : "",
                        bold: false,
                    },
                    {
                        label: `What is ${ind.firstName}'s race?`,
                        value: <string>formattedRaces?.toString() || "",
                        bold: false,
                    },
                    {
                        label: `Is ${ind.firstName} of Hispanic or Latino origin?`,
                        value:
                            <string>ind.hispanicOrigin === "Y"
                                ? "Yes"
                                : "No" || "",
                        bold: false,
                    },
                    {
                        label: `What is ${ind.firstName}'s Social Security Number (SSN)?`,
                        value: <string>ind.socialSecurityNumber,
                        bold: false,
                    },

                    {
                        label: `Does ${ind.firstName} have a Driver's License or State-Issued ID?`,
                        value: <unknown>(
                            ind.citizenship?.identification
                                ?.driversLicenceNumberOrStateId
                        )
                            ? "Yes"
                            : "No",
                        bold: false,
                    },
                    {
                        label: "Driver's License or State ID Number",
                        value: <unknown>ind.citizenship?.identification
                            ? ind.citizenship?.identification
                                  ?.driversLicenceNumberOrStateId
                            : "",
                        bold: false,
                    },
                    {
                        label: "Issuing State",
                        value: <unknown>ind.citizenship?.identification
                            ? ind.citizenship?.identification?.licensedState
                            : "",
                        bold: false,
                    },

                    {
                        label: `When did ${ind.firstName} enter the country?`,
                        value: formattedEnteredDate,
                        bold: false,
                    },
                    {
                        label: `What country did ${ind.firstName} come from?`,
                        value: formattedCountry,
                        bold: false,
                    },
                    {
                        label: "Tell us which country",
                        value: formattedCountry,
                        bold: false,
                    },
                    {
                        label: `What is ${ind.firstName}'s Registration Number?`,
                        value: <string>ind.citizenship?.alienRegistrationNumber,
                        bold: false,
                    },

                    {
                        label: "Document Type",
                        value: formattedDocument,
                        bold: false,
                    },
                    {
                        label: "Document ID Number",
                        value: <string>ind.citizenship?.documentIDNumber,
                        bold: false,
                    },
                    {
                        label: "Document Expiration Date",
                        value: documentExpiryDate,
                        bold: false,
                    },
                    {
                        label: `Does ${ind.firstName} have a sponsor?`,
                        value: ind.citizenship?.sponsor?.haveASponsorSpecified
                            ? "Yes"
                            : "No",
                        bold: false,
                    },
                    {
                        label: "Is the sponsor an individual or an organization?",
                        value: ind.citizenship?.sponsor?.sponsorType
                            ? ind.citizenship?.sponsor?.sponsorType ===
                              "individual"
                                ? "Individual"
                                : "Organization"
                            : "",
                        bold: false,
                    },
                    {
                        label: "Organization Name",
                        value:
                            ind.citizenship?.sponsor?.sponsorOrganizationName ||
                            "",
                        bold: false,
                    },
                    {
                        label: "Sponsor Organization Address",
                        value:
                            ind.citizenship?.sponsor?.sponsorType ===
                            "organization"
                                ? ind.citizenship?.sponsor?.address
                                      ?.addressline2
                                    ? ind.citizenship?.sponsor?.address
                                          ?.addressLine1 +
                                      "\n" +
                                      ind.citizenship?.sponsor?.address
                                          ?.addressline2! +
                                      "\n" +
                                      ind.citizenship?.sponsor?.address?.city +
                                      "\n" +
                                      ind.citizenship?.sponsor?.address?.state +
                                      "\n" +
                                      ind.citizenship?.sponsor?.address?.zip
                                    : ind.citizenship?.sponsor?.address
                                          ?.addressLine1 +
                                          "\n" +
                                          ind.citizenship?.sponsor?.address
                                              ?.city +
                                          "\n" +
                                          ind.citizenship?.sponsor?.address
                                              ?.state +
                                          "\n" +
                                          ind.citizenship?.sponsor?.address
                                              ?.zip || ""
                                : "",
                        bold: false,
                    },
                    {
                        label: "First Name",
                        value: ind.citizenship?.sponsor?.firstName || "",
                        bold: false,
                    },
                    {
                        label: "Middle Initial",
                        value: ind.citizenship?.sponsor?.middleInitial || "",
                        bold: false,
                    },
                    {
                        label: "Last Name",
                        value: ind.citizenship?.sponsor?.lastName || "",
                        bold: false,
                    },

                    {
                        label: "Individual Sponsor Address",
                        value:
                            ind.citizenship?.sponsor?.sponsorType ===
                            "individual"
                                ? ind.citizenship?.sponsor?.address
                                      ?.addressline2
                                    ? ind.citizenship?.sponsor?.address
                                          ?.addressLine1 +
                                      "\n" +
                                      ind.citizenship?.sponsor?.address
                                          ?.addressline2! +
                                      "\n" +
                                      ind.citizenship?.sponsor?.address?.city +
                                      "\n" +
                                      ind.citizenship?.sponsor?.address?.state +
                                      "\n" +
                                      ind.citizenship?.sponsor?.address?.zip
                                    : ind.citizenship?.sponsor?.address
                                          ?.addressLine1 +
                                          "\n" +
                                          ind.citizenship?.sponsor?.address
                                              ?.city +
                                          "\n" +
                                          ind.citizenship?.sponsor?.address
                                              ?.state +
                                          "\n" +
                                          ind.citizenship?.sponsor?.address
                                              ?.zip || ""
                                : "",
                        bold: false,
                    },
                    {
                        label: `Who is the primary caretaker of ${ind.firstName}?`,
                        value: primaryCareTaker[0]
                            ? primaryCareTaker[0].firstName +
                              " " +
                              primaryCareTaker[0].lastName
                            : "",
                        bold: false,
                    },
                    {
                        label: `Is ${ind.firstName} a foster child?`,
                        value:
                            Utility.getAge(ind.dateOfBirth) < 18
                                ? ind.fosterChild?.isFosterChild === "Y"
                                    ? "Yes"
                                    : "No"
                                : "",
                        bold: false,
                    },

                    {
                        label: `How much money is ${ind.firstName} given to use each month?`,
                        value: <number>ind.fosterChild?.amtGivenToEachMonth,
                        bold: false,
                    },
                    {
                        label: `Do you want ${ind.firstName} counted in your household size when calculating meal benefits?`,
                        value:
                            <unknown>ind.fosterChild?.mealBenefit === "Y"
                                ? "Yes"
                                : "No",
                        bold: false,
                    },
                    {
                        label: `Was ${ind.firstName} in foster care at age 18 or older?`,
                        value:
                            ind.wereYouinFosterCareatAge18orOlder === "Y"
                                ? "Yes"
                                : "No",
                        bold: false,
                    },
                    {
                        label: `What state did ${ind.firstName} receive foster care in?`,
                        value: formattedState,
                        bold: false,
                    },
                    {
                        label: `Confirm the parent/guardian of ${ind.firstName}`,
                        value: guardian[0]
                            ? guardian[0].firstName + " " + guardian[0].lastName
                            : "",
                        bold: false,
                    },

                    {
                        label: `What days does ${ind.firstName} need child care?`,
                        value: <number>(
                            ind.childCareServices?.noOfDaysNeedChildCare
                        ),
                        bold: false,
                    },

                    {
                        label: `How many hours per week does ${ind.firstName} need child care?`,
                        value: <number>(
                            ind.childCareServices?.hoursPerWeekNeedhChildCare
                        ),
                        bold: false,
                    },

                    {
                        label: `Has ${ind.firstName} received all age appropriate immunizations?`,
                        value: formattedImmunization,
                        bold: false,
                    },

                    {
                        label: `Confirm the first parent/guardian of ${ind.firstName}`,
                        value: guardian[0]
                            ? guardian[0].firstName + " " + guardian[0].lastName
                            : "",
                        bold: false,
                    },
                    {
                        label: `Confirm the second parent/guardian of ${ind.firstName}`,
                        value: "",
                        bold: false,
                    },
                ],
                editButton: "Edit",
                deleteButton: "",
            };

            this.demographicData["questionAnswers"][i].accordionData.forEach(
                (element: any) => {
                    element.label = !element.value ? "" : element.label;
                }
            );
            this.jsonData = this.demographicData;
        });
    }
    deleteClicked(user: any) {
        this.jsonData["questionAnswers"].forEach((element: any) => {
            if (element["userId"] === user) {
                element["accordionHeader"] = "";
            }
        });
    }

    editClicked(user: any) {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_GENERAL_DETAILS,
            { userId: user },
        ]);
    }
    next() {
        this.houseHoldDetails.selectedForSchoolMeals.forEach((ind: any) => {
            this.nslpMap[ind] = false;
        });
        const updatedPageAction = {
            ...this.houseHoldDetails.pageAction,
            nslpMap: {
                ...this.houseHoldDetails.pageAction?.nslpMap,
                ...this.nslpMap,
            },

            personDirection: PageDirection.NEXT,
        };
        this.service.updateHouseHoldDetails({
            ...this.houseHoldDetails,
            ...{ pageAction: updatedPageAction },
        });
        //console.log(Object.keys(this.nslpMap));
        if (Object.keys(this.nslpMap).length > 0) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_NATIONAL_SCHOOL_LUNCH_PROGRAM,
            ]);
        } else {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUAL_GATEPOST,
            ]);
        }
    }

    addClicked() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_GENERAL_DETAILS,
        ]);
    }

    back(): void {
        const lastUser = this.utilService.getLastUser(this.personsMap);
        const lastPath = sessionStorage.getItem("lastpath");
        const storedHouseholdDetails = this.service.getHouseHoldDetails;
        if (lastUser) {
            this.personsMap[lastUser] = false;
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
                });
            const lastUserObj = this.service.extractUser(
                this.houseHoldPersons,
                lastUser
            );
            this.queueService.initRevDynamicRoutes(
                lastUserObj,
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_DEMOGRAPHIC_SUMMARY
            );
            this.router.navigate([
                RoutePath.APPLYNOW + "/" + lastPath,
                { userId: lastUser },
            ]);
        } else {
            this.router.navigate([this.routingStratagy.previousRoute()]);
        }
    }
}
