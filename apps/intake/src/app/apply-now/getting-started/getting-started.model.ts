

    export interface ApplicantAddress {
        addressLine1: string;
        addressline2: string;
        city: string;
        state: string;
        zip: string;
        zipExtension: string;
        county: string;
        isThisAddressEffectiveImmediately: boolean;
        addressEffectiveDate: string;
    }

    export interface ElectricityProviderInformation {
        electricityProviderName: string;
        accountNumberWithElectricityProvider: string;
    }

    export interface FoodStamps {
        shelterLiving?: any;
        hasReceivedFoodStamps?: any;
        incomeLowEnough?: any;
        totalAssets?: any;
        householdSchoolDistrict: string;
        cityTownship: string;
        rentExceedsIncome?: any;
    }

    export interface FoodStampRepresentativeAddress {
        addressLine1: string;
        addressline2: string;
        city: string;
        state: string;
        zip: string;
        zipExtension: string;
        county: string;
        isThisAddressEffectiveImmediately: boolean;
        addressEffectiveDate: string;
    }

    export interface FoodStampRepresentativeInformation {
        foodStampsRepresentativeAvailable?: any;
        foodStampRepresentativeName: string;
        socialSecurityNumber: string;
        foodStampRepresentativeAddress: FoodStampRepresentativeAddress;
        phoneNumber: string;
    }

    export interface AdditionalInformation {
        doesAnyChildUnder21HaveParentNotLivingInHouseholdOrDeceased?: any;
        anyoneHasASpouseNotLivingInHouseholdOrDeceased?: any;
        doesAnyoneNeedHelpForChildSupportOrInsuranceFromAbsentRelative?: any;
    }

    export interface DoesAnyOneHavePermanentDisability {
        code?: any;
        individualNumbers?: any;
    }

    export interface DoesAnyoneRequiresHealthSustainingMedication {
        code?: any;
        individualNumbers?: any;
    }

    export interface HasAnyoneReceivedSSIInThePast {
        code?: any;
        individualNumbers?: any;
    }

    export interface ReceivingTANF {
        code?: any;
        individualNumbers?: any;
    }

    export interface ReceivedTANFInPasts6Months {
        code?: any;
        individualNumbers?: any;
    }

    export interface ReceivingFS {
        code?: any;
        individualNumbers?: any;
    }

    export interface HasAnyoneReceivedSSDInThePast {
        code?: any;
        individualNumbers?: any;
    }

    export interface AnyoneHasPaidMedicalBills {
        code?: any;
        individualNumbers?: any;
    }

    export interface WhoHasBeenIssuedASummons {
        code?: any;
        individualNumbers?: any;
    }

    export interface AdditionalDetails {
        doesAnyOneHavePermanentDisability: DoesAnyOneHavePermanentDisability;
        doesAnyoneRequiresHealthSustainingMedication: DoesAnyoneRequiresHealthSustainingMedication;
        hasAnyoneReceivedSSIInThePast: HasAnyoneReceivedSSIInThePast;
        receivingTANF: ReceivingTANF;
        receivedTANFInPasts6Months: ReceivedTANFInPasts6Months;
        receivingFS: ReceivingFS;
        hasAnyoneReceivedSSDInThePast: HasAnyoneReceivedSSDInThePast;
        anyoneHasPaidMedicalBills: AnyoneHasPaidMedicalBills;
        hasAnyoneInHouseholdLostTheirJobORHadWorkHoursReduced: string;
        anyoneDisabledBlindSeriouslyIllOrHasAlcoholOrDrugProblem: string;
        anyoneReceivingTreatmentForAlcoholOrDrugProblem: string;
        anyoneReceivingProtectiveServicesAsVictimOfDomesticViolence: string;
        whoHasBeenIssuedASummons: WhoHasBeenIssuedASummons;
    }

    export interface MainContactNumber {
        phoneNumber: string;
        isMobileNumber: boolean;
    }

    export interface SecondContactNumber {
        phoneNumber: string;
        isMobileNumber: boolean;
    }

    export interface OtherContactNumber {
        phoneNumber: string;
        isMobileNumber: boolean;
    }

    export interface WaterInformation {
        isDrinkingWaterIncludedInRent: boolean;
        isWasteWaterIncludedInRent: boolean;
        whatWaterSourceToBePaid: string;
    }

    export interface PreviousAddress {
        addressLine1: string;
        addressline2: string;
        city: string;
        state: string;
        zip: string;
        zipExtension: string;
        county: string;
        isThisAddressEffectiveImmediately: boolean;
        addressEffectiveDate: string;
    }

    export interface PreviousBenefitsInformation {
        previousStateBenefitDescription: string;
        previousCountyBenefitDescription: string;
    }

    export interface MailingAddress {
        addressLine1: string;
        addressline2: string;
        city: string;
        state: string;
        zip: string;
        zipExtension: string;
        county: string;
        isThisAddressEffectiveImmediately: boolean;
        addressEffectiveDate: string;
    }

    export interface Address {
        addressLine1: string;
        addressline2: string;
        city: string;
        state: string;
        zip: string;
        zipExtension: string;
        county: string;
        isThisAddressEffectiveImmediately: boolean;
        addressEffectiveDate: string;
    }

    export interface NursingHomeInformation {
        previouslyLivedInNursingFacility: string;
        nursingFacilityName: string;
        address: Address;
        nursingFacilityStartDate: string;
        nursingFacilityEndDate: string;
    }

    export interface WhoHasBeenConvictedAFelony {
        code?: any;
        individualNumbers?: any;
    }

    export interface WhoWasConvictedForWelfareFraud {
        code?: any;
        individualNumbers?: any;
    }

    export interface WhoIsOnProbationOrParole {
        code?: any;
        individualNumbers?: any;
    }

    export interface WhoIsCurrentlyFleeingFromLawEnforcementOfficials {
        code?: any;
        individualNumbers?: any;
    }

    export interface Resources {
        hasMemberReceivedLongTermCare?: any;
    }

    export interface Income {
        currentEmployment?: any;
        pastEmployment?: any;
        otherIncome?: any;
        doesAnyoneReceiveFinancialAssistanceForDisability?: any;
        noIncomeExplanation: string;
    }

    export interface Expenses {
        housingAssistanceCode?: any;
        isWeatherizationSelected?: any;
        canDHSShareInformation?: any;
        utilityExpenseInformation?: any;
        hasMemberPaysShelterOrUtilityExpenses?: any;
        hasMembersPaysChildSupportToNonMember?: any;
        hasMembersPaysAlimonyToNonMember?: any;
        hasMembersPaidMedicalLastNintyDays?: any;
        houseHoldShareExpense?: any;
        didTheHouseholdGetEnergyAssistanceSinceOctoberFirst?: any;
        hasMemberDrivesOrPaysWorkTransportation?: any;
        waterSourceInformation?: any;
        mealsIncludedInRent?: any;
    }

    export interface Household {
        applicantAddress: ApplicantAddress;
        currentLivingSituation: string;
        currentHousingSituation: string;
        otherCurrentHousingSituation: string;
        electricityProviderInformation: ElectricityProviderInformation;
        appliedBenefitsWithDifferentNameOrSSN?: any;
        doYouReceiveUtilityAllowanceCheck?: any;
        howMuchAllowanceCheck: string;
        disqualifiedForAssistance?: any;
        foodStamps: FoodStamps;
        foodStampRepresentativeInformation: FoodStampRepresentativeInformation;
        additionalInformation: AdditionalInformation;
        additionalDetails: AdditionalDetails;
        fromHowManyYearsAtThisAddress: string;
        fromHowManyMonthsAtThisAddress: string;
        mainContactNumber: MainContactNumber;
        secondContactNumber: SecondContactNumber;
        otherContactNumber: OtherContactNumber;
        waterInformation: WaterInformation;
        emailAddress: string;
        bestTimeToCall: string;
        howToContact?: any;
        previousPhoneNumber: string;
        previousAddress: PreviousAddress;
        numberOfYearsInPA: string;
        numberOfMonthsInPA: string;
        haveYouReceivedBenefitsInPA?: any;
        previousCaseRecordNumber: string;
        previousBenefitsInformation: PreviousBenefitsInformation;
        mailingAddress: MailingAddress;
        doYouPreferSeperateMailingAddress?: any;
        isEveryoneApplyingForLI: string;
        nursingHomeInformation: NursingHomeInformation;
        whoHasBeenConvictedAFelony: WhoHasBeenConvictedAFelony;
        whoWasConvictedForWelfareFraud: WhoWasConvictedForWelfareFraud;
        whoIsOnProbationOrParole: WhoIsOnProbationOrParole;
        whoIsCurrentlyFleeingFromLawEnforcementOfficials: WhoIsCurrentlyFleeingFromLawEnforcementOfficials;
        isAnyoneCurrentlyIncarcerated?: any;
        resources: Resources;
        income: Income;
        expenses: Expenses;
        residentialAddressGISValidation?: any;
    }

    export interface People {
        individuals: any[];
        absentRelatives: any[];
    }

    export interface RootObject {
        id: number;
        household: Household;
        people: People;
    }



