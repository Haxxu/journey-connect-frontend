import { createReducer, on } from '@ngrx/store';
import {
  setPosts,
  addPost,
  updatePost,
  setFeedPosts,
  addMoreFeedPosts,
  setLoadingPosts,
  deletePost,
} from './posts.actions';

export interface PostsState {
  loadingPosts: boolean;
  posts: any[];
  feedPosts: any[];
}

export const initialState: PostsState = {
  loadingPosts: false,
  posts: [],
  feedPosts: [],
};

export const postsReducer = createReducer(
  initialState,
  on(setPosts, (state, { posts }) => {
    return { ...state, posts };
  }),

  on(setLoadingPosts, (state, { loading }) => {
    return { ...state, loadingPosts: loading };
  }),

  on(setFeedPosts, (state, { posts }) => {
    return { ...state, feedPosts: posts };
  }),

  on(addPost, (state, { post }) => {
    const posts = [post, ...state.posts];
    const feedPosts = [post, ...state.feedPosts];
    return {
      ...state,
      posts,
      feedPosts,
    };
  }),

  on(updatePost, (state, { post }) => {
    const posts = state.posts?.map((item) => {
      if (item._id === post._id) {
        return post;
      }
      return item;
    });

    const feedPosts = state.feedPosts?.map((item) => {
      if (item._id === post._id) {
        return post;
      }
      return item;
    });

    return { ...state, posts, feedPosts };
  }),

  on(deletePost, (state, { post }) => {
    const posts = state.posts?.filter((item) => item._id !== post._id);

    const feedPosts = state.feedPosts?.filter((item) => item._id !== post._id);

    return { ...state, posts, feedPosts };
  }),

  on(addMoreFeedPosts, (state, { posts }) => {
    const feedPosts = [...state.feedPosts, ...posts];
    return {
      ...state,
      feedPosts,
    };
  })
);
