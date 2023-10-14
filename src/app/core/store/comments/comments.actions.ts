import { createAction, props } from '@ngrx/store';

export const addContextComments = createAction(
  '[COMMENTS] Add comments',
  props<{ contextId: string; comments: any[]; totalComments: number }>()
);

export const addCommentByContextId = createAction(
  '[COMMENTS] Add comment by context id',
  props<{ contextId: string; comment: any }>()
);

export const updateComment = createAction(
  '[COMMENTS] Update comment by context id',
  props<{ comment: any }>()
);

export const addReplyComment = createAction(
  '[COMMENTS] Add reply comment by context id',
  props<{ comment: any }>()
);

export const deleteComment = createAction(
  '[COMMENTS] Delete comment',
  props<{ comment: any }>()
);

export const CommentsAction = {
  addContextComments,
  addCommentByContextId,
  updateComment,
  addReplyComment,
  deleteComment,
};
