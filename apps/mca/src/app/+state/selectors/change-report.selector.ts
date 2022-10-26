import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RoutePath } from "../../shared/route-strategies";
import { AppState } from "../app.state";
import { IChangeReportState } from "../models/change-report/change-report.model";

const getChangeReportState = (state:AppState)=>state

export const getChangeReport = createSelector(
    getChangeReportState,
    (state: AppState) => state.changeReport
);
export const getMailingAddress= createSelector(
    getChangeReportState,
    (state: AppState) => state.changeReport.householdInformation?.mailingAddress
);
export const getResidentAddress = createSelector(
    getChangeReportState,
    (state: AppState) => state.changeReport.householdInformation?.residentAddress
);
