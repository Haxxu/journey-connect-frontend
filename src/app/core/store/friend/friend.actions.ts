import { createAction, props } from '@ngrx/store';

export const setFriends = createAction(
  '[FRIEND] Set my friends',
  props<{ friends: any }>()
);

export const setSentFriendRequests = createAction(
  '[FRIEND] Set sent friend requests',
  props<{ friendRequests: any }>()
);

export const setReceivedFriendRequests = createAction(
  '[FRIEND] Set received friend requests',
  props<{ friendRequests: any }>()
);
