import { createFeatureSelector } from '@ngrx/store';

export const selectMeInfo = (state: any) => state.me.meInfo;
