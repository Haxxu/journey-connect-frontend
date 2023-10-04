import { createFeatureSelector } from '@ngrx/store';

export const selectPosts = (state: any) => state.posts.posts;
