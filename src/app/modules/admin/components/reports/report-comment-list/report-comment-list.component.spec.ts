import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCommentListComponent } from './report-comment-list.component';

describe('ReportCommentListComponent', () => {
  let component: ReportCommentListComponent;
  let fixture: ComponentFixture<ReportCommentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReportCommentListComponent]
    });
    fixture = TestBed.createComponent(ReportCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
