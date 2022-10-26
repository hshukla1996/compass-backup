import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';
import { DoIQualifyService } from '../../shared/services/do-i-qualify.service';
import { DoIQualifyApiActions, DoIQualifyPageActions } from './actions';

@Injectable()
export class DoIQualifyEffects {
  constructor(private actions$: Actions, private api: DoIQualifyService) {}

  loadDoIQualify$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DoIQualifyPageActions.loadDoIQualify),
      mergeMap(() =>
        this.api.getDoIQualify().pipe(
          map((doIQualify) =>
            DoIQualifyApiActions.loadDoIQualifySuccess({ doIQualify })
          ),
          catchError((error) =>
            of(DoIQualifyApiActions.loadDoIQualifyFailure({ error }))
          )
        )
      )
    );
  });

  postDoIQualify$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DoIQualifyPageActions.postDoIQualify),
      concatMap((action) =>
        this.api.postDoIQualify(action.doIQualify).pipe(
          map(
            (_) => DoIQualifyApiActions.postDoIQualifySuccess(),
            catchError((error) =>
              of(DoIQualifyApiActions.postDoIQualifyFailure({ error }))
            )
          )
        )
      )
    );
  });
}
