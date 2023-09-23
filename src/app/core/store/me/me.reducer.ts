import { createReducer, on } from '@ngrx/store';
import { createPost, setMyPosts, updateMeInfo, updatePost } from './me.actions';

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
  }),
  on(updatePost, (state, { post }) => {
    const posts = state.posts?.map((item) => {
      if (item._id === post._id) {
        return post;
      }
      return item;
    });

    return { ...state, posts };
  })
);
