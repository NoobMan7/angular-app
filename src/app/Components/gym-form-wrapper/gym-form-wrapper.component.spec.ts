import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymFormWrapperComponent } from './gym-form-wrapper.component';

describe('GymFormWrapperComponent', () => {
  let component: GymFormWrapperComponent;
  let fixture: ComponentFixture<GymFormWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GymFormWrapperComponent]
    });
    fixture = TestBed.createComponent(GymFormWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
