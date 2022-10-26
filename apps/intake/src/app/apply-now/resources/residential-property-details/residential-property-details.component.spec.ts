import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialPropertyDetailsComponent } from './residential-property-details.component';

describe('ResidentialPropertyDetailsComponent', () => {
  let component: ResidentialPropertyDetailsComponent;
  let fixture: ComponentFixture<ResidentialPropertyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentialPropertyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentialPropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
