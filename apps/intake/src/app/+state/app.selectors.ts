import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './app.state'
import { filteredReducer } from './app.reducers';
const getFeatureState = createFeatureSelector<fromFeature.State>('app');

export const getNumberOfExpectedBabies = createSelector(
    getFeatureState,
    state => state.numberOfExpectedBabies
);

export const getBenefitTypes = createSelector(
    getFeatureState,
    state => state.benefitTypes
);

export const getCounties = createSelector(
    getFeatureState,
    state => state.counties
);
export const getCountries = createSelector(
    getFeatureState,
    (state) => state.countries
);
export const getDocumentTypes = createSelector(
    getFeatureState,
    (state) => state.documentTypes
);
export const getImmunizations = createSelector(
    getFeatureState,
    (state) => state.immunizations
);

export const getCitizenship = createSelector(
    getFeatureState,
    state => state.citizenship
);

export const getSchoolGrades = createSelector(
    getFeatureState,
    (state) =>  state.schoolGrades
);

export const getServiceBranches = createSelector(
    getFeatureState,
    (state) => state.serviceBranches
);

export const getElectricCompany = createSelector(
    getFeatureState,
    state => state.electricCompaniesList
);

export const getMaritalStatus = createSelector(
    getFeatureState,
    (state) => state.maritalStatus
);

export const getEducationData = createSelector(
    getFeatureState,
    (state) => state.educations
);

export const getSchoolDistricts = createSelector(
    getFeatureState,
    state => state.schoolDistrict
);

export const getTownShip = createSelector(
    getFeatureState,
    state => state.townShip
);
export const getContactRoles = createSelector(
    getFeatureState,
    (state) => state.contactRoles
);

export const relationships = createSelector(
    getFeatureState,
    state => state.relationships
);

export const getMaleInvrelationships = createSelector(
    getFeatureState,
    state => state.maleInvRelationships
);

export const getFemaleInvrelationships = createSelector(
    getFeatureState,
    state => state.femaleInvRelationships
);
export const getParentSpouseOrBoth = createSelector(
    getFeatureState,
    state => state.parentSpouseOrBoth
);

export const getInsuranceNameType = createSelector(
    getFeatureState,
    state => state.insuranceNameType
);
export const getSuffix = createSelector(
    getFeatureState,
    state => state.suffix
);

export const getTypeofFacility = createSelector(
    getFeatureState,
    state => state.facilities
);

export const getStates = createSelector(
    getFeatureState,
    state => state.states
);

export const getDrinkingWater = createSelector(
    getFeatureState,
    state => state.drinkingWater
);

export const getWasteWater = createSelector(
    getFeatureState,
    state => state.wasteWater
);

export const getAmountPeriodForTribes = createSelector(
    getFeatureState,
    state => state.amountPeriods
);

export const getPay= createSelector(
    getFeatureState,
    pay => pay.pays
);

export const getSchoolTypes = createSelector(
    getFeatureState,
    state => state.schoolTypes
);
export const getNSLPSchoolTypes = createSelector(
    getFeatureState,
    (state) => state.nslpSchoolTypes
);

export const getRaces = createSelector(
    getFeatureState,
    (state) => state.races
);
export const getLivSituation = createSelector(
    getFeatureState,
    state => state.livSituation
);
export const getHouSituation = createSelector(
    getFeatureState,
    state => state.houSituation
);
export const getReferralPhonenumbers = createSelector(
    getFeatureState,
    (state) => state.referralPhoneNumbers
);
export const getCountyOfPlacement = createSelector(
    getFeatureState,
    state => state.countyOfPlacement
);
export const getVeteranStatus = createSelector(
    getFeatureState,
    state => state.veteranStatus
);
export const getDisabilityType = createSelector(
    getFeatureState,
    state => state.disabilityType
);
export const getDisabilitySsi = createSelector(
    getFeatureState,
    state => state.disabilitySsi
);
export const getChildDisability = createSelector(
    getFeatureState,
    state => state.childDisability
);
export const getSecurityQuestions = createSelector(
    getFeatureState,
    (state) => state.securityQuestions
);
export const getMedicalService = createSelector(
    getFeatureState,
    (state) => state.medicalService
);
export const getYesNoValues = createSelector(
    getFeatureState,
    (state) => state.yesNoValues
);
export const getOtherIncomeTypes = createSelector(
    getFeatureState,
    (state) => state.otherIncomeTypes
);

export const getHeatingSource = createSelector(
    getFeatureState,
    (state) => state.heatingSource
);
export const getProviderName = createSelector(
    getFeatureState,
    (state) => state.providerName
);
export const getHeatingSourcesprovider = createSelector(
    getFeatureState,
    (state) => state.heatingSourcesProvider
);
export const getNeedElectricity = createSelector(
    getFeatureState,
    (state) => state.needElectricity
);

export const getMedicalExpenses = createSelector(
  getFeatureState,
  (state) => state.medicalExpenses
);
export const getDeductableSources = createSelector(
  getFeatureState,
  (state) => state.deductableSources
);
export const getSharedExpenses = createSelector(
  getFeatureState,
  (state) => state.sharedExpenses
);
export const getChildCareDays = createSelector(
  getFeatureState,
  (state) => state.childCareDays
);
export const getMaleRelationship = createSelector(
    getFeatureState,
    (state) => state.maleRelationship
);
export const getFemaleRelationship = createSelector(
    getFeatureState,
    (state) => state.femaleRelationship
);
export const getHouseHoldExpensesPaid = createSelector(
    getFeatureState,
    (state) => state.houseHoldExpensesPaid
);
export const getMAProviderNumbers = createSelector(
    getFeatureState,
    (state) => state.maproviderNumbers
);
export const getNonMAProviderNumbers = createSelector(
    getFeatureState,
    (state) => state.nonMAproviderNumbers
); 
export const getReasonForEmploymentEnd = createSelector(
    getFeatureState,
    state => state.reasonForEmploymentEnd
);
export const getUnitTypes = createSelector(
    getFeatureState,
    state => state.unitType
);
export const getPolitcalParties = createSelector(
    getFeatureState,
    state => state.politicalParties
);
export const getElectionDueDates = createSelector(
    getFeatureState,
    state => state.electionDueDates
);
export const getSituations = createSelector(
    getFeatureState,
    state => state.situations
);

export const getResourceTypes = createSelector(
    getFeatureState,
    (state) => state.resourceTypes
);
export const getInsuranceCompanyNames = createSelector(
    getFeatureState,
    state => state.insuranceCompnayNames
);
export const getPolicyTypes = createSelector(
    getFeatureState,
    state => state.policyTypes
);
export const getPolicyCoverage = createSelector(
    getFeatureState,
    state => state.policyCoverage
);
export const getEmployeePolicyCoverage = createSelector(
    getFeatureState,
    state => state.employerCoverage
);
export const getEmployerPaidPremiumPolicy= createSelector(
    getFeatureState,
    state => state.employerPaidPremiumPolicy
);
export const getEmployerChangePolicy= createSelector(
    getFeatureState,
    state => state.employerChangePolicy
);
export const getPolicyEndCoverage = createSelector(
    getFeatureState,
    state => state.policyEndCoverage
);
export const getApplicationLanguage = createSelector(
    getFeatureState,
    state => state.applicationLanguage
);

export const getLGBTQSurveyAnswers = createSelector(
    getFeatureState,
    state => state.lgbtqAnswers
);
export const getLGBTQSurveyQuestions = createSelector(
    getFeatureState,
    state => state.lgbtqQuestions
);
export const getbenefits = createSelector(
    getFeatureState,
    state => state.benefits
);
export const getProgramServices = createSelector(
    getFeatureState,
    state => state.programServices
);
