import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RoutePath } from "../../shared/route-strategies";
import { IApplyNowState } from "./apply-now.models";

const getApplyNowState = createFeatureSelector<IApplyNowState>(RoutePath.APPLYNOW);

export const loading = createSelector(
    getApplyNowState,
    state => state.loading
);

export const getApplyNow = createSelector(
    getApplyNowState,
    state => state
);

export const getGeneralDetails = createSelector(
    getApplyNowState,
    state => state.householdgeneralDetails
);

//household
export const getHouseholdHead = createSelector(
    getApplyNowState,
    state => state.houseHoldDetails
);

//resources
export const getResourceSelections = createSelector(
    getApplyNowState,
    state => state.resourceSelections
);
