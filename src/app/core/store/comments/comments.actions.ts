import { createAction, props } from '@ngrx/store';

export const addContextComments = createAction(
  '[COMMENTS] Add comments',
  props<{ contextId: string; comments: any[]; totalComments: number }>()
);

export const addCommentByContextId = createAction(
  '[COMMENTS] Add comment by context id',
  props<{ contextId: string; comment: any }>()
);

export const CommentsAction = {
  addContextComments,
  addCommentByContextId,
};
