import { createAction, props } from '@ngrx/store';
import { State } from '../app.state';


export const getCurrentState = createAction('[store] Get Current State');
export const updateMenuState = createAction(
    '[DoIQualify Page] Update Menu Item Status',
    props<{ menuData: State }>()
);