import { createAction, props } from '@ngrx/store';
import { IReceive1095FormState } from '../../models/receive-1095-form/receive-1095-form.model';


export const storeReceive1095FormState = createAction(
    '[Receive 1095-B page] add or update receive1095FormState',
    props<{ receive1095FormState: IReceive1095FormState }>()
);
export const clearReceive1095FormState = createAction(
    '[Receive 1095-B page] clear receive1095FormState'
);