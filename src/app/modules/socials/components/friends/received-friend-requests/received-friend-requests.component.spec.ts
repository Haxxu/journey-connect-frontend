import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedFriendRequestsComponent } from './received-friend-requests.component';

describe('ReceivedFriendRequestsComponent', () => {
  let component: ReceivedFriendRequestsComponent;
  let fixture: ComponentFixture<ReceivedFriendRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReceivedFriendRequestsComponent]
    });
    fixture = TestBed.createComponent(ReceivedFriendRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
