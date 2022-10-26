import { createAction, props } from '@ngrx/store';


export const storeMyNotices = createAction(
    '[MyNotices page] add MyNotices',
    props<{ myNotice: any }>()
);