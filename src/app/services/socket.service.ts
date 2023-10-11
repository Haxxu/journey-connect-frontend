import {
  setSocket,
  setSocketConnection,
} from '@/core/store/socket/socket.actions';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;
  connected$ = new BehaviorSubject<boolean>(false);

  constructor(private store: Store) {
    this.socket = io(environment.serverURL, {});
    this.socket.on('connect', () => {
      this.connected$.next(true);
      this.store.dispatch(setSocketConnection({ connected: true }));
    });
    this.socket.on('disconnect', () => {
      this.connected$.next(false);
      this.store.dispatch(setSocketConnection({ connected: true }));
    });
  }

  joinRoom(room: string) {
    this.connected$.subscribe((connected) => {
      if (connected) {
        this.socket.emit('joinRoom', room);
      }
    });
  }

  outRoom(room: string) {
    this.connected$.subscribe((connected) => {
      if (connected) {
        this.socket.emit('outRoom', room);
      }
    });
  }

  disconnect() {
    this.socket.disconnect();
    this.connected$.next(false);
  }

  emit(event: string, data?: any) {
    console.group();
    console.log('----- SOCKET OUTGOING -----');
    console.log('Action: ', event);
    console.log('Payload: ', data);
    console.groupEnd();

    this.socket.emit(event);
  }

  listen(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => {
        console.group();
        console.log('----- SOCKET INBOUND -----');
        console.log('Action: ', event);
        console.log('Payload: ', data);
        console.groupEnd();
        observer.next(data);
      });

      return () => this.socket.off(event);
    });
  }
}
