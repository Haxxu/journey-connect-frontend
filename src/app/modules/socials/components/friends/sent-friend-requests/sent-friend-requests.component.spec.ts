import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentFriendRequestsComponent } from './sent-friend-requests.component';

describe('ReceivedFriendRequestsComponent', () => {
  let component: SentFriendRequestsComponent;
  let fixture: ComponentFixture<SentFriendRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SentFriendRequestsComponent],
    });
    fixture = TestBed.createComponent(SentFriendRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
