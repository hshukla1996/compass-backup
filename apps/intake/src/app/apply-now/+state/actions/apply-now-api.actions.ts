import { createAction, props } from '@ngrx/store';
import { IVoterRegistrationState } from '../../voter-registration/voter-registration-model/voter-registration-model';
import { IApplyNowState } from '../apply-now.models';

export const loadApplyNowSuccess = createAction(
  '[ApplyNow API] Load ApplyNow Success',
  props<{ applyNow: IApplyNowState }>()
);
export const loadMetaDataSuccess = createAction(
  '[ApplyNow API] Load ApplyNow Success',
  props<{ metaData: any }>()
);
export const loadVoterSuccess = createAction(
  '[ApplyNow API] Load Voter ',
  props<{ voterRegistration: any }>()
);
export const loadVoterFailure = createAction(
  '[ApplyNow API] Load Voter',
  props<{ error: string }>()
);

export const loadApplyNowFailure = createAction(
  '[ApplyNow API] Load ApplyNow Failure',
  props<{ error: string }>()
);

export const postApplyNowSuccess = createAction(
  '[ApplyNow API] Post ApplyNow Success'
);

export const postApplyNowFailure = createAction(
  '[ApplyNow API] Post ApplyNow Failure',
  props<{ error: string }>()
);
