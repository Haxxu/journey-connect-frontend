import { createReducer, on } from '@ngrx/store';
import { setFeedPosts } from './feed-posts.actions';

export interface FeedPostsState {}

export const initialState: FeedPostsState = [];

export const feedPostsReducer = createReducer(
  initialState,
  on(setFeedPosts, (state, { posts }) => {
    return posts;
  })
);
