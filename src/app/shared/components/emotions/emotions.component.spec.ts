import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionsComponent } from './emotions.component';

describe('EmotionsComponent', () => {
  let component: EmotionsComponent;
  let fixture: ComponentFixture<EmotionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmotionsComponent]
    });
    fixture = TestBed.createComponent(EmotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
