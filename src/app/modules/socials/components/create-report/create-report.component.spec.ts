import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReportComponent } from './create-report.component';

describe('CreateReportComponent', () => {
  let component: CreateReportComponent;
  let fixture: ComponentFixture<CreateReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateReportComponent]
    });
    fixture = TestBed.createComponent(CreateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
