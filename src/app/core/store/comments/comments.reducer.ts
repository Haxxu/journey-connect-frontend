import { createReducer, on } from '@ngrx/store';
import {
  addCommentByContextId,
  addContextComments,
  addReplyComment,
  deleteComment,
  updateComment,
} from './comments.actions';

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
  }),

  on(addReplyComment, (state, { comment }) => {
    let contextId = comment?.context_id;
    if (state.comments[contextId]) {
      return {
        ...state,
        comments: {
          ...state.comments,
          [comment?.context_id]: {
            comments: state.comments[contextId].comments.map((cm) => {
              if (cm._id === comment.root_comment) {
                return {
                  ...cm,
                  reply_comments: [comment, ...cm.reply_comments],
                };
              }
              return cm;
            }),
            totalComments: state.comments[contextId].totalComments + 1,
          },
        },
      };
    }
    return state;
  }),

  on(updateComment, (state, { comment }) => {
    let contextId = comment?.context_id;
    if (state.comments[contextId]) {
      if (!comment.root_comment) {
        return {
          ...state,
          comments: {
            ...state.comments,
            [contextId]: {
              comments: state.comments[contextId].comments.map((cm) => {
                if (cm._id !== comment._id) {
                  return cm;
                } else {
                  return { ...cm, content: comment.content };
                }
              }),
              totalComments: state.comments[contextId].totalComments,
            },
          },
        };
      } else {
        return {
          ...state,
          comments: {
            ...state.comments,
            [contextId]: {
              comments: state.comments[contextId].comments.map((cm) => {
                if (cm._id !== comment.root_comment) return cm;
                else {
                  return {
                    ...cm,
                    reply_comments: cm.reply_comments.map((reply_cm: any) => {
                      if (reply_cm._id === comment._id) {
                        return comment;
                      }
                      return reply_cm;
                    }),
                  };
                }
              }),
              totalComments: state.comments[contextId].totalComments,
            },
          },
        };
      }
    }
    return state;
  }),

  on(deleteComment, (state, { comment }) => {
    let contextId = comment?.context_id;
    if (state.comments[contextId]) {
      if (!comment.root_comment) {
        return {
          ...state,
          comments: {
            ...state.comments,
            [contextId]: {
              comments: state.comments[contextId].comments.filter(
                (cm) => cm._id !== comment._id
              ),
              totalComments: state.comments[contextId].totalComments - 1,
            },
          },
        };
      }
      return {
        ...state,
        comments: {
          ...state.comments,
          [contextId]: {
            comments: state.comments[contextId].comments.map((cm) =>
              cm._id !== comment.root_comment
                ? cm
                : {
                    ...cm,
                    reply_comments: cm.reply_comments.filter(
                      (rp_cm: any) => rp_cm._id !== comment._id
                    ),
                  }
            ),
            totalComments: state.comments[contextId].totalComments - 1,
          },
        },
      };
    }
    return state;
  })
);
