import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendPostsComponent } from './recommend-posts.component';

describe('RecommendPostsComponent', () => {
  let component: RecommendPostsComponent;
  let fixture: ComponentFixture<RecommendPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RecommendPostsComponent]
    });
    fixture = TestBed.createComponent(RecommendPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
