import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSharePostComponent } from './create-share-post.component';

describe('CreateSharePostComponent', () => {
  let component: CreateSharePostComponent;
  let fixture: ComponentFixture<CreateSharePostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateSharePostComponent]
    });
    fixture = TestBed.createComponent(CreateSharePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
