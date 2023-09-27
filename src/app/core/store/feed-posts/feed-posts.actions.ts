import { createAction, props } from '@ngrx/store';

export const setFeedPosts = createAction(
  '[POSTS] Set feed posts',
  props<{ posts: any }>()
);
