import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPostListComponent } from './top-post-list.component';

describe('TopPostListComponent', () => {
  let component: TopPostListComponent;
  let fixture: ComponentFixture<TopPostListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TopPostListComponent]
    });
    fixture = TestBed.createComponent(TopPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
