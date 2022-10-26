import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoutePath } from '../../shared/route-strategies';
import { AppState } from '../app.state';


const getMyNoticesState = (state: AppState) => state

export const getNotices = createSelector(
    getMyNoticesState,
    (state: AppState) => state.myNotices
);