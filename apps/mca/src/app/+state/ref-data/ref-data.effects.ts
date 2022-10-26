import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { RefTableGqlService } from '../../shared/services/ref-table-gql.service';
import { MyBenefitsService } from '../../shared/services/my-benefits/my-benefits.service'; 
import { RefDataService } from '../../shared/services/ref-data.service';

import {
  addedPostAction,
  addPostAction,
  deletedPostAction,
  deletePostAction,
  loadedPosts,
  loadedCounties,
  loadedCountiesFailure,
  loadPosts,
  loadCounties,
  updatedPostAction,
  updatePostAction,
} from './ref-data.actions';

@Injectable()
export class RefDataEffects {
  constructor(private actions$: Actions, private api: RefTableGqlService) {}

  loadCountiesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCounties),
      mergeMap((action) => 
        this.api.getRefData("R00017", []).pipe(
          map((response) =>
            loadedCounties({
              counties: response.data,
            })
          ),
          catchError((error: any) =>
          of(
            loadedCountiesFailure({
                error,
              })
            )
          )
        )
            )
      )
            });
  };

   
