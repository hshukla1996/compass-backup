import { Post } from "../models/post.model";

export interface PostsState {
  posts: Post[]
}

export const initialState : PostsState = {
  posts: []
}
