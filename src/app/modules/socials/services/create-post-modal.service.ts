import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreatePostModalService {
  private showModalSubject = new BehaviorSubject<boolean>(false);
  private sharePostSubject = new BehaviorSubject<any>(null);

  constructor() {}

  get showModal$(): Observable<boolean> {
    return this.showModalSubject.asObservable();
  }

  get sharePost$(): Observable<any> {
    return this.sharePostSubject.asObservable();
  }

  openModal(sharePostData: boolean) {
    this.sharePostSubject.next(sharePostData);
    this.showModalSubject.next(true);
  }

  closeModal() {
    this.showModalSubject.next(false);
    this.sharePostSubject.next(null);
  }
}
