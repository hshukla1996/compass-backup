import { createAction, props } from '@ngrx/store';
import { IHousehold } from '../contact-information-model';
// import { IIndividual } from '../household-details-model';
import { IIndividual, IServicesSelected } from '../household-details-model';
import { IReferralsState, PageAction, ReferralsModel } from '../referrals.models';
export const clearReferrals = createAction('[Referrals Page] Clear Referrals');
export const loadReferrals = createAction('[Referrals Page] Load Referrals');
export const loadReferralsMetaData = createAction('[Referrals Page] Load ReferralsMetaData');

export const postReferrals = createAction(
  '[Referrals Page] Post Referrals',
  props<{ Referrals: IReferralsState }>()
);

export const storeGettingStarted = createAction(
  '[Referrals Page] Store GettingStarted',
  props<{ Referrals: IReferralsState }>()
);

export const storeHouseholdDetails = createAction(
  '[Referrals Page] Store HouseholdDetails',
  props<{ householdDetails: IIndividual[] }>()
);
//main
export const storeHouseHoldDetails = createAction(
  '[Referrals Page] Store HouseholdDetails',
  props<{ household: IIndividual }>()
);
export const storeIndividuals = createAction(
  '[Referrals Page] Store IndividualDetails',
  props<{ individuals: IIndividual[] }>()
);
export const storeServicesSelected = createAction(
  '[Referrals Page] Store ServicesSelected',
  props<{ services: IServicesSelected[] }>()
);

export const updateScreenQueueAction = createAction(
  '[Referral Page] Update Page Queue Detail',
  props<{ referral: any }>()
);
export const updatePageAction = createAction(
  '[Referral Page] Update Page Action',
  props<{ pageAction: PageAction }>()
);

//main
export const storeHouseholdContact = createAction(
  '[Referrals Page] Store HouseholdContact',
  props<{ householdContact: IHousehold }>()
);

export const storeIndividualDetails = createAction(
  '[Referrals Page] Store IndividualDetails',
  // props<{ individualDetails: IIndividualDetails }>()
);

export const loadReferralsMenu = createAction('[Referral Page] Load Menu');

export const updateMenuState = createAction(
  '[Referrals Page] Update Menu Item Status',
  props<{ referrals: IReferralsState }>()
);
