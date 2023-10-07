import { createFeatureSelector } from '@ngrx/store';

export const selectFeedPosts = (state: any) => state.posts.feedPosts;

export const selectPosts = (state: any) => state.posts.posts;

export const selectLoadingPosts = (state: any) => state.posts.loadingPosts;
