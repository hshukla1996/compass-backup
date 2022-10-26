import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
const getAppState = (state: AppState) => state
export const getAppStateData = createSelector(
    getAppState,
    (state: AppState) => state.appState
);
