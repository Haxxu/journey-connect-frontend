import { createReducer, on } from '@ngrx/store';
import {
  createPost,
  deletePost,
  setMyPosts,
  updateMeInfo,
  updatePost,
} from './me.actions';

export interface MeState {
  meInfo: any;
  posts: any[];
}

export const initialState: MeState = {
  meInfo: {},
  posts: [],
};

export const meReducer = createReducer(
  initialState,
  on(updateMeInfo, (state, { meInfo }) => {
    return { ...state, meInfo };
  }),
  on(setMyPosts, (state, { posts }) => {
    return { ...state, posts };
  }),
  on(createPost, (state, { post }) => {
    const posts = [post, ...state.posts];

    return { ...state, posts };
  }),
  on(updatePost, (state, { post }) => {
    const posts = state.posts?.map((item) => {
      if (item._id === post._id) {
        return post;
      }
      return item;
    });

    return { ...state, posts };
  }),
  on(deletePost, (state, { post }) => {
    return {
      ...state,
      posts: state.posts.filter((item) => item._id !== post._id),
    };
  })
);
