import { createFeatureSelector } from '@ngrx/store';

export const selectFeedPosts = (state: any) => state.posts.feedPosts;
