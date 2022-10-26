
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './app.state'
import * as fromRedFeature from './app.reducers'

export interface State {
    app: fromFeature.State;
}

export const reducers: ActionReducerMap<any, any> = {
    app: fromRedFeature.filteredReducer,
};

