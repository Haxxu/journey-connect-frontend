import { createReducer, on } from '@ngrx/store';
import { setPosts, addPost, updatePost } from './posts.actions';

export interface PostsState {
  posts: any[];
}

export const initialState: PostsState = {
  posts: [],
};

export const postsReducer = createReducer(
  initialState,
  on(setPosts, (state, { posts }) => {
    return { ...state, posts };
  }),
  on(addPost, (state, { post }) => {
    const updatedPosts = [post, ...state.posts];
    return { ...state, posts: updatedPosts };
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
