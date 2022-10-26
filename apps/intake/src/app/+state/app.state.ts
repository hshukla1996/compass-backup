
export interface State {
  counties: any[];
  countries: any[];
  documentTypes: any[];
  citizenship: any[];
  schoolDistrict: any[];
  serviceBranches: any[];
  relationships: any;
  electricCompaniesList: any;
  suffix: any[];
  facilities: any[];
  states: any[];
  drinkingWater:any[];
  wasteWater:any[];
  amountPeriods: any[];
  pays: any[];
  insuranceNameType: any[];
  immunizations: any[];
  schoolTypes: any[];
  nslpSchoolTypes: any[];
  schoolGrades: any[];
  numberOfExpectedBabies: any[];
  benefitTypes: any[];
  maritalStatus: any[];
  applicationLanguage: any[];
  educations: any[];
  races: any[];
  contactRoles: any[];
  townShip: any[];
  livSituation: any[];
  houSituation: any[];
  maleInvRelationships: any[];
  femaleInvRelationships: any[];
  parentSpouseOrBoth: any[];
  referralPhoneNumbers: any[];
  countyOfPlacement: any[];
  veteranStatus: any[];
  disabilityType: any[];
  disabilitySsi: any[];
  childDisability: any[];
  securityQuestions: any[];
  medicalService: any[];
  heatingSource: any[];
  providerName: any[];
  heatingSourcesProvider: any[];
  needElectricity: any[];
  yesNoValues: any[];
  otherIncomeTypes: any[];
  medicalExpenses: any[];
  deductableSources: any[];
  sharedExpenses: any[];
  childCareDays: any[];
  maleRelationship: any[];
  femaleRelationship: any[];
  houseHoldExpensesPaid: any[];
  maproviderNumbers: any[];
  nonMAproviderNumbers: any[];
  reasonForEmploymentEnd: any[];  
  unitType:any[];
  politicalParties:any[];
  electionDueDates: any[];
  situations:any[];
  resourceTypes:any[];
  insuranceCompnayNames: any[],
  policyTypes: any[],
  policyCoverage: any[],
  employerCoverage:any[],
  employerPaidPremiumPolicy:any[],
  employerChangePolicy:any[]
  policyEndCoverage:any[]
  lgbtqQuestions: any[],
  lgbtqAnswers: any[],
  benefits:any[],
  programServices: any[]
}

export const initialState = {
  counties: [],
  countries: [],
  documentTypes: [],
  citizenship: [],
  schoolDistrict: [],
  serviceBranches: [],
  relationships: {},
  electricCompaniesList: [],
  suffix: [],
  facilities: [],
  states: [],
  drinkingWater:[],
  wasteWater: [],
  amountPeriods: [],
  pays: [],
  schoolTypes: [],
  nslpSchoolTypes: [],
  schoolGrades: [],
  numberOfExpectedBabies: [],
  houseHoldExpensesPaid: [],
  benefitTypes: [],
  insuranceNameType: [],
  immunizations: [],
  contactRoles: [],
  maritalStatus: [],
  applicationLanguage: [],
  educations: [],
  races: [],
  townShip: [],
  livSituation: [],
  houSituation: [],
  maleInvRelationships: [],
  femaleInvRelationships: [],
  parentSpouseOrBoth: [],
  referralPhoneNumbers: [],
  countyOfPlacement: [],
  veteranStatus: [],
  disabilityType: [],
  disabilitySsi: [],
  childDisability: [],
  securityQuestions: [],

  yesNoValues: [],
  otherIncomeTypes: [],

  medicalService: [],
  heatingSource: [],
  providerName: [],
  heatingSourcesProvider:[],
  needElectricity: [],
  medicalExpenses: [],
  deductableSources: [],
  sharedExpenses: [],
  childCareDays: [],
  maleRelationship: [],
  femaleRelationship: [],
  maproviderNumbers: [],
  nonMAproviderNumbers: [],
  reasonForEmploymentEnd: [],  
  unitType:[],
  politicalParties:[],
  electionDueDates:[],
  situations:[],
 
  resourceTypes:[],
  insuranceCompnayNames: [],
  policyTypes: [],
  policyCoverage: [],
  employerCoverage:[],
  employerPaidPremiumPolicy:[],
  employerChangePolicy:[],
  policyEndCoverage:[],
  lgbtqQuestions: [],
  lgbtqAnswers: [],
  benefits:[],
  programServices:[]
};

