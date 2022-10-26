import { MenuData } from "@compass-ui/data";
import { IIndividual, IServicesSelected } from "./household-details-model";
import * as menu from '../menu';
import { IHousehold, InitialHousehold } from "./contact-information-model";

export interface IReferralsState {
  menu: MenuData | null,
  gettingStarted: GettingStarted | null;
  //contract
  household: IIndividual;
  individuals?: IIndividual[],
  servicesselected?: IServicesSelected[],
  pageQueue: PageQueue | null;
  pageAction: PageAction | null;
  //contract

  error: string;
  loading: boolean;
  currentState: string
}

export const initialState: IReferralsState = {
  menu: menu.menuData,
  gettingStarted: null,
  //contract
  household: {},
  individuals: [],
  servicesselected: [],
  pageQueue:null,
  pageAction: null,
  //contract
  error: '',
  loading: false,
  currentState: 'Referral'
};

export interface ReferralsModel {
  // menu: MenuData | null,
  // gettingStarted: GettingStarted | null;
  household:IIndividual | undefined;
  individuals: IIndividual[] | undefined,
  servicesselected: IServicesSelected[] | undefined,
  // pageQueue: PageQueue,
  // pageAction: PageAction,
}

export interface GettingStarted {
  menu: MenuData | null,
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: string;
}

export interface Individual {
  individualNumber: number,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  county: number,
  schoolDistrict: number,
  appliedReferrals: [],
  reasonForReferral: string,
  relationshipToContactPerson: string,
  isIntervention: boolean | false,
  age: number,
  gender: string,
}
export interface Individuals {
  individuals: Individual[],
  validState: Boolean;
}
export enum PageDirection {
  BACK = "BACK",
  NEXT = "NEXT",
}
export interface PageAction {

  currentServicesMap?: any,
  serviceDirection?: string,

}

export interface PageQueue {
  currentPageId: 0,
  pageMap: any
}
//Basic Details
// export interface BasicDetailsModel {
//   householdHead: HouseholdHead | null;
//   houseHoldMemberSummary: HouseHoldMemberSummary | null;
//   isValid?: boolean;
// }

export interface HouseholdHead {
  individualNumber: number
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  gender: string,
}

export interface HouseHoldMemberSummary {
  id: string;
}
