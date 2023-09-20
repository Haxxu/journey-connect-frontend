import { createAction, props } from '@ngrx/store';

export const updateMeInfo = createAction(
  '[Me] update meInfo',
  props<{ meInfo: any }>()
);
