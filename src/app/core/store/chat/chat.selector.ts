import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectTargetUserId = (state: any) => state.chat.targetUserId;

export const selectIsChatBoxVisible = (state: any) =>
  state.chat.isChatBoxVisible;

export const selectTargetUser = (state: any) => state.chat.targetUser;

export const selectMessages = (state: any) => state.chat.messages;

export const selectIsScrollToBottom = (state: any) =>
  state.chat.isScrollToBottom;

export const ChatSelectors = {
  selectTargetUserId,
  selectIsChatBoxVisible,
  selectTargetUser,
  selectMessages,
  selectIsScrollToBottom,
};
