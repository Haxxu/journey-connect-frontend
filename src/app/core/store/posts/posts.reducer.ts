import { createReducer, on } from '@ngrx/store';
import { setPosts, addPost, updatePost, setFeedPosts } from './posts.actions';

export interface PostsState {
  posts: any[];
  feedPosts: any[];
}

export const initialState: PostsState = {
  posts: [],
  feedPosts: [],
};

export const postsReducer = createReducer(
  initialState,
  on(setPosts, (state, { posts }) => {
    return { ...state, posts };
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
  })
);
