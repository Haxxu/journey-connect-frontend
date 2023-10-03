import { createReducer, on } from '@ngrx/store';
import {
  setFeedPosts,
  addFeedPost,
  updateFeedPost,
} from './feed-posts.actions';

export interface FeedPostsState {
  posts: any[];
}

export const initialState: FeedPostsState = {
  posts: [],
};

export const feedPostsReducer = createReducer(
  initialState,
  on(setFeedPosts, (state, { posts }) => {
    return { ...state, posts };
  }),
  on(addFeedPost, (state, { post }) => {
    const updatedPosts = [post, ...state.posts];
    return { ...state, posts: updatedPosts };
  }),
  on(updateFeedPost, (state, { post }) => {
    const posts = state.posts?.map((item) => {
      if (item._id === post._id) {
        return post;
      }
      return item;
    });

    return { ...state, posts };
  })
);
