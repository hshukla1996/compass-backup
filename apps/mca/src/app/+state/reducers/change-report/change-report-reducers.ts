import { createReducer, on } from "@ngrx/store";
import * as ChangeReportActions from '../../actions/change-report/change-report-page-actions'
import { IChangeReportState, IEmploymentInformation, IHouseHoldInformation, initialState } from "../../models/change-report/change-report.model";

export const changeReportReducer = createReducer<IChangeReportState>(
    initialState,
    on(ChangeReportActions.storeHouseholdDetails, (state, action): IChangeReportState => {
        return {
            ...state,
            householdInformation: action.householdInformation
        };
    }),
    on(ChangeReportActions.storeHouseholdContactInformation, (state, action): IChangeReportState => {
        const householdInformation = state.householdInformation;
        const householdContactInformation = action.householdContactInformation;
        let updated = { ...householdInformation, householdContactInformation: householdContactInformation } as IHouseHoldInformation;
        return {
            ...state,
            householdInformation: updated
        };
    }),
    on(ChangeReportActions.storeResidentAddress, (state, action): IChangeReportState => {
       
        const householdInformation=state.householdInformation;
        const residentAddress=action.residentAddress;
        let updated = { ...householdInformation, residentAddress:residentAddress } as IHouseHoldInformation;
        return {
            ...state,
          householdInformation:updated
        };
    }
    ),
    on(ChangeReportActions.storeMailingAddress, (state, action): IChangeReportState => {
        const householdInformation = state.householdInformation;
        const mailingAddress = action.mailingAddress;
        let updated = { ...householdInformation, mailingAddress:mailingAddress } as IHouseHoldInformation;
        return {
            ...state,
            householdInformation: updated
        };
    }
    ),
    on(ChangeReportActions.storeOtherIncomeChanges, (state, action): IChangeReportState => {
        const householdInformation = state.householdInformation;
        let updated = { ...householdInformation, otherIncomeDescription: action.otherIncomeDescription } as IHouseHoldInformation;
        return {
            ...state,
            householdInformation: updated
        };
    }
    ),
    on(ChangeReportActions.storeOtherHouseholdChanges, (state, action): IChangeReportState => {
        const householdInformation = state.householdInformation;
        let updated = { ...householdInformation, otherHouseholdChanges: action.otherHouseholdChanges } as IHouseHoldInformation;
        return {
            ...state,
            householdInformation: updated
        };
    }
    ),
    on(ChangeReportActions.storeIndividualInformation, (state, action): IChangeReportState => {
        return {
            ...state,
            individualInformation: action.individualInformation
        };
    }
    ),
    on(ChangeReportActions.storeSelectedChanges, (state, action): IChangeReportState => {
        return {
            ...state,
            selectedChanges: action.selectedChanges
        };
    }
    ),
    on(ChangeReportActions.storeSelectedIncomeChanges, (state, action): IChangeReportState => {
        return {
            ...state,
            selectedIncomeChanges: action.selectedIncomeChanges
        };
    }
    ),
    on(ChangeReportActions.storeSelectedHouseholdChanges, (state, action): IChangeReportState => {
        return {
            ...state,
            selectedHouseholdChanges: action.selectedHouseholdChanges
        };
    }
    ),
    on(ChangeReportActions.storeIChangeReportState, (state, action): IChangeReportState => {
        return {
            ...action.iChangeReportState
        };
    }
    ),
    on(ChangeReportActions.storeILiheapCrisis, (state, action): IChangeReportState => {
        // const heapCrisisInformation: state.iLiheapCrisis;
        return {
            ...state,
            liheapCrisis: action.liheapCrisis
        };

    }),
    // updating Shelter and Utility expenses
    on(ChangeReportActions.storeshelterAndUtilitiesExpense, (state, action): IChangeReportState => {
        const householdInformation = state.householdInformation;
        const shelterAndUtilitiesExpense = action.shelterAndUtilitiesExpense;
        let updated = { ...householdInformation, shelterAndUtilitiesExpense: shelterAndUtilitiesExpense } as IHouseHoldInformation;
        return {
            ...state,
            householdInformation: updated
        };
    }),
    //updating resource description
    on(ChangeReportActions.storeProviderState, (state, action): IChangeReportState => {
        //debugger
        const householdInformation = state.householdInformation;
        const resources = action.resources;
        let updated = { ...householdInformation, resources: resources } as IHouseHoldInformation;
        return {
            ...state,
            householdInformation: updated
        };
    }
    ),
    // updating other communication description
    on(ChangeReportActions.storeOtherCommunicationState, (state, action): IChangeReportState => {
        debugger
        const householdInformation = state.householdInformation;
        const otherCommunications = action.otherCommunications;
        let updated = { ...householdInformation, otherCommunications: otherCommunications } as IHouseHoldInformation;
        return {
            ...state,
            householdInformation: updated
        };
    }
    ),
)