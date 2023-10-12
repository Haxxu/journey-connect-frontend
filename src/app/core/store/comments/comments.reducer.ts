import { createReducer, on } from '@ngrx/store';
import { addCommentByContextId, addContextComments } from './comments.actions';

export interface CommentsState {
  comments: {
    [key: string]: {
      comments: any[];
      totalComments: number;
    };
  };
}

export const initialState: CommentsState = {
  comments: {},
};

export const commentReducer = createReducer(
  initialState,

  on(addContextComments, (state, { contextId, comments, totalComments }) => {
    return {
      ...state,
      comments: { ...state.comments, [contextId]: { comments, totalComments } },
    };
  }),

  on(addCommentByContextId, (state, { contextId, comment }) => {
    if (state.comments[contextId]) {
      return {
        ...state,
        comments: {
          ...state.comments,
          [contextId]: {
            comments: [comment, ...state.comments[contextId].comments],
            totalComments: state.comments[contextId].totalComments + 1,
          },
        },
      };
    }
    return state;
  })
);
