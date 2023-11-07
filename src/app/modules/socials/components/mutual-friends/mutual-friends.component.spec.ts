import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualFriendsComponent } from './mutual-friends.component';

describe('MutualFriendsComponent', () => {
  let component: MutualFriendsComponent;
  let fixture: ComponentFixture<MutualFriendsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MutualFriendsComponent]
    });
    fixture = TestBed.createComponent(MutualFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
