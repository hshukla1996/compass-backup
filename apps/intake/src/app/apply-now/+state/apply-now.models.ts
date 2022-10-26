import { MenuData } from "@compass-ui/data";
import * as menu from '../menu';
import { IGeneralDetails, IHouseHoldGeneralDetails, InitialGeneralDetails } from "../individual-details/general-details/state/general-details-model";
import { InitialResourcesDetails, IResourcesDetails } from "../resources/state/resources-state-model";
import { houseHoldDetails,IAbsentRelative,IHouseHold, IHouseholdAddress, IHouseHoldDetails } from "../household/household-model";
import { IInsurance, insuranceInitialState, IWhoIsCovered} from "../insurance/insurance.model";
import { IHousehold } from "../../referrals/+state/contact-information-model";
import { AbsentRelativeDetails } from "../household/models/absentRelativeDetails";
import { initialVoterData, IVoterRegistrationState } from "../voter-registration/voter-registration-model/voter-registration-model";
import { InsuranceState } from "../insurance/model/insurance.model";

export interface IApplyNowState {
  menu: MenuData | null,
  gettingStarted: GettingStarted | null;
  gettingStartedResponse: any;
  benefitsNotRecevied: IBenefitsNotRecevied | null;
  benefitsNotReceviedDetails: IBenefitsNotReceviedDetails | null;
  pregnancySummaryScreenDetails: IPregnancySummaryScreenDetails | null;
  pregnancyScreenData: IPregnancyScreen | null;
  federalInComeTaxReturnDetails: IFederalIncomeTaxReturn | null;
  taxDependentDetails: ITaxDependents | null;
  taxDependentDetailsData: ITaxDependentsDetails | null;
  domesticViolenceDetails: IDomesticViolence | null;
  familPlanningServicesDetails: IFamilyPlanningServices | null;
  homeLesssNessDetails: IHomelessness | null;
  migrantOrSeasonalFarmWorkerDetails: IMigrantOrSeasonalFarmWorker | null;
  receivingTANF?: ICurrentSnapOrTanfBenefits | null;
  receivedTANFInPasts6Months: IPriorTanfOrCashAssistance | null;
  socialSecurityDisability?: ISocialSecurityDisability[];
  isAnyoneCurrentlyIncarcerated: ICurrentlyInPrison | null;
  householdgeneralDetails: IHouseHoldGeneralDetails;
  insuranceDetails: IInsurance;
  whoIsCoveredDetails: IWhoIsCovered[];
  houseHoldDetails: IHouseHoldDetails;
  //resourcesDetails: IResourcesDetails;
  resourceSelections: ResourceSelections | null;
  resourcesMetaData: any;
  metaData: any;
  error: string;
  loading: boolean;
  currentState: string;
  pageAction: PageAction | null;
  pageQueue: PageQueue | null;
  household: IHousehold;
  programSelection: ProgramSelection | null;
  incomeGatepostSelection: IncomeGatepostSelection | null;
  incomeFutureJobSelection: IncomeFutureJobSelection | null;
  incomeJobs: IncomeJobs[] | null;
  householdDetails: HouseholdDetails | null;
  otherHouseholdSituations: OtherHouseholdSituations | null;
  householdMemberSituationGatepostSelection: HouseholdMemberSituationGatepostOptions | null;
  householdHasAnyoneReceivedSSDInThePast: IHouseholdHasAnyoneReceivedSSDInThePast|null;
  householdHasAnyoneReceivedSSIInThePast: IHouseholdHasAnyoneReceivedSSIInThePast|null;
  whoHasBeenConvictedAFelony: IIndividualOwnesFines | null;
  whoWasConvictedForWelfareFraud: IIndividualConvictedWelfareFraud | null;
  whoIsOnProbationOrParole: IIndividualCurrentlyOnProbation | null;
  whoIsCurrentlyFleeingFromLawEnforcementOfficials: IIndividualCurrentlyFleeing | null;
  fromSummary:IFromSummary|null;
  receivedLongTermServices?:IReceivedLongTermServices | null,
  voterRegistration?: IVoterRegistrationState | null,
  insurance: InsuranceState |null,
  pageQueueData: PageQueueData|null
}


export interface IVoterRegistration {
  usCitizen?: string,
  adultAge?: string,
  situationSelected?: string[],
  registrationNumber?: string,
  registrationYear?: string
  /*  validState: true,
   editId: number */
}


export interface HouseholdDetails {
  householdDetails: IHouseHold[]
 /*  validState: true,
  editId: number */
}

export const initialState: IApplyNowState = {
  menu: menu.menuData,
  gettingStarted: null,
  gettingStartedResponse: null,
  householdgeneralDetails: InitialGeneralDetails,
  benefitsNotRecevied: null,
  benefitsNotReceviedDetails: null,
  pregnancyScreenData: null,
  pregnancySummaryScreenDetails: null,
  federalInComeTaxReturnDetails: null,
  taxDependentDetails: null,
  taxDependentDetailsData: null,
  domesticViolenceDetails: null,
  familPlanningServicesDetails: null,
  homeLesssNessDetails: null,
  migrantOrSeasonalFarmWorkerDetails: null,
  receivingTANF: null,
  receivedTANFInPasts6Months: null,
  socialSecurityDisability: [],
  isAnyoneCurrentlyIncarcerated: null,
  // resourcesDetails: InitialResourcesDetails,
  resourceSelections: null,
  insuranceDetails: insuranceInitialState,
  houseHoldDetails: houseHoldDetails,
  // ApplicantAddress: houseHoldDetails,
  resourcesMetaData: null,
  error: '',
  metaData: null,
  loading: false,
  currentState: 'ApplyNow',
  pageAction: null,
  pageQueue: null,
  whoIsCoveredDetails: [],
  household: {},
  programSelection:null,
  incomeGatepostSelection: null,
  incomeFutureJobSelection: null,
  incomeJobs: null,
  householdDetails:null,
  otherHouseholdSituations: null,
  householdMemberSituationGatepostSelection:null,
  householdHasAnyoneReceivedSSDInThePast:null,
  householdHasAnyoneReceivedSSIInThePast:null,
  // absentRelative: absentRelative,
  whoHasBeenConvictedAFelony:null,
  whoWasConvictedForWelfareFraud:null,
  whoIsOnProbationOrParole:null,
  whoIsCurrentlyFleeingFromLawEnforcementOfficials: null,
  fromSummary:null,
  voterRegistration: initialVoterData as IVoterRegistrationState,
  insurance:null,
  pageQueueData:null
};

export interface GettingStarted {
  menu: MenuData | null,
  medicalServiceType: string,
  maProviderNumber:string,
  nonProviderNumber:string,
  dateOfFirstAdmission:string,
  isMA: boolean,
  userType: string
}

export interface IBenefitsNotRecevied {
  benefitsNotReceviedData: IBenefitsNotReceviedData[],
  validState: boolean | true
}

export interface IBenefitsNotReceviedData {
  id: number
  firstName: string,
  lastName: string,
  gender: string,
  age: number,
  hasRecevied: boolean
}

export interface IBenefitsNotReceviedDetails {
  benefitsNotReceviedPersonDetails: IBenefitsNotReceviedPersonDetails[] | [];
  validState: boolean | true
}
export interface IBenefitsNotReceviedPersonDetails {
  benefitApplyDate: string;
  benefitType: string;
  applyForBenefits: number;
  benefitReceivedDate: string;
}

export interface ICurrentSnapOrTanfBenefits {
  code:boolean,
  individualNumbers:number[]
}

export interface IPriorTanfOrCashAssistance {
  code:boolean,
  individualNumbers:number[]
}

export interface ISocialSecurityDisability {
  socialSecurityDisability: [];
}

export interface ICurrentlyInPrison {
  code:boolean,
  individualNumbers:number[]
}

export interface IPregnancySummaryScreenDetails {
  pregnancyDueDate: string,
  babiesRequired: string,
  // validState: boolean | true
}

export interface IPregnancyScreen {
  pregnancyScreenData: IPregnancyScreenData[],
  validState: boolean | true
}
export interface ApplyNowModel {
  menu: MenuData | null,
  gettingStarted: GettingStarted | null;
}
export interface IPregnancyScreenData {
  id: number
  firstName: string,
  lastName: string,
  gender: string,
  age: number,
  hasRecevied: boolean | false,
}

export interface IFederalIncomeTaxReturn {
  federalIncomeTaxReturnData: IFederalIncomeTaxReturnData[],
  validState: boolean | true
}

export interface IFederalIncomeTaxReturnData {
  id: number
  firstName: string,
  lastName: string,
  gender: string,
  age: number,
  hasIncomeTaxReturn: boolean | false,
}

export interface ITaxDependents {
  taxDependentsData: ITaxDependentsData[],
  validState: boolean | true
}
export interface ITaxDependentsData {
  id: number
  firstName: string,
  lastName: string,
  gender: string,
  age: number,
  hasTaxDependentData: boolean | false,
}
export interface ITaxDependentsDetails {
  claimType: string,
  validState: boolean | true
}

export interface IDomesticViolence {
  domesticViolenceData: IDomesticViolenceData[],
  validState: boolean | true
}

export interface IDomesticViolenceData {
  id: number
  firstName: string,
  lastName: string,
  gender: string,
  age: number,
  isSubjectToDomesticViolence: boolean | false,
}

export interface IFamilyPlanningServices {
  familyPlanningServicesData: IFamilyPlanningServicesData[],
  validState: boolean | true
}

export interface IFamilyPlanningServicesData {
  id: number
  firstName: string,
  lastName: string,
  gender: string,
  age: number,
  isPlanning: boolean | false,
}
export interface IHomelessness {
  homelessnessData: IHomelessnessData[],
  validState: boolean | true
}

export interface IHomelessnessData {
  id: number
  firstName: string,
  lastName: string,
  gender: string,
  age: number,
  hasRecevied: boolean | false,
}
export interface IMigrantOrSeasonalFarmWorker {
  migrantOrSeasonalFarmWorkerData: IMigrantOrSeasonalFarmWorkerData[],
  validState: boolean | true
}

export interface IMigrantOrSeasonalFarmWorkerData {
  id: number
  firstName: string,
  lastName: string,
  gender: string,
  age: number,
  hasRecevied: boolean | false,
}

//Household
export interface HouseholdModel {
  houseHoldHead: HouseholdHead | null;
  houseHoldMemberSummary: HouseHoldMemberSummary | null;
  householdAnotherPerson: HouseholdAnotherPerson | null;
  isValid?: boolean;
}

export interface HouseholdHead {
  id: number
  firstName: string,
  midName: string,
  lastName: string,
  suffix: any,
  dateOfBirth: string,
  gender: string,
  otherName?: any,
  otherNameVal?: string,
}

export interface HouseHoldMemberSummary {
  id: string;
}

export interface HouseholdAnotherPerson {
  id: number
  firstName: string,
  midName: string,
  lastName: string,
  suffix: any,
  dateOfBirth: any,
  gender: string,
  otherName?: any[],
  otherNameVal?: string,
  relationship: any
}

export interface PageAction {

  currentIncomeMap: Map<any, boolean>,
  incomePageDirection: string,
  currentOtherIncomeMap: Map<any, boolean>,
  otherIncomePageDirection: string,
  currentlyEnrolledMap: Map<any, boolean>,
  currentlyEnrolledPageDirection: string,
  currentPregnancyMap: { },
  currentFederalTaxReturnMap: {},
  currentPregnancyDirection: string,
  SSIIncomeMap:{},
  SSIIncomeMapDirection: string
  SSDMap:{},
  SSDMapDirection: string,
  familyPlanningServiceMap: {},
  familyPlanningServiceDirection: string
  familyPlanningServiceAfraidMap: {},
  familyPlanningServiceAfraidDirection: string,
  benefitNotRecievedMap: {},
  benefitNotRecievedDirection: string,
  currentPolicyHolder: {},
  currentPolicyHolderDirection: string,
  currentPolicyCoveredBy: {},
  currentPolicyCoveredByDirection: string
  currentPolicyInsuranceCompany:{},
  currentPolicyInsuranceCompanyDirection:{},
  currentPolicyAddress: {},
  currentPolicyAddressDirection: string,
  currentPolicyCoverage:{},
  currentPolicyCoverageDirection:string,
  currentPolicyType:{},
  currentPolicyTypeDirection:string,
  currentPolicyEmployer:{},
  currentPolicyEmployerDirection:string,
  currentPolicyEnd:{},
  currentPolicyEndDirection:string,
  priorPolicyHolder: {},
  priorPolicyHolderDirection: string,
  priorPolicyCoveredBy:{},
  priorPolicyCoveredByDirection:string,
  priorPolicyInsuranceCompany:{},
  priorPolicyInsuranceCompanyDirection:string,
  priorPolicyAddress:{},
  priorPolicyAddressDirection:{},
  priorPolicyCoverage: {},
  priorPolicyCoverageDirection: string,
  priorPolicyType: {},
  priorPolicyTypeDirection: string,
  priorPolicyEnd:{},
  priorPolicyEndDirection:string,
  employerPolicyHolder:{},
  employerPolicyHolderDirection:string,
  employerPolicyInformation:{},
  employerPolicyInformationDirection:string,
  employerPolicyContact:{},
  employerPolicyContactDirection:String,
  employerPolicyCoveredBy:{},
  employerPolicyCoveredByDirection:string,
  employerPolicyCoverage:{},
  employerPolicyCoverageDirection:string,
  employerPolicyProviderAdditionalDetail:{},
  employerPolicyProviderAdditionalDetailDirection:string,
  employerPolicyEnd:{},
  employerPolicyEndDirection:string,
  employerPolicyType: {},
  employerPolicyTypeDirection: string,
}

export interface HouseholdMemberSituationGatepost {

  isLess150BeforeTaxesAreTakenOut: boolean,
  isLessEqual100InCashCheckingSaving: boolean,
  isUtilityMoreThanAsset: boolean,
  isReceivingUtilityAllowanceCheck: boolean,
  isParentNotLiveOrDiedFor21OrYounger: boolean,
  isSpouseDiedOrNotLivingInTheHouse: boolean,
  isNeedChildSupportOrHealthInsurance: boolean,
  hasLivedInNursingFacility: boolean,
  isLivingInCertifiedShelter: boolean,
  isLostJobReducedHoursWithNoFaultInLastYr: boolean,
  isDisbledBlindIllOrNeedtoOvercomeDrugOrAlcohol: boolean,
  isReceivingTreatmentForDrugOrAlcohol: boolean

}
/* export interface HouseholdMemberSituationGatepostOptions {
  isLess150BeforeTaxesAreTakenOut: boolean,
  isLessEqual100InCashCheckingSaving: boolean,
  isUtilityMoreThanAsset:boolean,
  isReceivingUtilityAllowanceCheck: boolean,
  isParentNotLiveOrDiedFor21OrYounger: boolean,
  isSpouseDiedOrNotLivingInTheHouse: boolean,
  isNeedChildSupportOrHealthInsurance:boolean,
  hasLivedInNursingFacility: boolean,
  isLivingInCertifiedShelter: boolean,
  isLostJobReducedHoursWithNoFaultInLastYr: boolean,
  isDisbledBlindIllOrNeedtoOvercomeDrugOrAlcohol: boolean,
  isReceivingTreatmentForDrugOrAlcohol: boolean
}
 */
export interface ProgramSelection {
  programs: string[]
}

export interface IncomeGatepostSelection {
gateposts: []
}

export interface IncomeFutureJobSelection {
  gateposts: string[]
}

export interface IncomeJobs {
  id: string,
  label: string,
  name: string,
  age: string,
  sex: string,
  jobGrossIncome: string,
  jobPayFrequency: string,
  employerStreetAddress: string,
  employerStreetAddress2: string,
  employerCity: string,
  employerState: string,
  employerZip: string,
  jobBeginDate: string,
  jobHoursPerWeek: string,
  jobHourlyPayRate: string,
  jobLastPayCheck: string
}


export enum Programs {
  HC = "HC",
  HA = "HA",
  MCR = "MCR",
  MAR = "MAR",
  CHR = "CHR",
  CH = "CH",
  PE = "PE",
  MI = "MI",
  SMA = "SMA",
  LN = "LN",
  LI = "LI",
  LNR = "LNR",
  LIR = "LIR",
  WAR= "WAR",
  WN = "WN",
  WNR = "WNR",
  CA = "CA",
  CAR = "CAR",
  ECA = "ECA",
  FS = "FS",
  FSR = "FSR",
  ES = "ES",
  ESR = "ESR",
  LH = "LH",
  LHP = "LHP",
  LW = "LW",
  CI = "CI",
  CIR = "CIR",
  BL = "BL",
  ABR ="ABR",
  FP = "FP",
  FPR = "FPR",
  LHCR = "LHCR"
}

export enum Income {
  CFE = "CFE",
  PE = "PE",
  OI = "OI",
  FAD = "FAD",
  NOTA = "NOTA",

}

export interface PageQueue {
  currentPageId: 0,
  pageMap?: Set<any>,
  expensesCurrentPageId:0,
  expensespageMap?:Set<any>,
  queueName: ''
}

export interface OtherHouseholdSituations {

  isLess150BeforeTaxesAreTakenOut: boolean,
  isLessEqual100InCashCheckingSaving: boolean,
  isUtilityMoreThanAsset: boolean,
  isReceivingUtilityAllowanceCheck: boolean,
  isParentNotLiveOrDiedFor21OrYounger: boolean,
  isSpouseDiedOrNotLivingInTheHouse: boolean,
  isNeedChildSupportOrHealthInsurance: boolean,
  hasLivedInNursingFacility: boolean,
  isLivingInCertifiedShelter: boolean,
  isLostJobReducedHoursWithNoFaultInLastYr: boolean,
  isDisbledBlindIllOrNeedtoOvercomeDrugOrAlcohol: boolean,
  isReceivingTreatmentForDrugOrAlcohol: boolean
}

export interface HouseholdMemberSituationGatepostOptions {

  isLess150BeforeTaxesAreTakenOut: boolean,
  isLessEqual100InCashCheckingSaving: boolean,
  isUtilityMoreThanAsset: boolean,
  isReceivingUtilityAllowanceCheck: boolean,
  isParentNotLiveOrDiedFor21OrYounger: boolean,
  isSpouseDiedOrNotLivingInTheHouse: boolean,
  isNeedChildSupportOrHealthInsurance: boolean,
  hasLivedInNursingFacility: boolean,
  isLivingInCertifiedShelter: boolean,
  isLostJobReducedHoursWithNoFaultInLastYr: boolean,
  isDisbledBlindIllOrNeedtoOvercomeDrugOrAlcohol: boolean,
  isReceivingTreatmentForDrugOrAlcohol: boolean
  hasIncome: boolean,
  hasOtherIncome: boolean,
  isCurrentlyEnrolled: boolean,
  isInFosterCare: boolean,
  isPregnant: boolean;
  hasHealthConditionLimitation: boolean,
  childOfUnitedStatesVeteran: boolean,
  hasUndergoneOperation: boolean,
  onGoingMedication: boolean
}
export interface IHouseholdHasAnyoneReceivedSSDInThePast{
code:boolean,
individualNumbers:number[]
}
export interface IHouseholdHasAnyoneReceivedSSIInThePast {
  code: boolean,
  individualNumbers: number[]
}

export enum Resource {

  FH    = "FH"  ,   // Financial Holdings
  ORP   = "ORP" ,   // Owns Residential Property
  ONRP  = "ONRP",   // Owns Non-Residentail Property
  ERM   = "ERM" ,   // Expecting to receive any money like inheritance
  OV    = "OV"  ,   // Owns any vehicle
  OBS   = "OBS" ,   // Owns a burial space
  BOTA  = "BOTA",   // Burial or Trust Agreement
  OLIP  = "OLIP",   // Owns a Life Insurance Policy
  NONE  = "NONE",   // None

}

export interface ResourceSelections {

  resources: [];

}

export interface IReceivedLongTermServices {
  federalIncomeTaxReturnData: IFederalIncomeTaxReturnData[],
  validState: boolean | true
}

export interface IReceivedLongTermServicesData {
  id: number
  firstName: string,
  lastName: string,
  gender: string,
  age: number,
  hasReceived: boolean | false,
}

export interface IBenefitsNotReceivedInformation {
  hasAppliedForBenefitButNotReceived?: string,
  benefits?: IBenefits[],

}
export interface IBenefits {
  code: string | null;
  dateApplied: string;
  howMuch: number;
  expectedDate: string
}

export interface IIndividualOwnesFines {
  code:boolean,
  individualNumbers:number[]
}

export interface IIndividualConvictedWelfareFraud {
  code:boolean,
  individualNumbers:number[]
}

export interface IIndividualCurrentlyOnProbation {
  code:boolean,
  individualNumbers:number[]
}

export interface IIndividualCurrentlyFleeing {
  code:boolean,
  individualNumbers:number[]
}
export interface IFromSummary {
  isFromAdd: boolean,
  benefitId: string | null,
  userIds?: any[] | null,
  userId?:any|null
  isFromEdit?: boolean
}

export interface LgbtqInitiateRequest {
  applicationNumber: number
}
export interface LgbtqSubmitRequest {
  applicationNumber: number,
  surveyQuesAnsList: any[]
}
export interface LgbtqResponse {
  surveystatus: number
}

export enum PageQueueName {
  //Give proper name for queue,below is example only
  GATEPOSTONE = 'GATEPOSTONE',
  GATEPOSTTWO = 'GATEPOSTTWO'
}
export type PageQueueData =
  {
    [key in PageQueueName]: {
      pageQueue: PageQueue
    }
  }

