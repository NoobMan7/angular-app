import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListingComponent } from './client-listing.component';

describe('ClientListingComponent', () => {
  let component: ClientListingComponent;
  let fixture: ComponentFixture<ClientListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientListingComponent]
    });
    fixture = TestBed.createComponent(ClientListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
