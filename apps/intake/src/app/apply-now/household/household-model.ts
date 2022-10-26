import {

    IBenefitsNotReceivedInformation,
    IPregnancySummaryScreenDetails,
} from "../+state/apply-now.models";
import { IAddress } from "../../referrals/+state/contact-information-model";
import { IResource } from "../resources/+state/resources-state-model";
import { IResourcesDetails } from "../resources/state/resources-state-model";
export interface IPrimaryHousehold {
    applicantAddress?: IHouseholdAddress;
    HeadofHousehold?: string;
    previousAddress?: IHouseholdAddress;
    mailingAddress?: IHouseholdAddress;
    fromHowManyYearsAtThisAddress?: string;
    fromHowManyMonthsAtThisAddress?: string;
    doYouPreferSeperateMailingAddress?: string;
}
export interface INursingFacility {
    NursingFacilityDetails?: INursingFacilityDetails;
}

export interface IHouseHoldDetails {
    Household: IPrimaryHousehold;
    householdHead: IHouseHold;
    HeadofHousehold: string;
    householdBenefitDetails: IHouseholdBenefitsDetails;
    householdElectricProvider: IHouseholdElectricProvider;
    householdBenefitsAppliedBefore: IHouseholdBenefitsAppliedBefore;
    householdWaterQuestions: IHouseholdWaterQuestions;
    householdGatepost: IHouseholdGatepost;
    householdCountyRecNo: IHouseholdCountyRecNo;
    householdFoodStamps: IHouseholdFoodStamps;
    householdHeadSelection: string;
    houseHoldPersons?: IHouseHold[];
    absentRelative?: IAbsentRelative[];
    nursingFacility: INursingFacility;
    nonResidentialProperty: any;
    absentRelativeChildSupport: IAbsentRelativeChildSupport;
    absentRelativeChildSupportDetails: IAbsentRelativeChildSupportDetails;
    selectedForCoverage: string[];
    selectedForSnapScreen: string[];
    selectedForCashAssitance: string[];
    selectedForChildCareCost: string[];
    selectedForSchoolMeals: string[];
    selectedForLongtermLivingServices: string[];
    IsThisIndividualOutsideHousehold: string[];
    householdWhoApplyLtc: string[];
    areYouWantToApplyLTC?: string | undefined;
    responsibleRelative: string[];
    //householdAddress : IHouseholdAddress;
    householdAddressSelection: string[];
    pageAction: PageAction;
    individualSituations: any;
    individualLegalSituations: any;
    individualMedicalSituations: any;
    otherVetPerson?: IHouseHold;
    // householdTypeOfFacility: IhoseholdTypeofFacility[];
    householdSnapDisbility?: IhouseholdSnapDisability;
    householdPreviousAddress: IHouseholdPreviousAddress;
    householdLivedInPA: IHouseholdLivedInPA;
    householdContactInfo: IHouseholdContactInfo;
    // householdSnapDisbility?: IHouseHold;
    livSituation?: any;
    effDate?: string;
    houSituation?: any;
    othHouSituation?: string;
    allowance?: any;
    householdGatepostValue: any;
    income?: IHouseholdIncome;
    expenses?: IExpenses;
    resources?: IResources;
    incomeSituations: any;
    resourceSituations: any;
}
export enum PageDirection {
    BACK = "BACK",
    NEXT = "NEXT",
}
export interface PageAction {
    federalTaxReturnMap?: any;
    federalTaxIncomeMap?: any;
    taxDependentMap?: any;
    claimTaxDependentMap?: any;
    whoWillBeTaxClaimedMap?: any;
    federalRecoganizedMap?: any;
    pregnancyMap?: any;
    receivedLongTermServicesMap?: any;
    nursingHomeMap?: any;
    serviceDirection?: string;
    absentRelativeMap?: any;
    personsMap?: any;
    personDirection?: string;
    studentsMap?: any;
    studentDirection?: string;
    trainingsMap?: any;
    trainingDirection?: string;
    militaryMap?: any;
    militartDirection?: string;
    vetrelativeMap?: any;
    vetrelativeDirection?: string;
    poaMap?: any;
    poaDirection?: string;
    nslpMap?: any;
    nslpDirection?: string;
    currentSnapOrTanfMap?: any;
    currenSnapOrTanfDirection?: string;
    currentlyInPrisonMap?: any;
    currentlyInPrisonDirection?: string;
    financialHoldingsMap?: any;
    residentialPropertyMap?: any;
    currentEmploymentDetailsMap?: any;
    currentEmploymentDetailsDirection?: string;
    pastEmploymentDetailsMap?: any;
    pastEmploymentDetailsDirection?: string;
    otherIncomeDetailsMap?: any;
    otherIncomeDetailsDirection?: string;
    medicalConditionMap?: any;
    medicalConditionDirection?: string;
    childSupportMap?: any;
    childSupportDirection?: string;
    alimonyMap?: any;
    alimonyDirection?: string;
    adultCareMap?: any;
    adultCareDirection?: string;
    legalfeeMap?: any;
    legalfeeDirection?: string;
    transportationMap?: any;
    transportationDirection?: string;
    medicalMap?: any;
    medicalDirection?: string;
    taxdeductableMap?: any;
    taxdeductableDirection?: any;
    sharedExpensesMap?: any;
    sharedExpensesDirection?: string;
}

//export interface ICitizenship {
//   absentRelativeMap?: any,

//   personsMap?: any,
//   personDirection?: string,
//  }
export interface ICitizenship {
    citizenshipCode?: string;
    dateEnteredUS?: string;
    country?: string;
    otherCountry?: string;
    alienRegistrationNumber?: string;
    documentType?: string;
    documentExpiryDate?: string;
    documentIDNumber?: string;
    identification?: {
        name: string;
        licensedState: string;
        driversLicenceNumberOrStateId: string;
    };
    sponsor?: {
        typeSpecified?: boolean;
        sponsorType: string;
        sponsorOrganizationName?: string;
        firstName?: string;
        middleInitial?: string;
        lastName?: string;
        address?: {
            addressLine1: string;
            addressline2: string;
            city: string;
            state: string;
            zip: string;
            zipExtension: string;
            county: string;
            isThisAddressEffectiveImmediately: boolean;
            addressEffectiveDate: string;
        };
        haveASponsorSpecified?: boolean;
    };
}

export interface IHouseholdLivedInPA {
    years: string;
    months: string;
    monthsMoved: string;
}

export interface IHouseholdContactInfo {
    mainContact?: string;
    mainContactRad?: string;
    secContact?: string;
    secContactRad?: string;
    othContact?: string;
    othContactRad?: string;
    email?: string;
    confirmEmail?: string;
    contact?: string;
}
export interface IHouseholdPreviousAddress {
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    county: string;
    phoneNo: string;
}

export interface IHouseholdGatepost {
    chkSsn: string;
    chkHousing: string;
    chkCashAssis: string;
    chkFoodStamp: string;
    chkIncomeBefTax: string;
    chkCheckingAC: string;
    chkObtaiFoodStamps: string;
    chkAge: string;
    chkSpouse: string;
    chkHelp: string;
    chkMembers: string;
    chkNursing: string;
    chkMortgage: string;
    chkEveryone: string;
    chkMedical: string;
    chkBenefitApp: string;
    chkNone: string;
}

export interface IHouseholdFoodStamps {
    name: string;
    ssn: string;
    address: string;
    address2: string;
    city: string;
    county: string;
    state: string;
    zip: string;
    phoneNo: string;
}

export interface IHouseholdCountyRecNo {
    recordNo: string;
}

export interface IhoseholdTypeofFacility {
    // userId?:string;
    typeofnursingHome?: string;
}

export interface IhouseholdSnapDisability {
    isPermenantDisability: string;
    isage60permenantlydisabled: string;
    earningsfordisabled: string;
}

export interface IRelationships {
    individualLookupId: number;
    relationshipType: string;
}
interface IEducation {
    schoolName?: string;
    typeOfSchool?: string;
    schoolCounty?: string;
    schoolDistrict?: string;
    schoolBuilding?: string;
    partTimeOrFullTime?: string;
    requiresChildCare?: string;
    expectedGraduationDate?: string;
    currentGrade?: string;
    charterOrPrivateSchoolType?: string;
    aunNumber?: string;
    charterOrPrivateSchoolName?: string;
}
export interface ITrainingDetails {
    trainingInstitute: string;
    trainingStartDate: string;
    trainingEndDate: string;
    estimatedHoursPerWeekCount: string;
}
export interface ITraining {
    isAttendingTraining: string;
    trainings: ITrainingDetails[];
}
export interface IVeteran {
    status?: string;
    branchOfService?: string;
    dateVeteranEntered?: string;
    dateVeteranLeft?: string;
    verteranClaimNumber?: string;
}
export interface IRepresentative {

    sequenceNumber?: string;
    sequenceNumberSpecified?: boolean;
    partOfHousehold?: {
        individualNumber: string;
    };
    roles?: string[];
    firstName?: string;
    middleInitial?: string;
    lastName?: string;
    suffix?: string;
    relationshipToIndividual?: string;
    dateOfBirthSpecified?: boolean;
    homePhoneNumber?: string;
    workPhone?: string;
    otherPhoneNumber?: string;
    preferredMethodOfContact?: string;
    emailAddress?: string;
    bestTimeToCall?: string;
    contactNotes?: string;
    address?: {
        addressLine1?: string;
        addressline2?: string;
        city?: string;
        state?: string;
        zip?: string;
        zipExtension?: string;
        county?: string;
        isThisAddressEffectiveImmediately?: boolean;
        addressEffectiveDate?: string;
    };
}
export interface IChildSupportExpenses {
    amountOfSupportOrder?: string;
    amountActuallyPaid?: string;
    frequency?: string;
}
export interface IAlimony {
    amountActuallyPaid?: string;
    frequency?: string;
}
export interface IChildAdultCare {
    isCareExpensesPaidForWork: string;
    jobPaidFor: string;
    careReceivedBy: string;
    careExpensesAmount: string;
    careExpensesFrequency: string;
}
export interface ITransportExpenses {
    employer?: string;
    costPerWeek?: string;
    milesDrivenForJob?: string;
    montlyCarPayment?: string;
    otherIncomeType?:string;
}
export interface IMedicalExpenses {
    willExpensesContinue: string;
    amountActuallyPaid: string;
    subExpenseType: string;
    frequency: string;
}
export interface ITaxDeductableExpenses {
    soruceOfDeductibleExpenses?: string;
    whatIsTheAmount?: string;
    taxHowOftenIsPaid?: string;
    taxDeductibleExpenceBeginDate?: string;
    taxDeductibleExpenceEndDate?: string;
}
export interface ILegalFeeExpenses {
    legalFeeExpenses?: string
}
export interface IHouseHold {
    id?: number;
    dateOfBirth?: string;
    firstName?: string;
    gender?: string;
    lastName?: string;
    midName?: string;
    otherName?: string;
    otherNameVal?: string;
    suffix?: string;
    memberRelationships?: IRelationships[];
    relationship?: string;
    // getrelationships?: IRelationships[];
    trainingInformation?: ITraining;
    milataryStatus?: string;
    veteran?: IVeteran;
    benefits?: any;
    runaway?: string;
    maritalStatus?: string;
    citizenship?: ICitizenship;
    licensedState?: string;
    education?: IEducation;
    socialSecurityNumber?: string;
    interestedToVote?: string;
    spouseName?: string;
    spouseDeathDate?: string;
    separationDate?: string;
    highestGradeLevelCompleted?: string;
    raceInformation?: string[];
    hispanicOrigin?: string;
    primaryCareTaker?: string;
    isThisPersonASpouseWidowParentORMinorChildOfAVeteran?: string;
    veteranRelationInformation?: {
        veteranName?: string;
        status?: string;
        branchOfService?: string;
        dateVeteranEntered?: string;
        dateVeteranLeft?: string;
        verteranClaimNumber?: string;
        relatives?: any[];
    };
    representativeContactInformation?: {
        hasRepresentativeAttorneyOrContact?: string;
        isAttendingTraining?: string;
        representativeContactPersons?: IRepresentative[];
    };
    wereYouinFosterCareatAge18orOlder?: string;
    stateFosterCare?: string;
    fosterChild?: {
        isFosterChild?: string;
        amtGivenToEachMonth?: number;
        mealBenefit?: string;
    };
    childCareServices?: {
        parentOrGuardian?: string;
        firstparentOrGuardian?: string;
        secondparentOrGuardian?: string;
        noOfDaysNeedChildCare?: number;
        hoursPerWeekNeedhChildCare?: number;
        recivedAgeAppropriageImmunizations?: string;
    };
    currentEducation?: {
        schoolName: string;
        schoolType: string;
        fullOrPartTime: string;
        educationEndDate: string;
    };
    expense?: {
        childSupportExpenses?: IChildSupportExpenses[];
        alimonyExpenses?: IAlimony[];
        childOrAdultCareExpenses?: IChildAdultCare[];
        medicalExpenses?: IMedicalExpenses[];
        transportExpenses?: ITransportExpenses[];
        taxDeductableExpenses?: ITaxDeductableExpenses[];
        legalFeeExpenses?: ILegalFeeExpenses[];
    };

    isPregnant?: string;
    isFederalTaxReturn?: string;
    isReceivedLongTermService?: string;
    isReceivedLongTermDetails?: string;
    isClosedOrEmptiedAccount?: string;
    isTaxDependent?: boolean;
    isHomeless?: string;
    isMedical?: boolean;
    isHealthSustainingMedication?: boolean;
    isPaidMedicalBills?: boolean;
    migrantOrSeasonalWorker?: string;
    isSummonedOrWarrant?: boolean;
    isFederalTribe?: boolean;
    taxClaimedPerson?: string;
    isClaimTaxDependent?: boolean;
    claimTaxDependentPersons?: number[];
    filingStatus?: string;
    claimAsTaxDependent?: string;
    federalTribeInformation?: IFederalTribeInfo;
    federalTribeIncomeInformation?: IFederalTribeIncomeInfo;
    pregnancySummaryInformation?: IPregnancySummaryScreenDetails;
    IsThisIndividualOutsideHousehold?: string;
    isVictimOfDomesticViolence?: string;
    householdTypeOfFacility?: IhoseholdTypeofFacility;
    // householdTypeOfFacility?: string;
    householdSnapDisbility?: IhouseholdSnapDisability;
    isThisIndividualHeadOfHousehold?: string;
    fsOrTANFBenefits?: ISnapOrTanfBenefits[];
    fsOrTANFCaseNumber?: IFsOrTANFCaseNumber | null;
    fstanfIndividualEBTNumber?: IFstanfIndividualEBTNumber | null;
    snapOrTanfBenefitsDetails?: ISnapOrTanfDetails | null;
    individualExistingBenefits?: IIndividualExistingBenefits | null;
    incarcerated?: IIncarcerationDetails | null;
    medicalConditionDetails?: IMedicalConditionDetails | null;
    hasFinancialHoldings?: string;
    hasResidentialProperty?: string;
    reviewedForFamilyPlanningServices?: string;
    agreeToFamilyPlanningServiceOnly?: string;
    isAfraidOfPhysicalOrEmotionalOrOtherHarm?: string;
    benefitsNotReceivedInformation?: IBenefitsNotReceivedInformation;
    individualIncome?: IIndividualIncome;
}

export interface IHouseholdBenefitsDetails {
    chkHealthCareCoverage?: boolean;
    chkFoodAssistance: boolean;
    chkCashAssistance: boolean;
    chkFreeSchoolMeals: boolean;
    chkHeatingBills: boolean;
    chkChildcareCosts: boolean;
    chkWaterBill: boolean;
    chkServiceCommunity: boolean;
    chkServiceFacility: boolean;
}

export interface IAbsentRelativeRace {
    chkBlackOrAfricanAmerican?: boolean;
    chkNativeAlaskanOrAmericanIndian?: boolean;
    chkAsian?: boolean;
    chkNativeHawaiianOrPacificIslander?: boolean;
    chkWhiteOrCaucasian?: boolean;
    chkOther?: boolean;
    chkUnknown?: boolean;
}

export interface IHouseholdElectricProvider {
    electricCompany: string;
    acconumber: string;
}

export interface IHouseholdBenefitsAppliedBefore {
    state: string;
    county: string;
}

export interface IHouseholdWaterQuestions {
    waterRent: string;
    wasteRent: string;
    payingForDrinkingWater: string;
}

export interface IAbsentRelative {
    id?: number;
    firstName?: string;
    lastName?: string;
    midName?: string;
    suffix?: string;
    deceased?: boolean;
    dateOfBirth?: string;
    socialSecurityNumber?: string;
    isThisPersonSpouseParentOrBothOfTheHouseholdMember?: boolean;
    gender?: string;
    raceInformation?: string[];
    hispanicOrigin?: string;
    Address?: {
        AddressLine1?: string;
        AddressLine2?: string;
        City?: string;
        State?: string;
        Zip?: string;
        ZipExtension?: string;
        County?: string;
        IsThisAddressEffectiveImmediately?: boolean;
        AddressEffectiveDate?: string;
        PhoneNumber?: string;
    };
    Employer?: {
        EmployerName?: string;
        Address?: {
            AddressLine1?: string;
            AddressLine2?: string;
            City?: string;
            State?: string;
            Zip?: string;
            ZipExtension?: string;
            County?: string;
            IsThisAddressEffectiveImmediately?: boolean;
            AddressEffectiveDate?: string;
        };
        EmployerPhoneNumber?: string;
        EmployerPhoneNumberExtension?: string;
    };
    relationships?: string[];
    // Relationships?: string;
    childSupport?: {
        payForChildSupport?: string | undefined;
        courtOrderedOrVoluntary?: string;
        voluntaryChildSupportAmount?: string;
        VoluntaryChildSupportAmountFrequency?: string;
        lastDatePaidVoluntaryChildSupport?: string;
        voluntaryChildSupportPaidToWhom?: string;
        courtOrder?: {
            courtName?: string;
            courtOrderNumber?: string;
            courtOrderChildSupportAmount?: string;
            courtOrderDate?: string;
            courtOrderChildSupportAmountFrequency?: string;
            specialTerms?: string;
        };
    };

    nonResidentialProperty?: IAbsentRelativeNonResidentialProperty;
}
export interface ISharedHouseHoldExpenses {
    shareExpensesWith?: string;
    whichExpenseDoYouShare?: string;
    howMuchDoYouContribute?: string;
    sharedHowOften?: string;
}

export interface IResources {
    anyoneHaveBurialORTrustAgreementWithBankORFuneralHome?: IBurialTrustAgreement;
    anyoneHaveClosedDetails?: IClosedEmptyAccounts;
    anyoneHaveLifeInsurancePolicy?: ILifeInsurancePolicy;
    anyoneHaveCash?: IAnyoneHaveCash;
    anyoneOwnAHome?: IAnyoneOwnAHome;
    anyoneExpectingAnyResources?:IAnyoneExpectingAnyResources,
    anyoneOwnorBuyingVehicle?: IAnyOwnORBuyingVehicle ;
    anyoneOwnaBurialSpace?: IAnyoneOwnBurialSpaceORPlot;
    nonresidentialProperty?: IAnyoneBuyingNonResidentProperty;
    hasMemberSoldTransferedProperty?: ISoldTransferredProperty;
}

export interface IClosedEmptyAccounts {
    code?: string | null;
    accountDetails?: IClosedEmptyAccountDetails[];
}

export interface IClosedEmptyAccountDetails {
    accountType?: string,
    otherAccountTye?: string,
    location?: string,
    accountNumber?: string,
    accountDateClosedDate?: string, 
    owner?: number[],
    ownerName?: string   
}

export interface ISoldTransferredProperty {
    code?: string | null;
    propertyDetails?: ISoldTransferredPropertyDetails[];
}

export interface ISoldTransferredPropertyDetails {
    soldPropertyDescription?: string,
    valueOfSoldProperty?: string,
    nameofResourceTransferedTo?: string,
    relationship?: string,
    datePropertySold?: string,
    circumstancesDescription?: string
}

export interface ILifeInsurancePolicy {
    code?: string | null;
    insurancePolicyCollection?: ILifeInsurancePolicyDetails[];
}

export interface ILifeInsurancePolicyDetails {
    owner?: string[],
    ownerName?: string,
    otherPolicyHolderName?: string,
    companyName?: string,
    policyNumber?: string,
    policyFaceValue?: string,
    currentCashValue?: string,
    individualsCovered?: string[]
}

export interface IBurialTrustAgreement {
    code?: string | null;
    burialAgreementCollection?: IBurialTrustAgreementDetails[];    
}

export interface IBurialTrustAgreementDetails {
    owner?: number[],
    ownerName?: string,
    bankOrFuneralHomeName?: string;
    address?: IBurialTrustOwnerAddressDetails,
    dateBurialAgreementEstablished?: string;
    accountNumber?: string;
    valueOfAccount?: string;
    canMoneyWithDrawnBeforeDeathOfIndividual?: string;
}

export interface IBurialTrustOwnerAddressDetails {
    addressLine1?: string;
    addressline2?: string;
    city?: string;
    state?: string;
    zip?: string;
    zipExtension?: string;
    county?: string;
    isThisAddressEffectiveImmediately?: boolean;
    addressEffectiveDate?: string;
}
export interface IExpenses {
    housingAssistanceCode?: string;
    isWeatherizationSelected?: string;
    mainHeatingSource?: string;
    utilityCompany?: string;
    otherUtilityCompanyName?: string;
    providerNumber?: string;
    heatingNeedElectricity?: string;
    providerPayment?: string;
    electricityProvider?: string;
    otherProviderName?: string;
    otherAccountNumber?: string;
    canDHSShareInformation?: string;
    accountPaidInName?: string;
    otherAccountHolderName?: string;
    drinkingWaterCompanyMailing?: {
        addressLine1?: string;
        addressline2?: string;
        city?: string;
        state?: string;
        zip?: string;
    };

    utilityFuelProviderAddress?: {
        addressLine1?: string;
        addressline2?: string;
        city?: string;
        state?: string;
        zip?: string;
    };

    heatingSituations?: {
        checked: string[];
        unchecked: string[];
        info: string;
   };
    heatingSituationsMoreInfo?: string;

    waterAssistanceApplication?: {
        drinkingWater?: string;
        OtherDrinkingWater?: string;
        whoseNamedrinkingWaterAcc?: string;
        OtherDrinkingWaterAccHolder?: string;
        wasteWater?: string;
        OtherWasteWater?: string;
        whoseNamewasteWaterAcc?: string;
        OtherWasteWaterAccHolder?: string;
        addressLine1?: string;
        addressline2?: string;
        city?: string;
        state?: string;
        zip?: string;
    };
    wasteWaterProvider?: {
        wasteWaterSameAsDrinkingWaterProvider?: string;
        addressLine1?: string;
        addressline2?: string;
        city?: string;
        state?: string;
        zip?: string;
    };
    wasteWaterAddress?: {
        addressLine1?: string;
        addressline2?: string;
        city?: string;
        state?: string;
        zip?: string;
    };
    // waterGatepostDetails?:{
    //     situation?:[],
    //     gatepostProp:{},
    //     otherWater?:string
    // }

    sharedExpensesOutsideHousehold?: ISharedHouseHoldExpenses[];

    rentOrHouseholdMortgage?: {
        mortgageRent?: string;
        oftenMortgageRent?: string;
        condoFee?: string;
        oftenCondoFee?: string;
        mobileRent?: string;
        oftenMobileRent?: string;
    };
    expensesUtilityGatepostDetails?: {
        checked?: string[];
        unchecked?: string[];
    };
    waterGatepostDetails?: {
        checked?: string[];
        unchecked?: string[];
        otherWater?: string;
    };
    expensesSituations?: {
        checked?: string[];
        unchecked?: string[];
    };
    utilityExpenseInformation?: {
        primaryHeatingSourceInformation?: {
            heatingSourceCode?: number;
            providerNumber?: string;
            providerName?: string;
            otherProviderName?: string;
            accountNumberWithHeatingProvider?: string;
        };
        heatingSourceAccountHolderInformation?: {
            individualNumber?: number;
            otherNameOnTheAccount?: string;
        };
        withoutHeatingSourceOrWithin15Days?: [];
        withoutHeatingSourceOrWithin15DaysDescription?: string;
        anyOtherHeatingSource?: number;
        utilityOrFuelCompanyAddress?: {
            addressLine1?: string;
            addressline2?: string;
            city?: string;
            state?: string;
            zip?: string;
            zipExtension?: string;
            county?: string;
            isThisAddressEffectiveImmediately?: true;
            addressEffectiveDate?: string;
        };

        payForHeatingOrCooling?: string;
        billedSeparatelyForHeatingOrCooling?: string;
        utilities?: {
            doesAnyonePayForRentOrMortgage?: {
                code?: string;
            };
            doesAnyonePayForPropertyTaxes?: {
                code?: string;
            };
            doesAnyonePayForHomeInsurance?: {
                code?: string;
            };
            doesAnyonePayForElectric?: {
                code?: string;
            };
            doesAnyonePayForGas?: {
                code?: string;
            };
            doesAnyonePayForOilCoalWood?: {
                code?: string;
            };
            doesAnyonePayForWater?: {
                code?: string;
            };
            doesAnyonePayForSewerage?: {
                code?: string;
            };
            doesAnyonePayForGarbage?: {
                code?: string;
            };
            doesAnyonePayForUtilityInstallationThisMonth?: {
                code?: string;
            };
            doesAnyonePayForOtherUtilities?: {
                code?: string;
            };
            doesAnyonePayForTelephone?: {
                code?: string;
            };
        };
    };
    hasMemberPaysShelterOrUtilityExpenses?: {
        code?: string;
        individualNumbers?: [0];
    };
    hasMembersPaysChildSupportToNonMember?: {
        code?: string;
        individualNumbers?: [0];
    };
    hasMembersPaysAlimonyToNonMember?: {
        code?: string;
        individualNumbers?: [0];
    };
    hasMembersPaidMedicalLastNintyDays?: {
        code?: string;
        individualNumbers?: [0];
    };
    houseHoldShareExpense?: string;
    didTheHouseholdGetEnergyAssistanceSinceOctoberFirst?: string;
    hasMemberDrivesOrPaysWorkTransportation?: {
        code?: string;
        individualNumbers?: [0];
    };
    waterSourceInformation?: {
        shutOffConditionInformation?: [0];
    };
    rentOrMortgageInformation?: {
        mortgageRent?: string;
        oftenMortgageRent?: string;
        condoFee?: string;
        oftenCondoFee?: string;
        mobileRent?: string;
        oftenMobileRent?: string;
    };
    housingAssitance?: string;
    mealsIncludedInRent?: string;
    propertyInsurance?: {
        insurancePay: string;
        oftenInsurancePay: string;
    };
    propertyTax?: {
        taxPay: string;
        oftenTaxPay: string;
    };
}

export interface expensesWaterGatepost {
    drinkingWaterShutOff: boolean;
    wasteWaterShutOff: boolean;
    noticeFordrinkingWaterShutOff: boolean;
    noticeForwasteWaterShutOff: boolean;
    overDueForDrinkingWater: boolean;
    overDueForWasteWater: boolean;
    otherwater: boolean;
}
// ownNonResidentialProperty": "Yes",
//     "datePurchased": "2022-08-03T15:12:50.489Z",
//         "marketValue": 0,
//             "address": {
//     "addressLine1": "string",
//         "addressline2": "string",
//             "city": "string",
//                 "state": "AL",
//                     "zip": "string",
//                         "zipExtension": "string",
//                             "county": "Item01",
//                                 "isThisAddressEffectiveImmediately": true,
//                                     "addressEffectiveDate": "string"

export interface IAbsentRelativeNonResidentialProperty {
    id?: string;
    ownNonResidentialProperty?: string;
    datePurchased?: string;
    marketValue?: string;
    address: {
        addressLine1?: string;
        addressline2?: string;
        city?: string;
        state?: string;
        zip?: string;
        zipExtension?: string;
        county?: string;
        isThisAddressEffectiveImmediately?: boolean;
        addressEffectiveDate?: string;
    };
}

export interface IAbsentRelativeChildSupport {
    childsupport?: string;
    id?: string;
}

export interface IAbsentRelativeChildSupportDetails {
    id?: string;
    courtOrder?: string;
    voluntryPay?: string;
    voluntryPayOften?: string;
    voluntryWhenDidTheyPay?: string;
    voluntryWhomToPay?: string;
    courtNumber?: string;
    courtName?: string;
    courtOrderedPay?: string;
    courtOrderedPayOften?: string;
    courtOrderedWhenDidTheyPay?: string;
    courtOrderedWhomPayTo?: string;
}

// export interface IHouseHoldDetails {
//     householdHead: IHouseHold;
//     houseHoldPersons?: IHouseHold[];
//     householdBenefitDetails: IHouseholdBenefitsDetails;
//     selectedForCoverage: string[];
//     //householdAddress : IHouseholdAddress;
//     householdAddressSelection : string[];
// }

export const houseHoldDetails: IHouseHoldDetails = {
    Household: {
        HeadofHousehold: "",
        applicantAddress: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            zip: "",
            county: "",
            isThisAddressEffectiveImmediately: false,
            addressEffectiveDate: "",
            zipExtension: "",
            //school: "",
            // township: "",
            // anotherAdd: [],
            // anotherAddress: "",
            // anotherAddress2: "",
            // anotherCity: "",
            // anotherState: "",
            // anotherZip: "",
            // sendMail: [],
            // sendMailStartDate: "",
            // years: "",
            // months: ""
        },
        previousAddress: {
            addressLine1: " ",
            addressLine2: " ",
            city: " ",
            state: " ",
            zip: "",
            zipExtension: "",
            county: " ",
            isThisAddressEffectiveImmediately: false,
            addressEffectiveDate: "",
        },
    },
    HeadofHousehold: "",
    // individuals: [],
    // selectedForCoverage:"",
    // householdBenefitDetails:[],
    householdGatepost: {
        chkSsn: "",
        chkHousing: "",
        chkCashAssis: "",
        chkFoodStamp: "",
        chkIncomeBefTax: "",
        chkCheckingAC: "",
        chkObtaiFoodStamps: "",
        chkAge: "",
        chkSpouse: "",
        chkHelp: "",
        chkMembers: "",
        chkNursing: "",
        chkMortgage: "",
        chkEveryone: "",
        chkMedical: "",
        chkBenefitApp: "",
        chkNone: "",
    },

    // householdTypeOfFacility: {
    //     userId:0,
    //     typeofnursingHome: "",
    // },

    // householdTypeOfFacility: [],

    householdSnapDisbility: {
        isPermenantDisability: "",
        isage60permenantlydisabled: "",
        earningsfordisabled: "",
    },

    householdHead: {
        // id:0,
        // gender:""
    },
    householdBenefitDetails: {
        chkHealthCareCoverage: false,
        chkFoodAssistance: false,
        chkCashAssistance: false,
        chkFreeSchoolMeals: false,
        chkHeatingBills: false,
        chkChildcareCosts: false,
        chkWaterBill: false,
        chkServiceCommunity: false,
        chkServiceFacility: false,
    },
    householdElectricProvider: {
        electricCompany: "",
        acconumber: "",
    },
    householdFoodStamps: {
        name: "",
        ssn: "",
        address: "",
        address2: "",
        city: "",
        county: "",
        state: "",
        zip: "",
        phoneNo: "",
    },
    householdBenefitsAppliedBefore: {
        state: "",
        county: "",
    },
    householdWaterQuestions: {
        waterRent: "",
        wasteRent: "",
        payingForDrinkingWater: "",
    },
    householdPreviousAddress: {
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        county: "",
        phoneNo: "",
    },
    householdCountyRecNo: {
        recordNo: "",
    },
    householdLivedInPA: {
        years: "",
        months: "",
        monthsMoved: "",
    },
    houseHoldPersons: [],
    householdContactInfo: {},
    absentRelative: [],
    absentRelativeChildSupport: {},
    absentRelativeChildSupportDetails: {},
    nonResidentialProperty: {},
    nursingFacility: {},
    IsThisIndividualOutsideHousehold: [],
    householdWhoApplyLtc: [],
    individualSituations: [""],
    areYouWantToApplyLTC: "",
    responsibleRelative: [],
    selectedForCoverage: [],
    selectedForSnapScreen: [],
    selectedForCashAssitance: [],
    selectedForChildCareCost: [],
    selectedForSchoolMeals: [],
    selectedForLongtermLivingServices: [],
    householdHeadSelection: "",
    householdAddressSelection: [],
    livSituation: "",
    effDate: "",
    houSituation: "",
    othHouSituation: "",
    allowance: "",
    pageAction: {},
    individualLegalSituations: [""],
    individualMedicalSituations: [""],
    householdGatepostValue: undefined,
    incomeSituations: [""],
    resourceSituations: [""]

};

// export const householdBenefitDetails {
//     chkHealthCareCoverage: "",
//     chkFoodAssistance: "",
//     chkCashAssistance: "",
//     chkFreeSchoolMeals: "",
//     chkHeatingBills: "",
//     chkChildcareCosts: "",
//     chkWaterBill: "",
//     chkServiceCommunity: "",
//     chkServiceFacility: ""

// }

export interface IHouseholdAddress {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zip?: string;
    zipExtension?: string;
    county?: string;
    schoolDistrict?: string;
    township?: string;
    isAddressGISValidated?: boolean;
    isThisAddressEffectiveImmediately?: boolean;
    addressEffectiveDate?: string;
    anotherAdd?: boolean;
}

export interface INursingFacilityDetails {
    AddressLine1?: string;
    AddressLine2?: string;
    City?: string;
    State?: string;
    Zip?: string;
    FacilityName?: string;
    nursingFacilityStartDate?: string;
    nursingFacilityEndDate?: string;
}

export interface IFederalTribeInfo {
    tribeName?: string;
    tribeState?: string;
    receivedIndianHealthService?: string;
    allowedIndianHelathService?: string;
}

export interface IFederalTribeIncomeInfo {
    perCapitaPayments: string;
    perCapitaPaymentAmount: string;
    perCapitaPaymentFrequency: string;
    indianTrustLandPayments: string;
    indiantTrustLandPaymentAmount: string;
    indiantTrustLandPaymentFrequency: string;
    culturalSignificance: string;
    culturalSignificanceAmount: string;
    culturalSignificanceFrequency: string;
}

export interface ISnapOrTanfBenefits {
    fsOrTANFBenefits: [];
}

export interface IFstanfIndividualEBTNumber {
    fstanfIndividualEBTNumber: string;
}

export interface IFsOrTANFCaseNumber {
    fsOrTANFCaseNumber: string;
}

export interface ISnapOrTanfDetails {
    caseNumber: number;
    ebtCardNumber: number;
    validState: boolean | true;
}
export interface IIndividualExistingBenefits {
    wasSSIStoppedBecauseSocialSecurityStarted: string | "";
    wasSSIStoppedBecauseSocialSecurityIncreased: string | "";
}

export interface IIncarcerationDetails {
    countyOfPlacement: string;
    incarceratedAdmissionDate: string;
    incarceratedDischargeDate: string;
}

export interface IMedicalConditionDetails {
    medicalCondition: string;
    beginDate: string;
    disability?: string;
    ableToWork?: boolean;
    careChildren?: boolean;
    ssi?: string;
    childDisability?: string;
    developmentAge?: number;
}

export interface IIncomeInfo {
    code?: string;
    individualNumbers?: number[];
    endDated?: string;
}

export interface ICurrentEmploymentDetails {
    isSelfEmployment?: string;
    name?: string;
    address?: IIncomeAddress;
    phoneNumber?: string;
    startDate?: string;
    onStrike?: string;
    numberOfHoursWorkedPerWeek?: number;
    frequency?: string;
    grossIncome?: string;
    payRate?: number;
    mostRecentPayDate?: string;
}

export interface IPastEmploymentDetails {
    name: string;
    address?: IIncomeAddress;
    phoneNumber?: string;
    startDate?: string;
    endDate?: string;
    numberOfHoursWorkedPerWeek?: number;
    mostRecentPayDate?: string;
}

export interface IOtherIncomeDetails {
    incomeType: string;
    otherIncomeDescription: string;
    frequency: string;
    grossIncome: string;
    mostRecentPayDate: string;
    nameOfFinancialInstitution?: string;
    address?: IIncomeAddress;
}

export interface IIncomeAddress {
    addressLine1?: string;
    addressline2?: string;
    city?: string;
    state?: string;
    zip?: string;
    zipExtension?: string;
    county?: string;
    isThisAddressEffectiveImmediately?: boolean;
    addressEffectiveDate?: string;
}

export interface IIndividualIncome {
    otherIncome?: IOtherIncomeDetails[];
    currentEmployment?: ICurrentEmploymentDetails[];
    pastEmployment?: IPastEmploymentDetails[];
}

export interface IHouseholdIncome {
    otherIncome?: IIncomeInfo;
    doesAnyoneReceiveFinancialAssistanceForDisability?: IIncomeInfo;
    noIncomeExplanation?: string;
    currentEmployment?: IIncomeInfo;
    pastEmployment?: IIncomeInfo;
}
//cash assistance
export interface IAnyoneHaveCash {
    code?: string | null;
    cashCollection?: ICash[];
}

export interface ICash {
    resourceType?: string | null;
    owner?: string[];
    ownerName?: string | null;
    otherResource?: string | null;
    location?: string | null;
    accountNumber?: string | null;
    value?: string | null;
}
//non-residential property
export interface IAnyoneBuyingNonResidentProperty {
    code?: string | null;
    nonResidentialPropertyCollection?: IResourcesNonResidentialProperty[];
}

export interface IResourcesNonResidentialProperty {
    owner?: string[];
    ownerName?: string | null;
    mobileHome?: IMobileHome;
    //Type is dateTime in Api, need to recheck
    datePropertyPurchased?: string | null;
    marketValue?: string | null;
    address?: IResourceAddress;
    incomeProducing?: string | null;
    whoLivesInTheProperty?: string | null;
    isPropertyListedForSale?: string | null;
    //Type is dateTime in Api, need to recheck
    dateListed?: string | null;
    realtorName?: string | null;
    realtorPhoneNumber?: string | null;

}
//residential property
export interface IAnyoneOwnAHome {
    code?: string | null;
    estimatedMarketValue?: string | null;
    currentlyLiveElsewhere?: string | null;
    intendToReturnHome?: string | null;
    residentialPropertyCollection?: IResourcesResidentialProperty[];
}
export interface IResourcesResidentialProperty {

    owner?: string[];
    ownerName?: string | null;
    mobileHome?: IMobileHome;
    //Type is dateTime in Api, need to recheck
    datePropertyPurchased?: string | null;
    marketValue?: string | null,
    incomeProducing?: string | null;
    whoLivesInTheProperty?: string | null;
    isPropertyListedForSale?: string | null;
    //Type is dateTime in Api, need to recheck
    dateListed?: string | null;
    realtorName?: string | null;
    realtorPhoneNumber?: string | null;
}

export interface IMobileHome {
    code?: string | null;
    notPrimary?: string | null;
    year?: string | null;
    make?: string | null;
}

export interface IResourceAddress {
    addressLine1?: string | null;
    addressline2?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    zipExtension?: string | null;
    county?: string | null;
    isThisAddressEffectiveImmediately?: boolean;
    addressEffectiveDate?: string | null;
}
//expectinganyresource
export interface IAnyoneExpectingAnyResources {
    code?: string | null;
    expectingMoneyCollection?: IExpectingMoney[];
}
export interface IExpectingMoney {
    description?: string | null;
    value?: string | null;
    //date is of type DateTime need to change
    date?: string | null;
}
//vehicle
export interface IAnyOwnORBuyingVehicle {
    code?: string | null;
    vehicleCollection?: IVehicle[];
}
export interface IVehicle {
    owner?: string [];
    ownerName?: string | null;
    year?:string|null;
    make?: string | null;
    model?: string | null;
    isThisVehiclelicensed?: string | null;
    //amount owed is of type int
    amountOwed?: string | null;
}
//burial space
export interface IAnyoneOwnBurialSpaceORPlot {
    code?: string | null;
    burialSpacesCollection?: IBurialSpace[];
}
export interface IBurialSpace {
    owner?: string[];
    numberOfSpaces?: string | null;
    valueofSpaces?: string | null;
    amountOwedOnSpaces?: string | null;
    nameofCemetary?: string | null;
}
