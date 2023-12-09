import { createReducer, on } from '@ngrx/store';

import ChatActions from './chat.action';

export interface ChatState {
  targetUserId: string;
  me: any;
  targetUser: any;
  messages: any[];
  chatId: string;
  isChatBoxVisible: boolean;
  isScrollToBottom: boolean;
}

export const initialState: ChatState = {
  targetUser: null,
  me: null,
  messages: [],
  isChatBoxVisible: false,
  targetUserId: '',
  chatId: '',
  isScrollToBottom: false,
};

export const chatReducer = createReducer(
  initialState,

  on(ChatActions.setChatBoxVisibility, (state, { isVisible }) => {
    return {
      ...state,
      isChatBoxVisible: isVisible,
    };
  }),

  on(ChatActions.setTargetUserId, (state, { userId }) => {
    return {
      ...state,
      targetUserId: userId,
    };
  }),

  on(ChatActions.setTargetUser, (state, { user }) => {
    return {
      ...state,
      targetUser: user,
    };
  }),

  on(ChatActions.setMe, (state, { me }) => {
    return {
      ...state,
      me,
    };
  }),

  on(ChatActions.addMessage, (state, { message }) => {
    if (message?.message?.owner === state.me?._id) {
      console.log(message?.message?.owner, state.me?._id);

      return {
        ...state,
        messages: [...state.messages, message],
        isScrollToBottom: true,
      };
    }
    return {
      ...state,
      messages: [...state.messages, message],
    };
  }),

  on(ChatActions.setMessages, (state, { messages }) => {
    return {
      ...state,
      messages,
    };
  }),

  on(ChatActions.setAllChatInfo, (state, { messages, targetUser, chatId }) => {
    return {
      ...state,
      targetUser,
      chatId,
      messages,
      isScrollToBottom: true,
    };
  }),

  on(ChatActions.setIsScrollToBottom, (state, { isScrollToBottom }) => {
    return {
      ...state,
      isScrollToBottom,
    };
  }),

  on(ChatActions.editMessage, (state, { message }) => {
    let newMessages = state.messages.map((item: any) => {
      if (item?.message?._id === message?._id) {
        return { ...item, message: message };
      }
      return item;
    });

    return {
      ...state,
      messages: newMessages,
    };
  }),

  on(ChatActions.deleteMessage, (state, { message }) => {
    return {
      ...state,
      messages: state.messages.filter((item: any) => {
        return item?.message?._id !== message?._id;
      }),
    };
  })
);
