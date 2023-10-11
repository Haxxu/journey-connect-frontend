import { createReducer, on } from '@ngrx/store';
import { setSocket, setSocketConnection } from './socket.actions';

export interface SocketState {
  connected: boolean;
  id: string;
}

export const initialState: SocketState = {
  connected: false,
  id: '',
};

export const socketReducer = createReducer(
  initialState,

  on(setSocketConnection, (state, { connected }) => {
    return { ...state, connected };
  }),

  on(setSocket, (state, { socket }) => {
    return { ...state, ...socket };
  })
);
