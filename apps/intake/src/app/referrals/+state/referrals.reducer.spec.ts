import { Action } from '@ngrx/store';

import * as ReferralsActions from './referrals.actions';
import { ReferralsState } from './referrals.models';
import { State, initialState, reducer } from './referrals.reducer';

describe('Referrals Reducer', () => {
  const createReferralsEntity = (id: string, name = ''): ReferralsState => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Referrals actions', () => {
    it('loadReferralsSuccess should return the list of known Referrals', () => {
      const referrals = [
        createReferralsEntity('PRODUCT-AAA'),
        createReferralsEntity('PRODUCT-zzz'),
      ];
      const action = ReferralsActions.loadReferralsSuccess({ referrals });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
