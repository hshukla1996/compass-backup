// import { DoIQualifyEntity } from './do-i-qualify.models';
// import {
//   doIQualifyAdapter,
//   DoIQualifyPartialState,
//   initialState,
// } from './do-i-qualify.reducer';
// import * as DoIQualifySelectors from './do-i-qualify.selectors';

// describe('DoIQualify Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getDoIQualifyId = (it: DoIQualifyEntity) => it.id;
//   const createDoIQualifyEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as DoIQualifyEntity);

//   let state: DoIQualifyPartialState;

//   beforeEach(() => {
//     state = {
//       doIQualify: doIQualifyAdapter.setAll(
//         [
//           createDoIQualifyEntity('PRODUCT-AAA'),
//           createDoIQualifyEntity('PRODUCT-BBB'),
//           createDoIQualifyEntity('PRODUCT-CCC'),
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

//   describe('DoIQualify Selectors', () => {
//     it('getAllDoIQualify() should return the list of DoIQualify', () => {
//       const results = DoIQualifySelectors.getAllDoIQualify(state);
//       const selId = getDoIQualifyId(results[1]);

//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getSelected() should return the selected Entity', () => {
//       const result = DoIQualifySelectors.getSelected(state) as DoIQualifyEntity;
//       const selId = getDoIQualifyId(result);

//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getDoIQualifyLoaded() should return the current "loaded" status', () => {
//       const result = DoIQualifySelectors.getDoIQualifyLoaded(state);

//       expect(result).toBe(true);
//     });

//     it('getDoIQualifyError() should return the current "error" state', () => {
//       const result = DoIQualifySelectors.getDoIQualifyError(state);

//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });
