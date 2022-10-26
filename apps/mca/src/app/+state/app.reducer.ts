// src/app/core/state/core.reducers.ts

import {Action, ActionReducerMap, createReducer, MetaReducer, on } from "@ngrx/store";
import { AppState, initialState, State } from "./app.state"; 

import {postsReducer} from "./posts/posts.reducer";
import {PostsState} from "./posts/posts.state";
import { refDataReducer } from "./reducers/ref-data/ref-data.reducer";
import { ActionReducer, INIT, UPDATE } from "@ngrx/store";
import * as AppPageActions  from "./actions/app.page-actions";
import { changeReportReducer } from "./reducers/change-report/change-report-reducers";
import { myBenefitsReducer } from "./reducers/my-benefits/my-benefits-reducers";
import { myNoticesReducer } from "./reducers/my-notices/my-notices-reducers";
import { receive1095FormReducer } from "./reducers/receive-1095-form/receive-1095-form-reducers";
// import { myBenefitsReducer } from "./reducers/my-benefits/my-benefits-reducers";


export const appReducer = createReducer<State>(
   initialState,
  on(AppPageActions.updateMenuState, (state, action): State => {
    return {
      ...state,
      menu: action.menuData.menu
    }
  }),
)
export const reducers: ActionReducerMap<AppState> = {
  posts : postsReducer,
  // viewBenefits: myBenefitsReducer,
  myBenefits: myBenefitsReducer,
  refData: refDataReducer,
  appState: appReducer,
  changeReport: changeReportReducer,
  myNotices: myNoticesReducer,
  receive1095FormState: receive1095FormReducer
};

export const hydrationMetaReducer = (
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> => {

  return (state, action) => {

    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = sessionStorage.getItem("state");

      if (storageValue) {
        try {
          const storedObj = JSON.parse(storageValue)
          if (storedObj.appState.currentState === 'MCA State') {
            return storedObj;
          }
          else {
            sessionStorage.removeItem("state");
          }

        } catch {
          sessionStorage.removeItem("state");
        }
      }
    }
    const nextState = reducer(state, action);
    sessionStorage.setItem("state", JSON.stringify(nextState));
    return nextState;
  };
};
export const metaReducers: MetaReducer<AppState>[] = [hydrationMetaReducer];




