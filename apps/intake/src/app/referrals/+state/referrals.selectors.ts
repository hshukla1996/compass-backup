import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoutePath } from '../../shared/route-strategies';
import { IReferralsState } from './referrals.models';

const getReferralsState = createFeatureSelector<IReferralsState>(
  RoutePath.REFERRALS
);

export const loading = createSelector(
  getReferralsState,
  (state) => state.loading
);

export const getReferrals = createSelector(getReferralsState, (state) => state);

export const getHouseholdDetails = createSelector(
  getReferralsState,
  state => state.household
);

// export const getHouseholdHead = createSelector(
//   getReferralsState,
//   state => state.individualDetails
// );