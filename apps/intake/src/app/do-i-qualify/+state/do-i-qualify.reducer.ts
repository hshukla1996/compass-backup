import { createReducer, on } from '@ngrx/store';
import { DoIQualifyState, initialState } from './do-i-qualify.models';
import { DoIQualifyPageActions, DoIQualifyApiActions } from './actions';
import {clearDoIQualify} from "./actions/do-i-qualify-page.actions";

export const doIQualifyReducer = createReducer<DoIQualifyState>(
  initialState,
  on(DoIQualifyPageActions.updateMenuState, (state, action): DoIQualifyState => {
    return {
      ...state,
      menu: action.doIQualify.menu
    }
  }),
  on(DoIQualifyPageActions.clearDoIQualify, (state, action): DoIQualifyState => {
    return {
      ...initialState,
    }
  }),
  on(DoIQualifyPageActions.loadDoIQualify, (state): DoIQualifyState => {
    return {
      ...state,
      basicDetails: null,
      programSelection: null,
      householdValue: null,
      otherHouseholdSituations: null,
      summary: null,
      error: '',
      loading: true,
    };
  }),
  on(DoIQualifyApiActions.loadDoIQualifySuccess, (state, action): DoIQualifyState => {
      return {
        ...state,
        ...action.doIQualify,
        error: '',
        loading: false,
      };
    }
  ),
  on(DoIQualifyApiActions.loadDoIQualifyFailure, (state, action): DoIQualifyState => {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
  ),
  on(DoIQualifyApiActions.postDoIQualifySuccess, (state): DoIQualifyState => {
      return {
        ...state,
        error: '',
        loading: false,
      };
    }
  ),
  on(DoIQualifyApiActions.postDoIQualifyFailure, (state, action): DoIQualifyState => {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
  ),
  on(DoIQualifyPageActions.storeBasicDetails, (state, action): DoIQualifyState => {
    return {
      ...state,
      basicDetails: action.doIQualify.basicDetails
    };
  }
),
on(DoIQualifyPageActions.storeProgramSelections, (state, action): DoIQualifyState => {
  return {
    ...state,
    programSelection: action.doIQualify.programSelection
  };
}
),
on(DoIQualifyPageActions.storeHouseholdValueActions, (state, action): DoIQualifyState => {
  return {
    ...state,
    householdValue: action.doIQualify.householdValue
  };
}
),
on(DoIQualifyPageActions.storeHouseholdSituationsActions, (state, action): DoIQualifyState => {
  return {
    ...state,
    otherHouseholdSituations: action.doIQualify.otherHouseholdSituations
  };
}
),


  on(DoIQualifyPageActions.updatePageAction, (state, action): DoIQualifyState => {
    return {
      ...state,
      pageAction: action.doIQualify.pageAction
    };
  }
  ),
    on(DoIQualifyPageActions.updateScreenQueueAction, (state, action): DoIQualifyState => {
      return {
        ...state,
        pageQueue: action.doIQualify.pageQueue
      };
    }
    ),
  on(DoIQualifyPageActions.storeHouseholdsituationSelectionActions, (state, action): DoIQualifyState => {
    return {
      ...state,
      otherHouseholdSituationSelection: action.doIQualify.otherHouseholdSituationSelection,
      otherHouseholdSituations:action.doIQualify.otherHouseholdSituations
    };
  }
  ),
  
  on(DoIQualifyPageActions.updateYesNoValues, (state, action): DoIQualifyState => {
    return {
      ...state,
      yesNoValues: action.doIQualify.yesNoValues
    };
  }
  ),
  on(DoIQualifyPageActions.storeMaleFemaleRelationships, (state, action): DoIQualifyState => {
    return {
      ...state,
      maleFemaleRelationship: action.doIQualify.maleFemaleRelationship
    };
  }
  ),
);

