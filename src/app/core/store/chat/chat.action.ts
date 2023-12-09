import { createAction, props } from '@ngrx/store';

export const setChatBoxVisibility = createAction(
  '[Chat] Set Chat Box Visibility',
  props<{ isVisible: boolean }>()
);

export const setTargetUserId = createAction(
  '[Chat] Set Target User Id',
  props<{ userId: string }>()
);

export const setTargetUser = createAction(
  '[Chat] Set Target User',
  props<{ user: any }>()
);

export const addMessage = createAction(
  '[Chat] Add Message',
  props<{ message: any }>()
);

export const setMessages = createAction(
  '[Chat] Set Messages',
  props<{ messages: any[] }>()
);
export const setIsScrollToBottom = createAction(
  '[Chat] Set I Scroll To Bottom',
  props<{ isScrollToBottom: boolean }>()
);

export const setMe = createAction('[Chat] Set Me', props<{ me: any }>());

export const setAllChatInfo = createAction(
  '[Chat] Set All Chat Info',
  props<{ messages: any[]; targetUser: any; chatId: string }>()
);

export const editMessage = createAction(
  '[Chat] Edit message',
  props<{ message: any }>()
);

export const deleteMessage = createAction(
  '[Chat] Delete message',
  props<{ message: any }>()
);

const ChatActions = {
  setChatBoxVisibility,
  setTargetUserId,
  addMessage,
  setMessages,
  setTargetUser,
  setAllChatInfo,
  setIsScrollToBottom,
  setMe,
  editMessage,
  deleteMessage,
};

export default ChatActions;
