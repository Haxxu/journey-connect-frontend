import { createFeatureSelector } from '@ngrx/store';

export const selectUserInfo = (state: any) => state.users.userInfo;

export const selectUsersState = (state: any) => state.users;
