import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RoutePath } from "../../shared/route-strategies";
import { DoIQualifyState } from "./do-i-qualify.models";

const getDoIQualifyState = createFeatureSelector<DoIQualifyState>(RoutePath.DOIQUALIFY);

export const loading = createSelector(
    getDoIQualifyState,
    state => state.loading
);

export const getDoIQualify = createSelector(
    getDoIQualifyState,
    state => state
);

export const getBasicDetails = createSelector(
    getDoIQualifyState,
    state => state.basicDetails
);

export const getProgramSelection = createSelector(
    getDoIQualifyState,
    state => state.programSelection
);

export const getHouseholdValue = createSelector(
    getDoIQualifyState,
    state => state.householdValue
);

export const getOtherHouseholdSituations = createSelector(
    getDoIQualifyState,
    state => state.otherHouseholdSituations
);

export const getTotalValueOfResources = createSelector(
    getDoIQualifyState,
    state => state.totalValueOfResources
)

export const getSummary = createSelector(
    getDoIQualifyState,
    state => state.summary
);

export const getEditPerson = createSelector(
    getDoIQualifyState,
    state => state.basicDetails
);

export const getResults = createSelector(
    getDoIQualifyState,
    state => state.results
)