import { createReducer, on } from '@ngrx/store';
import { updateMeInfo } from './me.actions';

export const initialState = {
  meInfo: {},
};

export const meReducer = createReducer(
  initialState,
  on(updateMeInfo, (state, { meInfo }) => {
    return { ...state, meInfo };
  })
);
