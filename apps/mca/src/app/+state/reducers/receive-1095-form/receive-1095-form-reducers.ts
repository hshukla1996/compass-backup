import { createReducer, on } from "@ngrx/store";
import * as Receive1095FormActions from '../../actions/receive-1095-form/receive-1095-form-actions'
import { initialState, IReceive1095FormState } from "../../models/receive-1095-form/receive-1095-form.model";

export const receive1095FormReducer = createReducer<IReceive1095FormState>(
  initialState,
  on(Receive1095FormActions.storeReceive1095FormState, (state, action): IReceive1095FormState => {

      return {
          ...state,
          ...action.receive1095FormState
      };
  }
  ),
  on(Receive1095FormActions.clearReceive1095FormState, (state, action): IReceive1095FormState => {
    return {
      ...initialState
    }
  })
)