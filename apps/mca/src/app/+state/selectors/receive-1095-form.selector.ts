import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

const getState = (state: AppState) => state

export const getReceive1095Form = createSelector(
  getState,
    (state: AppState) => state.receive1095FormState
);