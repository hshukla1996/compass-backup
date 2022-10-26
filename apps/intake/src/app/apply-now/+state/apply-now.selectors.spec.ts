// import { ApplyNowState } from './apply-now.models';
// import {
//   applyNowAdapter,
//   ApplyNowPartialState,
//   initialState,
// } from './apply-now.reducer';
// import * as ApplyNowSelectors from './apply-now.selectors';

// describe('ApplyNow Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getApplyNowId = (it: ApplyNowState) => it.id;
//   const createApplyNowEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as ApplyNowState);

//   let state: ApplyNowPartialState;

//   beforeEach(() => {
//     state = {
//       applyNow: applyNowAdapter.setAll(
//         [
//           createApplyNowEntity('PRODUCT-AAA'),
//           createApplyNowEntity('PRODUCT-BBB'),
//           createApplyNowEntity('PRODUCT-CCC'),
//         ],
//         {
//           ...initialState,
//           selectedId: 'PRODUCT-BBB',
//           error: ERROR_MSG,
//           loaded: true,
//         }
//       ),
//     };
//   });

//   describe('ApplyNow Selectors', () => {
//     it('getAllApplyNow() should return the list of ApplyNow', () => {
//       const results = ApplyNowSelectors.getAllApplyNow(state);
//       const selId = getApplyNowId(results[1]);

//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getSelected() should return the selected Entity', () => {
//       const result = ApplyNowSelectors.getSelected(state) as ApplyNowState;
//       const selId = getApplyNowId(result);

//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getApplyNowLoaded() should return the current "loaded" status', () => {
//       const result = ApplyNowSelectors.getApplyNowLoaded(state);

//       expect(result).toBe(true);
//     });

//     it('getApplyNowError() should return the current "error" state', () => {
//       const result = ApplyNowSelectors.getApplyNowError(state);

//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });
