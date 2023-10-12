import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentsState } from './comments.reducer';

export const selectComments = (state: any) => state.comments.comments;

export const selectCommentsByContextId = (contextId: string) =>
  createSelector(selectComments, (comments: any) => {
    if (comments.comments[contextId]) {
      return comments.comments[contextId].comments;
    }
    return [];
  });

export const CommentsSelector = {
  selectCommentsByContextId,
  selectComments,
};
