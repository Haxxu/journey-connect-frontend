import { createFeatureSelector } from '@ngrx/store';
import { FriendState } from './friend.reducer';

export const selectSentFriendRequests = (state: any) =>
  state.friend.sentFriendRequests;

export const selectReceivedFriendRequests = (state: any) =>
  state.friend.receivedFriendRequests;

export const selectMyFriends = (state: any) => state.friend.friends;
