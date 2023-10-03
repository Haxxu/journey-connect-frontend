import { createAction, props } from '@ngrx/store';

export const setFeedPosts = createAction(
  '[FEED_POSTS] Set feed posts',
  props<{ posts: any }>()
);

export const addFeedPost = createAction(
  '[FEED_POSTS] Add feed post',
  props<{ post: any }>()
);

export const updateFeedPost = createAction(
  '[FEED_POSTS] Update feed post',
  props<{ post: any }>()
);
