import { createAction, props } from '@ngrx/store';
import {  DoIQualifyAPIModel, DoIQualifyModel } from '../do-i-qualify.models';

export const loadDoIQualifySuccess = createAction(
  '[DoIQualify API] Load DoIQualify Success',
  props<{ doIQualify: DoIQualifyAPIModel }>()
);

export const loadDoIQualifyFailure = createAction(
  '[DoIQualify API] Load DoIQualify Failure',
  props<{ error: string }>()
);

export const postDoIQualifySuccess = createAction(
  '[DoIQualify API] Post DoIQualify Success'
);

export const postDoIQualifyFailure = createAction(
  '[DoIQualify API] Post DoIQualify Failure',
  props<{ error: string }>()
);
