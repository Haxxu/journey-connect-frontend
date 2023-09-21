import { createReducer, on } from '@ngrx/store';
import { setMyPosts, updateMeInfo } from './me.actions';

export const initialState = {
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
  })
);
