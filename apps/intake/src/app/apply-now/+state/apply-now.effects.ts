import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, tap } from 'rxjs';
import { ApplyNowService } from '../../shared/services/apply-now.service';
import { VoterRegistrationService } from '../../shared/services/voter-registration.service';

import { ApplyNowPageActions, ApplyNowApiActions } from './actions';

@Injectable()
export class ApplyNowEffects {
  constructor(private actions$: Actions, private api: ApplyNowService, private voterRegService: VoterRegistrationService) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplyNowPageActions.loadApplyNow),
      mergeMap(() =>
        this.api.getApplyNow().pipe(
          map((response) =>
            ApplyNowApiActions.loadApplyNowSuccess({ applyNow:response  })
          ),
          catchError((error) =>
            of(ApplyNowApiActions.loadApplyNowFailure({ error }))
          )
        )
      )
    )
  );

  loadApplyNowMetaData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplyNowPageActions.loadApplyNowMetaData),
      mergeMap(() =>
        this.api.getApplyNow().pipe(
          map((response) =>
            ApplyNowApiActions.loadMetaDataSuccess( {metaData:response} )
          ),
          catchError((error) =>
            of(ApplyNowApiActions.loadApplyNowFailure({ error }))
          )
        )
      )
    )
  );
  
  loadVoterData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplyNowPageActions.loadApplyNowVoter), tap((appId) => console.log(appId)),
      concatMap((appId:any) =>
        this.voterRegService.getVoterRegistration(appId).pipe(
          map((response) =>
            ApplyNowApiActions.loadVoterSuccess({ voterRegistration: response })
          ),
          catchError((error) =>
            of(ApplyNowApiActions.loadVoterFailure({ error }))
          )
        )
      )
    )
  );
  // loadItems$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ApplyNowPageActions.loadApplyNowVoter),
  //     mergeMap(() =>
  //       this.voterRegService.getAll(action.appId).pipe(
  //         map((items) =>
  //           ApplyNowApiActions.loadVoterSuccess({
  //             type: ITEMS_LOADED_SUCESSFULLY,
  //             items: itemsList, })
  //         ),
  //         catchError((error) =>
  //           of(ApplyNowApiActions.loadVoterFailure({ error }))
  //         )
  //       )
  //     )
  //   )
  // );


 
}
