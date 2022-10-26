// import { Action } from '@ngrx/store';

// import * as ApplyNowActions from './apply-now.actions';
// import { ApplyNowState } from './apply-now.models';
// import { AppState, initialState, reducer } from './apply-now.reducer';

// describe('ApplyNow Reducer', () => {
//   const createApplyNowEntity = (id: string, name = ''): ApplyNowState => ({
//     id,
//     name: name || `name-${id}`,
//   });

//   describe('valid ApplyNow actions', () => {
//     it('loadApplyNowSuccess should return the list of known ApplyNow', () => {
//       const applyNow = [
//         createApplyNowEntity('PRODUCT-AAA'),
//         createApplyNowEntity('PRODUCT-zzz'),
//       ];
//       const action = ApplyNowActions.loadApplyNowSuccess({ applyNow });

//       const result: AppState = reducer(initialState, action);

//       expect(result.loaded).toBe(true);
//       expect(result.ids.length).toBe(2);
//     });
//   });

//   describe('unknown action', () => {
//     it('should return the previous state', () => {
//       const action = {} as Action;

//       const result = reducer(initialState, action);

//       expect(result).toBe(initialState);
//     });
//   });
// });
