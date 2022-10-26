import { createAction, props } from '@ngrx/store';
import { IReferralsState } from '../referrals.models';

export const loadReferralsSuccess = createAction(
  '[Referrals API] Load Referrals Success',
  props<{ referrals: IReferralsState }>()
);

export const loadMetaDataSuccess = createAction(
  '[Referrals API] Load Referrals Success',
  props<{ metaData: any }>()
);

export const loadReferralsFailure = createAction(
  '[Referrals API] Load Referrals Failure',
  props<{ error: string }>()
);


export const postReferralsSuccess = createAction(
  '[Referrals API] Post Referrals Success'
);

export const postReferralsFailure = createAction(
  '[Referrals API] Post Referrals Failure',
  props<{ error: string }>()
);
