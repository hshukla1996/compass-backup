import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { MyBenefitsService } from '../../shared/services/my-benefits/my-benefits.service';
import {
    addedPostAction,
    addPostAction,
    deletedPostAction,
    deletePostAction,
    loadedPosts,
    loadPosts,
    updatedPostAction,
    updatePostAction,
} from './my-benefits.actions';

@Injectable()
export class PostsEffects {
    constructor(private actions$: Actions, private postsService: MyBenefitsService) { }

    loadPostsEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadPosts),
            mergeMap((action) => {
                return this.postsService.getPosts().pipe(
                    map((myBenefits) => {
                        return loadedPosts({ myBenefits });
                    })
                );
            })
        );
    });

    addPostsEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addPostAction),
            mergeMap((action) => {
                return this.postsService.addPost(action.myBenefit).pipe(
                    map((data: any) => {
                        const post = { id: data['name'], ...action.myBenefit };
                        return addedPostAction({ myBenefit: action.myBenefit });
                    })
                );
            })
        );
    });

    updatePostEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updatePostAction),
            mergeMap((action) => {
                return this.postsService.updatePost(action.myBenefit).pipe(
                    map((data) => {
                        return updatedPostAction({ myBenefit: action.myBenefit });
                    })
                );
            })
        );
    });

    deletePostEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deletePostAction),
            mergeMap((action) => {
                return this.postsService.deletePost(action.id).pipe(
                    map((data) => {
                        return deletedPostAction({ id: action.id });
                    })
                );
            })
        );
    });
}
