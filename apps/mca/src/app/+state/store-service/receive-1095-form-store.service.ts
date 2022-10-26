import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { IReceive1095FormState } from '../models/receive-1095-form/receive-1095-form.model';
import { getReceive1095Form } from '../selectors/receive-1095-form.selector';
import * as Receive1095FormActions from '../actions/receive-1095-form/receive-1095-form-actions';

@Injectable({
  providedIn: 'root'
})
export class Receive1095FormStoreService {
  receive1095FormState$: Observable<IReceive1095FormState>;

  constructor(
    private store: Store<AppState>
  ) {
    this.receive1095FormState$ = this.store.select(getReceive1095Form);
  }

  getReceive1095FormState(): Observable<IReceive1095FormState> {
    return this.receive1095FormState$;
  }

  updateReceive1095FormState(receive1095FormState: IReceive1095FormState) {
    this.store.dispatch(Receive1095FormActions.storeReceive1095FormState({ receive1095FormState }));
  }

  clearReceive1095FormState() {
    this.store.dispatch(Receive1095FormActions.clearReceive1095FormState())
  }
}