import { createReducer, on } from '@ngrx/store';
import { setUserProfileData } from './user.actions';

export interface UserState {}

export const initialState: UserState = {
  userProfileData: {},
};

export const userReducer = createReducer(
  initialState,

  on(setUserProfileData, (state, { user }) => {
    return { ...state, userProfileData: user };
  })
);
