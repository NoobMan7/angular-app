import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizechartComponent } from './sizechart.component';

describe('SizechartComponent', () => {
  let component: SizechartComponent;
  let fixture: ComponentFixture<SizechartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SizechartComponent]
    });
    fixture = TestBed.createComponent(SizechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
