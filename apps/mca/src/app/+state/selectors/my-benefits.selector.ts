import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoutePath } from '../../shared/route-strategies';
import { AppState } from '../app.state';
import { MyBenefits } from '../models/my-benefits/my-benefits.model'; 

// const getMyBenefitsState = createFeatureSelector<MyBenefits>(
//     RoutePath.MYBENEFIT
// );

const getMybenefitsState = (state: AppState) => state

export const getBenefits = createSelector(
    getMybenefitsState,
    (state: AppState) => state.myBenefits
);
// export const loading = createSelector(
//     getMyBenefitsState,
//     (state) => state
// );

 
// export const getBenefits = createSelector(getMyBenefitsState, (state) => state);

// export const getHouseholdDetails = createSelector(
//     getMyBenefitsState,
//     state => state
// );

// export const getHouseholdHead = createSelector(
//   getReferralsState,
//   state => state.individualDetails
// );