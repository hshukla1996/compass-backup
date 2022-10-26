import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { PostsService } from '../../shared/services/posts.service';
import {
  addedPostAction,
  addPostAction,
  deletedPostAction,
  deletePostAction,
  loadedPosts,
  loadPosts,
  updatedPostAction,
  updatePostAction,
} from './posts.actions';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}

  loadPostsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this.postsService.getPosts().pipe(
          map((posts) => {
            return loadedPosts({ posts });
          })
        );
      })
    );
  });

  addPostsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPostAction),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data:any) => {
            const post = { id: data['name'], ...action.post };
            return addedPostAction({ post });
          })
        );
      })
    );
  });

  updatePostEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePostAction),
      mergeMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            return updatedPostAction({ post: action.post });
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
