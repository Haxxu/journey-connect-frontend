import { createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserProfileData = (state: any) => state.user.userProfileData;
