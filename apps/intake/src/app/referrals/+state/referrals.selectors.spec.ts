import { ReferralsState } from './referrals.models';
import {
  referralsAdapter,
  ReferralsPartialState,
  initialState,
} from './referrals.reducer';
import * as ReferralsSelectors from './referrals.selectors';

describe('Referrals Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getReferralsId = (it: ReferralsState) => it.id;
  const createReferralsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ReferralsState);

  let state: ReferralsPartialState;

  beforeEach(() => {
    state = {
      referrals: referralsAdapter.setAll(
        [
          createReferralsEntity('PRODUCT-AAA'),
          createReferralsEntity('PRODUCT-BBB'),
          createReferralsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Referrals Selectors', () => {
    it('getAllReferrals() should return the list of Referrals', () => {
      const results = ReferralsSelectors.getAllReferrals(state);
      const selId = getReferralsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ReferralsSelectors.getSelected(state) as ReferralsState;
      const selId = getReferralsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getReferralsLoaded() should return the current "loaded" status', () => {
      const result = ReferralsSelectors.getReferralsLoaded(state);

      expect(result).toBe(true);
    });

    it('getReferralsError() should return the current "error" state', () => {
      const result = ReferralsSelectors.getReferralsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
