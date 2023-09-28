import { createAction, props } from '@ngrx/store';

export const setFeedPosts = createAction(
  '[FEED_POSTS] Set feed posts',
  props<{ posts: any }>()
);
