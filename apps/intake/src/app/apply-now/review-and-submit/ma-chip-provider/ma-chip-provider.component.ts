import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators,
  FormControl,
 } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { MaChipService } from "./machip.service";

@Component({
    selector: "compass-ui-ma-chip-provider",
    templateUrl: "./ma-chip-provider.component.html",
    styleUrls: ["./ma-chip-provider.component.scss"],
})
export class MaChipProviderComponent implements OnInit {
    MaChipProviderForm: FormGroup | any;
    applyNowState!: IApplyNowState;
    serviceData!:any;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private service: ApplyNowStoreService,
        private maChipService: MaChipService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit() {
        console.log(this.spinner, "this.spinner");
      //  this.spinner.show();
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.serviceData = this.applyNowState.gettingStartedResponse;
            console.log(this.serviceData);
        });

        const serviceData = { ...this.serviceData };
        serviceData.household = this.service.getHouseholdContracts();

        serviceData.people = {
            individuals: this.service.getHouseHoldDetails.houseHoldPersons,
            absentRelatives: this.service.getHouseHoldDetails.absentRelative,
        };

        /*const serviceData = {
            individuals: [
                {
                    firstName: "string",
                    lastName: "string",
                    middleInitial: "string",
                    suffix: "I",
                    birthDate: "2022-08-03T15:12:50.488Z",
                    gender: "F",
                    isThisIndividualOutsideHousehold: "Yes",
                    isThisPersonAStudent: "Yes",
                    isThisPersonASpouseWidowParentORMinorChildOfAVeteran: "Yes",
                    maritalStatus: "0",
                    spouseName: "string",
                    spouseDeathDate: "string",
                    separationDate: "string",
                    socialSecurityNumber: "string",
                    filingStatus: "string",
                    raceInformation: ["Item1"],
                    hispanicOrigin: "0",
                    isVictimOfDomesticViolence: "Y",
                    hasAliasOrMaidenName: "string",
                    aliasMaidenNameORFormerMarriedName: "string",
                    highestGradeLevelCompleted: "string",
                    fsOrTANFCaseNumber: "string",
                    fstanfIndividualEBTNumber: "string",
                    reviewedForFamilyPlanningServices: "Yes",
                    agreeToFamilyPlanningServiceOnly: "Yes",
                    isAfraidOfPhysicalOrEmotionalOrOtherHarm: "Yes",
                    isHomeless: "Y",
                    isPregnant: "Y",
                    pregnancySummaryInformation: {
                        pregnancyDueDate: "2022-08-10",
                        babiesRequired: "4",
                    },
                    isFederalTaxReturn: "Y",
                    claimAsTaxDependent: "Y",
                    claimTaxDependentPersons: [1660111960170],
                    migrantOrSeasonalWorker: "Y",
                    isTaxDependent: true,
                    taxClaimedPerson: "string",
                    isFederalTribe: "true",
                    federalTribeInformation: {
                        tribeName: "",
                        tribeState: "",
                        receivedIndianHealthService: true,
                        allowedIndianHelathService: true,
                    },
                    federalTribeIncomeInformation: {
                        perCapitaPayments: "Yes",
                        perCapitaPaymentAmount: "12345",
                        perCapitaPaymentFrequency: "string",
                        indianTrustLandPayments: "Yes",
                        indiantTrustLandPaymentAmount: "23456",
                        indiantTrustLandPaymentFrequency: "string",
                        culturalSignificance: "Yes",
                        culturalSignificanceAmount: "111111",
                        culturalSignificanceFrequency: "string",
                    },
                    fsOrTANFBenefits: [0],
                    interestedToVote: "string",
                    veteranRelationInformation: {
                        veteranName: "string",
                        status: "string",
                        branchOfService: "string",
                        dateVeteranEntered: "string",
                        dateVeteranLeft: "string",
                        verteranClaimNumber: "string",
                    },
                    veteran: {
                        status: "0",
                        branchOfService: "string",
                        dateVeteranEntered: "string",
                        dateVeteranLeft: "string",
                        verteranClaimNumber: "string",
                    },
                    education: {
                        schoolName: "string",
                        typeOfSchool: "string",
                        schoolCounty: "string",
                        schoolDistrict: "string",
                        schoolBuilding: "string",
                        partTimeOrFullTime: "string",
                        requiresChildCare: "string",
                        expectedGraduationDate: "string",
                        currentGrade: "string",
                        charterOrPrivateSchoolType: "string",
                        aunNumber: "string",
                    },
                    isIndividualBeingClaimedAsTaxDependent: {
                        codeSpecified: true,
                        individualNumberSpecified: true,
                    },
                    citizenship: {
                        birthFirstName: "string",
                        birthLastName: "string",
                        birthState: "string",
                        birthCounty: "string",
                        citizenshipCode: "Item0",
                        birthCity: "string",
                        mothersMaidenFirstName: "string",
                        mothersMaidenLastName: "string",
                        dateEnteredUS: "string",
                        country: "string",
                        otherCountry: "string",
                        alienRegistrationNumber: "string",
                        documentType: "Item2",
                        documentIDNumber: "string",
                        documentID: "string",
                        i94DocumentNumber: "string",
                        i551CardNumber: "string",
                        passportNumber: "string",
                        passportExpirationDate: "string",
                        insSection: "string",
                        insDocument: "string",
                        otherDocument: "string",
                        identification: {
                            name: "string",
                            licensedState: "string",
                            driversLicenceNumberOrStateId: "string",
                        },
                        sponsor: {
                            typeSpecified: true,
                            sponsorOrganizationName: "string",
                            firstName: "string",
                            middleInitial: "string",
                            lastName: "string",
                            address: {
                                addressLine1: "string",
                                addressline2: "string",
                                city: "string",
                                state: "AL",
                                zip: "string",
                                zipExtension: "string",
                                county: "Item01",
                                isThisAddressEffectiveImmediately: true,
                                addressEffectiveDate: "string",
                            },
                            haveASponsorSpecified: true,
                        },
                    },
                    relationships: [
                        {
                            code: "X",
                            individualNumber: 0,
                        },
                    ],
                    representativeContactInformation: {
                        hasRepresentativeAttorneyOrContact: "string",
                        isAttendingTraining: "string",
                        representativeContactPersons: [
                            {
                                sequenceNumber: 0,
                                sequenceNumberSpecified: true,
                                partOfHousehold: {
                                    individualNumber: "string",
                                },
                                roles: ["C"],
                                firstName: "string",
                                middleInitial: "string",
                                lastName: "string",
                                suffix: "string",
                                relationshipToIndividual: "string",
                                dateOfBirthSpecified: true,
                                homePhoneNumber: "string",
                                workPhone: "string",
                                otherPhoneNumber: "string",
                                preferredMethodOfContact: "string",
                                emailAddress: "string",
                                bestTimeToCall: "string",
                                contactNotes: "string",
                                address: {
                                    addressLine1: "string",
                                    addressline2: "string",
                                    city: "string",
                                    state: "AL",
                                    zip: "string",
                                    zipExtension: "string",
                                    county: "Item01",
                                    isThisAddressEffectiveImmediately: true,
                                    addressEffectiveDate: "string",
                                },
                            },
                        ],
                    },
                    incarcerated: {
                        countyOfPlacement: "string",
                        incarceratedAdmissionDate: "string",
                        incarceratedDischargeDate: "string",
                    },
                    medicalConditions: {
                        disabilityDescription: "string",
                        disabilityOninitDate: "string",
                        medicalConditionsDisability: "string",
                        childDisability: "string",
                        affectsAbilitytoWork: "string",
                        affectsAbilitytoCare: "string",
                        receivingDisabilityIncome: "string",
                        developmentalAge: 0,
                    },
                    individualExistingBenefits: {
                        wasSSIStoppedBecauseSocialSecurityStarted: "string",
                        wasSSIStoppedBecauseSocialSecurityIncreased: "string",
                    },
                    benefitsNotReceivedInformation: {
                        hasAppliedForBenefitButNotReceived: "string",
                        benefits: [
                            {
                                hashKey: "string",
                                code: "string",
                                dateApplied: "string",
                                howMuch: "string",
                                expectedDate: "string",
                            },
                        ],
                    },
                    trainingInformation: {
                        isAttendingTraining: "string",
                        trainings: [
                            {
                                trainingInstitute: "string",
                                trainingStartDate: "string",
                                trainingEndDate: "string",
                                estimatedHoursPerWeekCount: "string",
                            },
                        ],
                    },
                    appliedBenefits: [
                        {
                            benefitName: "HC",
                            isThisRenewal: "Yes",
                            isThisProgramSentByTarget: "Yes",
                            renewalDueDate: "2022-08-03T15:12:50.488Z",
                            beginDate: "2022-08-03T15:12:50.488Z",
                        },
                    ],
                    howManyBabiesExpected: "Item1",
                    isthePersonLivingIndicator: "Yes",
                    individualNumber: 0,
                    individualIncome: {
                        currentEmployment: [
                            {
                                isSelfEmployment: "Yes",
                                name: "string",
                                address: {
                                    addressLine1: "string",
                                    addressline2: "string",
                                    city: "string",
                                    state: "AL",
                                    zip: "string",
                                    zipExtension: "string",
                                    county: "Item01",
                                    isThisAddressEffectiveImmediately: true,
                                    addressEffectiveDate: "string",
                                },
                                phoneNumber: "string",
                                startDate: "2022-08-03T15:12:50.488Z",
                                onStrike: "Yes",
                                numberOfHoursWorkedPerWeek: 0,
                                frequency: "Item1",
                                grossIncome: 0,
                                payRate: 0,
                                mostRecentPayDate: "2022-08-03T15:12:50.488Z",
                            },
                        ],
                        pastEmployment: [
                            {
                                name: "string",
                                address: {
                                    addressLine1: "string",
                                    addressline2: "string",
                                    city: "string",
                                    state: "AL",
                                    zip: "string",
                                    zipExtension: "string",
                                    county: "Item01",
                                    isThisAddressEffectiveImmediately: true,
                                    addressEffectiveDate: "string",
                                },
                                phoneNumber: "string",
                                startDate: "2022-08-03T15:12:50.489Z",
                                endDate: "2022-08-03T15:12:50.489Z",
                                numberOfHoursWorkedPerWeek: 0,
                                mostRecentPayDate: "2022-08-03T15:12:50.489Z",
                            },
                        ],
                        otherIncome: [
                            {
                                incomeType: "string",
                                otherIncomeDescription: "string",
                                frequency: "Item1",
                                grossIncome: 0,
                                mostRecentPayDate: "2022-08-03T15:12:50.489Z",
                                nameOfFinancialInstitution: "string",
                                address: {
                                    addressLine1: "string",
                                    addressline2: "string",
                                    city: "string",
                                    state: "AL",
                                    zip: "string",
                                    zipExtension: "string",
                                    county: "Item01",
                                    isThisAddressEffectiveImmediately: true,
                                    addressEffectiveDate: "string",
                                },
                            },
                        ],
                    },
                    wereYouinFosterCareatAge18orOlder: "Yes",
                    isFosterChild: "Yes",
                    isHeadOfHousehold: "Yes",
                },
            ],
            absentRelatives: [
                {
                    firstName: "string",
                    lastName: "string",
                    middleInitial: "string",
                    suffix: "string",
                    deceased: "Yes",
                    dateOfBirth: "2022-08-03T15:12:50.489Z",
                    socialSecurityNumber: "string",
                    isThisPersonSpouseParentOrBothOfTheHouseholdMember:
                        "string",
                    gender: "string",
                    raceInformation: ["Item1"],
                    hispanicOrigin: "0",
                    address: {
                        addressLine1: "string",
                        addressline2: "string",
                        city: "string",
                        state: "AL",
                        zip: "string",
                        zipExtension: "string",
                        county: "Item01",
                        isThisAddressEffectiveImmediately: true,
                        addressEffectiveDate: "string",
                    },
                    phoneNumber: "string",
                    employer: {
                        employerName: "string",
                        address: {
                            addressLine1: "string",
                            addressline2: "string",
                            city: "string",
                            state: "AL",
                            zip: "string",
                            zipExtension: "string",
                            county: "Item01",
                            isThisAddressEffectiveImmediately: true,
                            addressEffectiveDate: "string",
                        },
                        employerPhoneNumber: "string",
                        employerPhoneNumberExtension: "string",
                    },
                    relationships: "string",
                    childSupport: {
                        payForChildSupport: "Yes",
                        courtOrderedOrVoluntary: "string",
                        voluntaryChildSupportAmount: 0,
                        voluntaryChildSupportAmountFrequency: "string",
                        lastDatePaidVoluntaryChildSupport:
                            "2022-08-03T15:12:50.489Z",
                        voluntaryChildSupportPaidToWhom: "string",
                        courtOrder: {
                            courtName: "string",
                            courtOrderNumber: "string",
                            courtOrderChildSupportAmount: 0,
                            courtOrderChildSupportAmountFrequency: "string",
                            specialTerms: "string",
                        },
                    },
                    nonResidentialProperty: {
                        ownNonResidentialProperty: "Yes",
                        datePurchased: "2022-08-03T15:12:50.489Z",
                        marketValue: 0,
                        address: {
                            addressLine1: "string",
                            addressline2: "string",
                            city: "string",
                            state: "AL",
                            zip: "string",
                            zipExtension: "string",
                            county: "Item01",
                            isThisAddressEffectiveImmediately: true,
                            addressEffectiveDate: "string",
                        },
                    },
                },
            ],
        };*/

      //  this.getListOfHealthCareCoveragesServiceData(serviceData);
        this.MaChipProviderForm = this.fb.group({
            flexRadioDefault: new FormControl("", Validators.required),
        });
    }
    getListOfHealthCareCoveragesServiceData(serviceData: any) {
        // const dw = {
        //     county:
        //         this.houseHoldDetails.Household?.applicantAddress?.county ||
        //         "50",
        // };
        this.maChipService
            .getHealthCareConverages(serviceData)
            .subscribe((result: any) => {
                console.log(result);
                // this.heatingAssistanceData! = result["providers"];
                // setTimeout(() => {
                //     this.householdElectricProviderForm.patchValue({
                //         electricCompany: this.detail?.electricCompany,
                //         acconumber: this.detail?.acconumber,
                //     });
                // }, 500);
                this.spinner.hide();
            });
    }
    previous() {
        this.router.navigate([
            RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_REVIEWANDSUBMIT,
        ]);
    }
    next() {
        this.router.navigate([
            RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_VOTERREGISTRATION,
        ]);

        // this.communityOrganizationForm.markAllAsTouched();
        // if (this.communityOrganizationForm.valid) {
        //     this.route.navigate([
        //         RoutePath.APPLYNOW +
        //             "/" +
        //             RoutePath.APPLYNOW_GETTINGSTARTED_NONPROVIDERREGISTRATION,
        //     ]);
        // }
    }
    //@Output() formState = new EventEmitter<MenuItemState>();
    ngOnDestroy(): void {
        //  this.formState.emit(MenuItemState.COMPLETED);
    }
    checkedClass(e: Event): void {
        const checkbox = e.target as HTMLInputElement | null;
        document
            .querySelectorAll("input[formControlName='flexRadioDefault']")
            .forEach((element) => {
                element.parentElement?.classList.remove("checked");
            });
        checkbox?.parentElement?.classList.add("checked");
    }
}
