import { createAction, props } from '@ngrx/store';

export const updateMeInfo = createAction(
  '[ME] Update meInfo',
  props<{ meInfo: any }>()
);

export const setMyPosts = createAction(
  '[ME] Set my posts',
  props<{ posts: any }>()
);

export const createPost = createAction(
  '[ME] Create post',
  props<{ post: any }>()
);

export const updatePost = createAction(
  '[ME] update post',
  props<{ post: any }>()
);

export const deletePost = createAction(
  '[ME] delete post',
  props<{ post: any }>()
);
