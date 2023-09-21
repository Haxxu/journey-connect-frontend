import { createAction, props } from '@ngrx/store';

export const updateMeInfo = createAction(
  '[Me] Update meInfo',
  props<{ meInfo: any }>()
);

export const setMyPosts = createAction(
  '[ME] Set my posts',
  props<{ posts: any }>()
);
