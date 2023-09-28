import { createAction, props } from '@ngrx/store';

export const setUserProfileData = createAction(
  '[USER] Set user profile data',
  props<{ user: any }>()
);
