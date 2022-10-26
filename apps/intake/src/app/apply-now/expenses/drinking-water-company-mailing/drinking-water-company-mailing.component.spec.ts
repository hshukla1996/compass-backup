import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkingWaterCompanyMailingComponent } from './drinking-water-company-mailing.component';

describe('DrinkingWaterCompanyMailingComponent', () => {
  let component: DrinkingWaterCompanyMailingComponent;
  let fixture: ComponentFixture<DrinkingWaterCompanyMailingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrinkingWaterCompanyMailingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkingWaterCompanyMailingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
