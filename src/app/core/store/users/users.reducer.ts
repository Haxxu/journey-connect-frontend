import { createReducer, on } from '@ngrx/store';
import { setIsLoading, setUserInfo } from './users.actions';

export interface UsersState {
  userInfo: any;
  isLoading: boolean;
  error: string | null;
}

export const initialState: UsersState = {
  isLoading: true,
  error: '',
  userInfo: {},
};

export const usersReducer = createReducer(
  initialState,

  on(setIsLoading, (state, { isLoading }) => {
    return { ...state, isLoading };
  }),
  on(setUserInfo, (state, { user }) => {
    return { ...state, userInfo: user };
  })
);
