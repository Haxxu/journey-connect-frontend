import { createAction, props } from '@ngrx/store';

export const setSocketConnection = createAction(
  '[FRIEND] Set socket connection',
  props<{ connected: any }>()
);

export const setSocket = createAction(
  '[FRIEND] Set socket ',
  props<{ socket: any }>()
);
