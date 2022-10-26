import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholContactInfoComponent } from './househol-contact-info.component';

describe('HouseholContactInfoComponent', () => {
  let component: HouseholContactInfoComponent;
  let fixture: ComponentFixture<HouseholContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholContactInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
