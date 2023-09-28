import { createReducer, on } from '@ngrx/store';
import {
  setSentFriendRequests,
  setReceivedFriendRequests,
} from './friend.actions';

export interface FriendState {
  sentFriendRequests: any[];
  receivedFriendRequests: any[];
}

export const initialState: FriendState = {
  sentFriendRequests: [],
  receivedFriendRequests: [],
};

export const friendReducer = createReducer(
  initialState,

  on(setReceivedFriendRequests, (state, { friendRequests }) => {
    return { ...state, receivedFriendRequests: friendRequests };
  }),

  on(setSentFriendRequests, (state, { friendRequests }) => {
    return { ...state, sentFriendRequests: friendRequests };
  })
);
