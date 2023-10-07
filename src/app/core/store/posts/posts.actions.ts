import { createAction, props } from '@ngrx/store';

export const setPosts = createAction(
  '[POSTS] Set posts',
  props<{ posts: any }>()
);

export const setFeedPosts = createAction(
  '[POSTS] Set feed posts',
  props<{ posts: any }>()
);

export const addPost = createAction('[POSTS] Add post', props<{ post: any }>());

export const updatePost = createAction(
  '[POSTS] Update post',
  props<{ post: any }>()
);

export const addMoreFeedPosts = createAction(
  '[POSTs] Add more feed posts',
  props<{ posts: any }>()
);

export const setLoadingPosts = createAction(
  '[POSTs] Set loading posts',
  props<{ loading: any }>()
);
