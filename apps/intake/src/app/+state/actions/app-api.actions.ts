import { createAction, props } from '@ngrx/store';
export const SetPACounties = createAction('[store] Set PACounties',
    props<{ counties: any }>()
);
export const SetCountries = createAction(
    "[store] Set Countries",
    props<{ countries: any }>()
);
export const setCitizenship = createAction('[store] Set Citizenship',
    props<{ citizenship: any }>()
);

export const setMaritalStatus = createAction(
    "[store] Set getMaritalStatus",
    props<{ maritalStatusTypes: any }>()
);

export const setApplicationLanguage = createAction(
    "[store] Set getApplicationLanguage",
    props<{ applicationLanguage: any }>()
);

export const loadApplicationLanguageFailure = createAction(
    "[store] Load getApplicationLanguage Failure",
    props<{ error: string }>()
);

export const setEducations = createAction(
    "[store] Set Educations",
    props<{ educations: any }>()
);
export const setSchoolGrades = createAction(
    "[store] Set SchoolGrades",
    props<{ schoolGrades: any }>()
);
export const setContactRoles = createAction(
    "[store] Set ContactRoles",
    props<{ contactRoles: any }>()
);
export const setDocumentTypes = createAction(
    "[store] Set DocumentTypes",
    props<{ documentTypes: any }>()
);

export const setSchoolDistrict = createAction('[store] Set SchoolDistricts',
    props<{ schoolDistrict: any }>()
);
export const setServiceBranches = createAction(
    "[store] Set Service Branches",
    props<{ serviceBranches: any }>()
);
export const setImmunizations = createAction(
    "[store] Set Immunizations",
    props<{ immunizations: any }>()
);
export const setTownShip = createAction('[store] Set TownShip',
    props<{ townShip: any }>()
);

export const setStates = createAction('[store] Set States',
    props<{ state: any }>()
);

export const setDrinkingWater = createAction('[store] Set DrinkingWater',
    props<{ drinkingWater: any }>()
);
export const setWasteWater = createAction('[store] Set WasteWater',
    props<{ wasteWater: any }>()
);

export const setAmountPeriodForTribes = createAction('[store] Set Amount Period',
    props<{ amountPeriods: any }>()
);

export const setPays = createAction('[store] Set Pays',
    props<{ pay: any }>()
);

export const setRelationships = createAction('[store] Set Relationships',
    props<{ relationships: any }>()
);

export const setElectricCompanies = createAction('[store] Set ElectricCompanies',
    props<{ electricCompanies: any }>()
);

export const setInsuranceNameType = createAction('[store] Set InsuranceNameType',
    props<{ insuranceNameType: any }>()
);
export const loadInsranceTypesFailure = createAction(
    '[store] Load InsuranceTypes Failure',
    props<{ error: string }>()
);
export const loadImmunizationsFailure = createAction(
    "[store] Load Immunizations Failure",
    props<{ error: string }>()
);

export const loadDocumentTypesFailure = createAction(
    "[store] Load DocumentTypes Failure",
    props<{ error: string }>()
);
export const loadSchoolGradesFailure = createAction(
    "[store] Load SchoolGrades Failure",
    props<{ error: string }>()
);
export const loadContactRolesFailure = createAction(
    "[store] Load ContactRoles Failure",
    props<{ error: string }>()
);
export const loadServiceBranchesFailure = createAction(
    "[store] Load Service  Branches Failure",
    props<{ error: string }>()
);
export const setNumberOfExpectedBabies = createAction('[store] Set Number of Expected Babies',
    props<{ numberOfExpectedBabies: any }>()
);

export const setBenefitTypes = createAction('[store] Set Benefit Types',
    props<{ benefitTypes: any }>()
);

export const setSuffix = createAction('[store] Set Suffix',
    props<{ suffix: any }>()
);

export const setFacilities = createAction('[store] Set Facilities',
    props<{ facilities: any }>()
);



export const loadPACountiesFailure = createAction('[store] Load PACounties Failure',
    props<{ error: string }>()
);
export const loadCountriesFailure = createAction(
    "[store] Load Countries Failure",
    props<{ error: string }>()
);
export const loadSchoolDistrictsFailure = createAction('[store] Load SchoolDistricts Failure',
    props<{ error: string }>()
);

export const loadTownShipFailure = createAction('[store] Load TownShip Failure',
    props<{ error: string }>()
);

export const loadRelationshipsFailure = createAction('[store] Load Relationships Failure',
    props<{ error: string }>()
);

export const loadElectricCompanyFailure = createAction('[store] Load ElectricCompanies Failure',
    props<{ error: string }>()
);

export const loadNumberOfExpectedFailure = createAction('[store] Load Number of Expected Babies Failure',
    props<{ error: string }>()
);

export const loadBenefitTypesFailure = createAction('[store] Load Benefit Types Failure',
    props<{ error: string }>()
);

export const loadSuffixFailure = createAction('[store] Load Suffix Failure',
    props<{ error: string }>()
);

export const loadFacilitiesFailure = createAction('[store] Load Facility Failure',
    props<{ error: string }>()
);

export const loadStatesFailure = createAction(
    '[store] Load States Failure',
    props<{ error: string }>()
);

export const loadAmountPeriodForTribeFailure = createAction(
    '[store] Load Amount Period For Tribe Failure',
    props<{ error: string }>()
);

export const loadPaysFailure = createAction(
    '[store] Load Pays Failure',
    props<{ error: string }>()
);
export const loadInsuranceNameTypeFailure = createAction(
    '[store] Load InsuranceNameType Failure',
    props<{ error: string }>()
)

export const setSchoolTypes = createAction('[store] Set SchoolType',
    props<{ schoolTypes: any }>()
);

export const setNSLPSchoolTypes = createAction(
    "[store] Set NSLPSchoolType",
    props<{ nslpSchoolTypes: any }>()
);

export const loadSchoolTypeFailure = createAction('[store] Load SchoolType Failure',
    props<{ error: string }>()
);

export const setRaces = createAction(
    "[store] Set Races",
    props<{ races: any }>()
);
export const loadRacesFailure = createAction(
    "[store] Load Races Failure",
    props<{ error: string }>()
);

export const setLivSituation = createAction(
    "[store] Set LivSituation",
    props<{ livSituation: any }>()
);
export const loadLivSituationFailure = createAction(
    "[store] Load LivSituation Failure",
    props<{ error: string }>()
);
export const setHouSituation = createAction(
    "[store] Set HouSituation",
    props<{ houSituation: any }>()
);
export const loadHouSituationFailure = createAction(
    "[store] Load HouSituation Failure",
    props<{ error: string }>()
);

export const setMaleInvRelations = createAction(
  "[store] Set MaleInvRelations",
  props<{ maleInvRelationships: any }>()
);
export const loadMaleInvRelationsFailure = createAction(
  "[store] Load MaleInvRelations Failure",
  props<{ error: string }>()
);

export const setFemaleInvRelations = createAction(
  "[store] Set FemaleInvRelations",
  props<{ femaleInvRelationships: any }>()
);
export const loadFemaleInvRelationsFailure = createAction(
  "[store] Load FemaleInvRelations Failure",
  props<{ error: string }>()
);
export const loadParentSpouseOrBothFailure = createAction(
    '[store] Load ParentSpouseOrBoth Failure',
    props<{ error: string }>()
);
export const setParentSpouseOrBoth = createAction(
    "[store] Set ParentSpouseOrBoth",
    props<{ parentSpouseOrBoth: any }>()
);
export const loadReferralPhoneNumbersFailure = createAction(
    '[store] Load Referral Phone Numbers Failure',
    props<{ error: string }>()
);

export const setReferralPhoneNumbers = createAction('[store] Set PhoneNumbers',
    props<{ phoneNumber: any }>()
);
export const setCountyOfPlacement = createAction(
    "[store] Set CountyOfPlacement",
    props<{ countyOfPlacement: any }>()
);
export const loadCountyOfPlacementFailure = createAction(
    '[store] Load CountyOfPlacement Failure',
    props<{ error: string }>()
);
export const setVeteranStatus = createAction(
    "[store] Set Veteran Status",
    props<{ veteranStatus: any }>()
);
export const loadVeteranStatusFailure = createAction(
    '[store] Load Veteran Status Failure',
    props<{ error: string }>()
);
export const setDisabilityType = createAction(
    "[store] Set DisabilityType",
    props<{ disabilityType: any }>()
);
export const loadDisabilityTypeFailure = createAction(
    '[store] Load DisabilityType Failure',
    props<{ error: string }>()
);
export const setDisabilitySsi = createAction(
    "[store] Set DisabilitySsi",
    props<{ disabilitySsi: any }>()
);
export const loadDisabilitySsiFailure = createAction(
    '[store] Load DisabilitySsi Failure',
    props<{ error: string }>()
);
export const setChildDisability = createAction(
    "[store] Set ChildDisability",
    props<{ childDisability: any }>()
);
export const loadChildDisabilityFailure = createAction(
    '[store] Load ChildDisability Failure',
    props<{ error: string }>()
);
export const setSecurityQuestions = createAction('[store] Set Security Questions',
    props<{ securityQuestion: any }>()
);
export const loadSecurityQuestionsFailure = createAction(
    '[store] Load Security Questions',
    props<{ error: string }>()
);
export const setMedicalService = createAction('[store] Set Medical Service',
    props<{ medicalService: any }>()
);
export const loadMedicalServiceFailure = createAction(
    '[store] Load Security Questions',
    props<{ error: string }>()
);
export const SetHeatingSource = createAction(
    "[store] Set HeatingSource",
    props<{ heatingSource: any }>()
);
export const loadHeatingSourceFailure = createAction(
    "[store] Load HeatingSource Failure",
    props<{ error: string }>()
);
export const SetProviderName = createAction(
    "[store] Set ProviderName",
    props<{ providerName: any }>()
);

export const SetHeatingSourcesProvider = createAction(
    "[store] Set HeatingSourcesProvider",
    props<{ heatingSourcesProvider: any }>()
);

export const loadProviderNameFailure = createAction(
    "[store] Load ProviderName Failure",
    props<{ error: string }>()
);
export const SetNeedElectricity = createAction(
    "[store] Set NeedElectricity",
    props<{ needElectricity: any }>()
);
export const loadNeedElectricityFailure = createAction(
    "[store] Load NeedElectricity Failure",
    props<{ error: string }>()
);
export const loadYesNoValues = createAction(
    '[store] Set Yes No Values',
    props<{ yesNoValues: any }>()
);
export const loadYesNoValuesFailure = createAction(
    '[store] Load Yes No Values',
    props<{ error: any }>()
);
export const setOtherIncomeTypes = createAction(
    '[store] Other Income Types',
    props<{ otherIncomeTypes: any }>()
);
export const loadOtherIncomeTypesFailure = createAction(
    '[store] Load Other Income Types Failure',
    props<{ error: string }>()
);
export const loadMedicalExpenses = createAction(
  '[store] Load Medical Expenses',
  props<{ medicalExpenses: any }>()
);
export const loadMedicalExpensesFailure = createAction(
  '[store] Load Medical Expenses Failure',
  props<{ error: any }>()
);
export const setDeductableSources = createAction(
  '[store] Load Deductable Sources',
  props<{ deductableSources: any }>()
);
export const loadDeductableSourcesFailure = createAction(
  '[store] Load Other Income Types Failure',
  props<{ error: string }>()
);
export const setSharedExpenses = createAction(
  '[store] Load Shared Expenses',
  props<{ sharedExpenses: any }>()
);
export const loadSharedExpensesFailure = createAction(
  '[store] Load SharedExpenses Failure',
  props<{ error: string }>()
);
export const setChildCareDays = createAction(
  '[store] Load Shared Expenses',
  props<{ childCareDays: any }>()
);
export const loadChildCareDaysFailure = createAction(
  '[store] Load ChildCare Failure',
  props<{ error: string }>()
); 
export const loadMAProviderNumbers = createAction('[store] Set MAProviderNumbers',
    props<{ maproviderNumbers: any }>()
); 
export const loadMAProviderNumbersFailure = createAction(
    '[store] Load MAProviderNumbers',
    props<{ error: string }>()
); 
export const loadNonMAProviderNumbers = createAction('[store] Set NonMAProviderNumbers',
    props<{ nonMAproviderNumbers: any }>()
);
export const loadNonMAProviderNumbersFailure = createAction(
    '[store] Load NonMAProviderNumbers',
    props<{ error: string }>()
); 
export const loadMaleRelationship = createAction(
    '[store] Set Male Relationship',
    props<{ maleRelationship: any }>()
);
export const loadFeMaleRelationship = createAction(
    '[store] Set Female Relationship',
    props<{ femaleRelationship: any }>()
);
export const loadHouseHoldExpensesPaid = createAction(
    '[store] Set HouseHold Expenses',
    props<{ houseHoldExpenses: any }>()
);
export const loadMaleRelationshipFailure = createAction(
    '[store] Load Male Relationship Failure',
    props<{ error: string }>()
);
export const loadFeMaleRelationshipFailure = createAction(
    '[store] Load Female Relationship Failure',
    props<{ error: string }>()
);
export const loadHouseHoldExpensesPaidFailure = createAction(
    '[store] Load House Hold Expenses Paid Failure',
    props<{ error: string }>()
);
export const setReasonForEmploymentEnd = createAction(
    "[store] Set ReasonForEmploymentEnd",
    props<{ reasonForEmploymentEnd: any }>()
);
export const loadReasonForEmploymentEndFailure = createAction(
    '[store] Load ReasonForEmploymentEnd Failure',
    props<{ error: string }>()
);
export const setUnitTypes = createAction(
    "[store] Set Unit Type",
    props<{ unitType: any }>()
);
export const loadsetUnitTypesFailure = createAction(
    '[store] Load Unit Type Failure',
    props<{ error: string }>()
);
export const setPoliticalParties = createAction(
    "[store] Set Political Parties",
    props<{ politicalParties: any }>()
);
export const loadPoliticalPartiesFailure = createAction(
    '[store] Load Political Parties Failure',
    props<{ error: string }>()
);
export const setElectionDueDates = createAction(
    "[store] Set Election DueDates",
    props<{ electionDueDates: any }>()
);
export const loadElectionDueDatesFailure = createAction(
    '[store] Load Election DueDates Failure',
    props<{ error: string }>()
);
export const setSituations = createAction(
    "[store] Set Situations",
    props<{ situations: any }>()
);
export const loadSituationsFailure = createAction(
    '[store] Load Election DueDates Failure',
    props<{ error: string }>()
);
export const setResourceTypes = createAction(
    '[store] Resource Types',
    props<{ ResourceTypes: any }>()
);
export const loadResourceTypesFailure = createAction(
    '[store] Load Resource Types Failure',
    props<{ error: string }>()
);
export const setComapanyNames = createAction(
    "[store] Set ComapanyNames",
    props<{ insuranceCompnayNames: any }>()
);
export const loadComapanaNamesFailure = createAction(
    '[store] Load ComapanyNames Failure',
    props<{ error: string }>()
);
export const setPolicyTypes = createAction(
    "[store] Set PolicyTypes",
    props<{ policyTypes: any }>()
);
export const loadPolicyTypesFailure = createAction(
    '[store] Load PolicyTypes Failure',
    props<{ error: string }>()
);
export const setPolicyCoverage = createAction(
    "[store] Set PolicyTyoes",
    props<{ policyCoverage: any }>()
);
export const loadPolicyCoverageFailure = createAction(
    '[store] Load PolicyCoverage Failure',
    props<{ error: string }>()
);
export const setEmployerPolicyCoverage = createAction(
    "[store] Set Employer PolicyCoverage",
    props<{ policyCoverage: any }>()
);
export const loadEmployerPolicyCoverageFailure = createAction(
    '[store] Load EmployerPolicyCoverage Failure',
    props<{ error: string }>()
);
export const setEmployerPremiumPaidPolicy = createAction(
    "[store] Set Employer PremiumPaidPolicy",
    props<{ employerPaidPremiumPolicy: any }>()
);
export const loadEmployerPremiumPaidPolicyFailure = createAction(
    '[store] Load Employer PremiumPaidPolicy Failure',
    props<{ error: string }>()
);
export const setEmployerChangePolicy = createAction(
    "[store] Set Employer ChangePolicy",
    props<{ employerChangePolicy: any }>()
);
export const loadEmployerChangePolicyFailure = createAction(
    '[store] Load Employer ChangePolicy  Failure',
    props<{ error: string }>()
);
export const setPolicyEndCoverage = createAction(
    "[store] Set PolicyEndCoverage",
    props<{ policyEndCoverage: any }>()
);
export const loadPolicyEndCoverageFailure = createAction(
    '[store] Load PolicyEndCoverage Failure',
    props<{ error: string }>()
);

export const setLGBTQQuestions = createAction(
    "[store] Set LGBTQQuestions",
    props<{ questions: any }>()
);
export const loadLGBTQQuestionsFailure = createAction(
    '[store] Load LGBTQQuestions Failure',
    props<{ error: string }>()
);
export const setLGBTQAnswers = createAction(
    "[store] Set LGBTQAnswers",
    props<{ answers: any }>()
);
export const loadLGBTQAnswersFailure = createAction(
    '[store] Load LGBTQAnswers Failure',
    props<{ error: string }>()
);
export const setBenefits = createAction(
    "[store] Set Benefits",
    props<{ benefits: any }>()
);
export const loadBenefitsFailure = createAction(
    '[store] Load Benefits Failure',
    props<{ error: string }>()
);
export const setProgramServices = createAction(
    "[store] Set Program Services",
    props<{ programServices: any }>()
);
export const loadProgramServices = createAction(
    '[store] Load ProgramServices Failure',
    props<{ error: string }>()
);
