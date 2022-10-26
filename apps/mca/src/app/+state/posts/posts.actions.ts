import { createAction, props } from '@ngrx/store';
import { Post } from '../models/post.model';

export const addPostAction = createAction(
  '[Posts page] add post',
  props<{ post: Post }>()
);

export const addedPostAction = createAction(
  '[Posts page] added post',
  props<{ post: Post }>()
);

export const updatePostAction = createAction(
  '[Posts Page] update post',
  props<{ post: Post }>()
);

export const updatedPostAction = createAction(
  '[Posts page] updated post',
  props<{ post: Post }>()
);

export const deletePostAction = createAction(
  '[Posts page] delete post',
  props<{ id: string }>()
);

export const deletedPostAction = createAction(
  '[Posts page] deleted post',
  props<{ id: string }>()
);

export const loadPosts = createAction('[Posts page] Load posts');

export const loadedPosts = createAction(
  '[Posts page] Loaded posts',
  props<{ posts: Post[] }>()
);
