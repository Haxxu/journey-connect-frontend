import { createReducer, on } from '@ngrx/store';
import { createPost, setMyPosts, updateMeInfo } from './me.actions';

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
    const posts = [
      {
        ...post,
        owner: {
          _id: state.meInfo._id,
          first_name: state.meInfo.first_name,
          last_name: state.meInfo.last_name,
          avatar: state.meInfo.avatar,
          medias: state.meInfo.medias,
        },
      },
      ...state.posts,
    ];
    return { ...state, posts };
  })
);
