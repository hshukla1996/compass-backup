import { MenuData } from "@compass-ui/data";
import * as menu from '../menu';
export interface DoIQualifyState {
  menu: MenuData | null,
  basicDetails: BasicDetails | null;
  programSelection: ProgramSelection | null;
  householdValue: TotalHouseHoldValue | null;
  otherHouseholdSituations: OtherHouseholdSituations | null;
  totalValueOfResources: TotalValueOfResources | null;
  summary: Summary | null;
  results: Results | null;
  error: string;
  loading: boolean;
  pageAction:PageAction | null;
  pageQueue:PageQueue | null;
  currentState: string,
  otherHouseholdSituationSelection: OtherHouseholdSituationsOptions|null
  yesNoValues: YesNoValues | null;
  maleFemaleRelationship: MaleFemaleRelationship|null
}

export const initialState: DoIQualifyState = {
    menu: menu.menuData,
    basicDetails: null,
    programSelection: null,
    householdValue: null,
    otherHouseholdSituations: null,
    totalValueOfResources: null,
    summary: null,
    results: null,
    error: '',
    loading: false,
    pageAction:null,
    pageQueue:null,
  currentState :'DoIQualify',
  otherHouseholdSituationSelection:null,
  yesNoValues:null,
  maleFemaleRelationship:null
};

export interface DoIQualifyModel {
  menu: MenuData | null,
  basicDetails: BasicDetails | null;
  programSelection: ProgramSelection | null;
  householdValue: TotalHouseHoldValue | null;
  otherHouseholdSituations: OtherHouseholdSituations | null;
  results: Results | null;
  summary: Summary | null;
  pageAction:PageAction | null;
  pageQueue:PageQueue | null;
  otherHouseholdSituationSelection: OtherHouseholdSituationsOptions|null
  yesNoValues: YesNoValues | null;
  maleFemaleRelationship: MaleFemaleRelationship | null
}

export interface TotalValueOfResources {
  id: string;
}
export interface IRelationships{
  "individualLookupId": number,
  "relationshipType": string
}

export interface BasicDetail{
  relationships: IRelationships[];
  id:number
  firstName:string,
  lastName:string,
  gender:string,
  age:number,
  dob:string,
  isEmployed:boolean | false,
  incomeFromJobs:number | null,
  incomeFromOtherJobs:number |null
  hasOtherIncome:boolean |false;
  isPregnant:boolean | false;
  relationshipType: string;
  hasEnrolledInSchool:boolean|false;
  headOfHouse: boolean;
  schoolType:string;
  wasInFosterCareOnEighteenthBirthdayOrLater:boolean|false;
  isRelatedToVeteran: boolean | false,
  isOperationPreventsPregnancy: boolean | false,
  isDisabled:boolean|false,
  guardians:number[],

}

export interface BasicDetails
{
  basicDetails:BasicDetail[],
  validState:true,
  editId:number
}

export interface ProgramSelection {

  programs:[];
}
export interface TotalHouseHoldValue {

  totalvalue: number|null;
}
export interface OtherHouseholdSituations {

  totalValueOfResources: number,
  isPayingHeat: boolean,
  isTwentyOneOrYoungerAndNoParent: boolean,
  isSpouseAbsentee: boolean,
  isLostJobOrReducedHoursLastYear: boolean,
  isWantHelpPayingMedicalBillsForLastThreeMonths: boolean,
  isInMedicalOrLivingServices: boolean,
  isVictimOfDomesticAbuse: boolean,
  isInTreatmentOfDrugAndAlchoholAbuse: boolean,

}
export interface Summary {
  id: string;
}
export interface Results{
  id:string;
}

export interface OtherHouseholdSituationsOptions
{


  isPayingHeat: boolean,
  isTwentyOneOrYoungerAndNoParent: boolean,
  isSpouseAbsentee: boolean,
  isLostJobOrReducedHoursLastYear: boolean,
  isWantHelpPayingMedicalBillsForLastThreeMonths: boolean,
  isInMedicalOrLivingServices: boolean,
  isVictimOfDomesticAbuse: boolean,
  isInTreatmentOfDrugAndAlchoholAbuse: boolean,
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

export interface HouseHoldSummary {
  id: string;
}
export interface PageAction{

  currentIncomeMap:{},
  incomePageDirection:string,
  currentOtherIncomeMap: {},
  otherIncomePageDirection: string,
  currentlyEnrolledMap: {},
  currentlyEnrolledPageDirection: string,
  guardianMap:{},
  guardianPageDirection:string

}
export interface PageQueue
{
  currentPageId:0,
  pageMap:any
}
export enum Programs{
  CA="CA",
  HS ="HS",
  FS ="FS",
  BL ="BL",
  LH ="LH",
  CI ="CI",
  HA="HA",
  CAR="CAR",
  ECA="ECA"
}
export enum Age{
  GUARDIANAGE=14,
  LHAGE=14,
  CIAGE=19,
  BLAGE=22
}
export interface Individual{
  id: number
  firstName: string,
  lastName: string,
  gender: string,
  age: number,
  dob: string,
  isEmployed: string | null,
  incomeFromJobs: number | null,
  incomeFromOtherJobs: number | null
  hasOtherIncome: string | null
  isPregnant: string | null
  relationshipType: string;
  hasEnrolledInSchool: string | null
  headOfHouse: string | null
  schoolType: string;
  wasInFosterCareOnEighteenthBirthdayOrLater: string | null
  isRelatedToVeteran: string | null,
  isOperationPreventsPregnancy: string | null,
  isDisabled: string | null,
  guardians: number[],
}
export interface Household{
  totalValueOfResources: number ,
  isPayingHeat: string | null,
  isTwentyOneOrYoungerAndNoParent: string | null,
  isSpouseAbsentee: string | null,
  isLostJobOrReducedHoursLastYear: string | null,
  isWantHelpPayingMedicalBillsForLastThreeMonths: string | null,
  isInMedicalOrLivingServices: string | null,
  isVictimOfDomesticAbuse: string | null,
  isInTreatmentOfDrugAndAlchoholAbuse: string | null,
}
export interface DoIQualifyAPIModel{
individuals:Individual[],
  household: Household,
benefits:string[]
}
export enum DoIQualifyAPIResponseStatus{
  NO='N',
  YES='Y'
}
export enum DoIQualifyAPIRequestStatus{
  NO=2,
  YES=1
}
export interface YesNoValues{
  YesValue:any,
  NoValue:any;
}
export interface MaleFemaleRelationship
{
  male:any[],
  female:any[]
}


