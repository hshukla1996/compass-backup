import { createReducer, on } from "@ngrx/store";
import { ApplyNowMetaData } from "data/db";
import { ReferralsApiActions, ReferralsPageActions } from "./actions";
import { initialState, IReferralsState  } from "./referrals.models";

export const referralsReducer = createReducer<IReferralsState>(
    initialState,
    on(ReferralsPageActions.updateMenuState, (state, action): IReferralsState => {
        return {
            ...state,
            menu: action.referrals.menu,
        }
    }),
    on(ReferralsPageActions.loadReferrals, (state): IReferralsState => {
        // alert(JSON.stringify(state));
        return {
            ...state
        }
    }),
    on(ReferralsPageActions.clearReferrals, (state, action): IReferralsState => {
        return {
            ...initialState,
        }
    }),
    // on(ReferralsApiActions.loadMetaDataSuccess, (state, action): any => {


    //     return {
    //         ...state,
    //         // metaData: ReferralsMetaData
    //     }
    // }
    // ),
    on(ReferralsPageActions.storeHouseholdDetails, (state, action): IReferralsState => {
    
        return {
            ...state,
            ...{householdDetails: action.householdDetails}
        };
    }
    ),
    on(ReferralsPageActions.storeHouseholdContact, (state, action): IReferralsState => {

        return {
            ...state,
            ...{ householdContact: action.householdContact }
        };
    }
    ),
    on(ReferralsPageActions.storeHouseHoldDetails, (state, action): IReferralsState => {
        return {
            ...state,
            household: action.household
        };
    }
    ),
    on(ReferralsPageActions.storeIndividuals, (state, action): IReferralsState => {
        return {
            ...state,
            individuals:action.individuals
        };
    }
    ),
    on(ReferralsPageActions.updateScreenQueueAction, (state, action): IReferralsState => {
        return {
            ...state,
            pageQueue: action.referral.pageQueue
        };
    }
    ),
    on(ReferralsPageActions.updatePageAction, (state, action): IReferralsState => {

        return {
            ...state,
            pageAction: action.pageAction
        };
    }
    ),
    on(ReferralsPageActions.storeServicesSelected, (state, action): IReferralsState => {
        return {
            ...state,
            servicesselected: action.services
        };
    }
    ),
    // on(ReferralsPageActions.storeIndividualDetails, (state, action): IReferralsState => {
    //     return {
    //         ...state,
    //         // household: action.individualDetails
    //     };
    // }
    // ),


)
