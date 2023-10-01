import { createReducer, on } from '@ngrx/store';
import {
  setSentFriendRequests,
  setReceivedFriendRequests,
  setFriends,
} from './friend.actions';

export interface FriendState {
  friends: any[];
  sentFriendRequests: any[];
  receivedFriendRequests: any[];
}

export const initialState: FriendState = {
  friends: [],
  sentFriendRequests: [],
  receivedFriendRequests: [],
};

export const friendReducer = createReducer(
  initialState,

  on(setFriends, (state, { friends }) => {
    return { ...state, friends: friends };
  }),

  on(setReceivedFriendRequests, (state, { friendRequests }) => {
    return { ...state, receivedFriendRequests: friendRequests };
  }),

  on(setSentFriendRequests, (state, { friendRequests }) => {
    return { ...state, sentFriendRequests: friendRequests };
  })
);
