import { createFeatureSelector } from '@ngrx/store';

export const selectMeInfo = (state: any) => state.me.meInfo;

export const selectMyPosts = (state: any) => state.me.posts;
