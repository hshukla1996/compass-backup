import { Action, createReducer, on } from '@ngrx/store';
import * as MyNoticesPageActions from '../../actions/my-notices/my-notices-page-actions'
import { MyNotices, initialState } from '../../models/my-notices/my-notices.model';


export const myNoticesReducer = createReducer<MyNotices>(
    initialState,
    on(MyNoticesPageActions.storeMyNotices, (state, action): MyNotices => {

        return {
            ...state,
            ...action.myNotice
        };
    }
    ),


)