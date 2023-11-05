import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFriendListComponent } from './user-friend-list.component';

describe('UserFriendListComponent', () => {
  let component: UserFriendListComponent;
  let fixture: ComponentFixture<UserFriendListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserFriendListComponent]
    });
    fixture = TestBed.createComponent(UserFriendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
