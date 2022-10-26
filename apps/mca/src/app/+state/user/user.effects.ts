import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap, map } from "rxjs/operators";
import * as UserActions from "./user.actions";

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions<any>
    ) {}

   /*
     mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data:any) => {
            const post = { id: data['name'], ...action.post };
            return addedPostAction({ post });
          })
        );
      })*/

  /*  login$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(UserActions.allNavbarActions.loginFlowInitiated.type),
             //   tap((action) => this.authService.login(action.login)),
                map((userDetails: any) =>
                    UserActions.userChangedFromAuth0SDK({
                        userDetails: userDetails,
                    })
                )
            ),
        { dispatch: false }
    );
*/
    // logout$ = createEffect(
    //     () =>
    //         this.actions$.pipe(
    //             ofType(UserActions.allNavbarActions.logoutFlowInitiated.type),
    //             tap(() => this.authService.logout())
    //         ),
    //     { dispatch: false }
    // );
}
