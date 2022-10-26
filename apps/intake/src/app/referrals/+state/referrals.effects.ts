import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ReferralsService } from '../../shared/services/referrals.service';

import { ReferralsPageActions, ReferralsApiActions } from './actions';

@Injectable()
export class ReferralsEffects {
  constructor(private actions$: Actions, private api: ReferralsService) {}
/*
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReferralsPageActions.loadReferrals),
      mergeMap(() =>
        this.api.getReferrals().pipe(
          map((response) =>
            ReferralsApiActions.loadReferralsSuccess({ referrals: response })
          ),
          catchError((error) =>
            of(ReferralsApiActions.loadReferralsFailure({ error }))
          )
        )
      )
    )
  );
  loadReferralsMetaData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReferralsPageActions.loadReferralsMetaData),
      mergeMap(() =>
        this.api.getReferrals().pipe(
          map((response) =>
            ReferralsApiActions.loadMetaDataSuccess({ metaData: response })
          ),
          catchError((error) =>
            of(ReferralsApiActions.loadReferralsFailure({ error }))
          )
        )
      )
    )
  ); */
}
