import { createAction, props } from '@ngrx/store';

export const setUserInfo = createAction(
  '[USER] Set user profile',
  props<{ user: any }>()
);

export const setIsLoading = createAction(
  '[USER] Set loading',
  props<{ isLoading: any }>()
);

export const userStateAction = {
  setUserInfo,
  setIsLoading,
};
