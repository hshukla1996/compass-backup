import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';

export const POST_STATE_NAME = 'posts';

export const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);
export const getPosts = createSelector(getPostsState, (state) => {
  return state.posts;
});

export const getPostById = createSelector(getPostsState, (state:PostsState, props:any) => {
  return state.posts.find((p) => p.id === props.id);
});
