// import { TestBed } from '@angular/core/testing';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { Action } from '@ngrx/store';
// import { provideMockStore } from '@ngrx/store/testing';
// import { NxModule } from '@nrwl/angular';
// import { hot } from 'jasmine-marbles';
// import { Observable } from 'rxjs';

// import * as DoIQualifyActions from './do-i-qualify.actions';
// import { DoIQualifyEffects } from './do-i-qualify.effects';

// describe('DoIQualifyEffects', () => {
//   let actions: Observable<Action>;
//   let effects: DoIQualifyEffects;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [NxModule.forRoot()],
//       providers: [
//         DoIQualifyEffects,
//         provideMockActions(() => actions),
//         provideMockStore(),
//       ],
//     });

//     effects = TestBed.inject(DoIQualifyEffects);
//   });

//   describe('init$', () => {
//     it('should work', () => {
//       actions = hot('-a-|', { a: DoIQualifyActions.init() });

//       const expected = hot('-a-|', {
//         a: DoIQualifyActions.loadDoIQualifySuccess({ doIQualify: [] }),
//       });

//       expect(effects.init$).toBeObservable(expected);
//     });
//   });
// });
