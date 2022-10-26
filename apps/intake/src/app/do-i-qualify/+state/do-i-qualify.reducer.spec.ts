// import { Action } from '@ngrx/store';

// import * as DoIQualifyActions from './do-i-qualify.actions';
// import { DoIQualifyEntity } from './do-i-qualify.models';
// import { AppState, initialState, reducer } from './do-i-qualify.reducer';

// describe('DoIQualify Reducer', () => {
//   const createDoIQualifyEntity = (id: string, name = ''): DoIQualifyEntity => ({
//     id,
//     name: name || `name-${id}`,
//   });

//   describe('valid DoIQualify actions', () => {
//     it('loadDoIQualifySuccess should return the list of known DoIQualify', () => {
//       const doIQualify = [
//         createDoIQualifyEntity('PRODUCT-AAA'),
//         createDoIQualifyEntity('PRODUCT-zzz'),
//       ];
//       const action = DoIQualifyActions.loadDoIQualifySuccess({ doIQualify });

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
