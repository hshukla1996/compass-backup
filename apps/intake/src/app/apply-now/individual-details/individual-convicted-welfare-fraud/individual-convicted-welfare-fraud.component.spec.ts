import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualConvictedWelfareFraudComponent } from './individual-convicted-welfare-fraud.component';

describe('IndividualConvictedWelfareFraudComponent', () => {
  let component: IndividualConvictedWelfareFraudComponent;
  let fixture: ComponentFixture<IndividualConvictedWelfareFraudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualConvictedWelfareFraudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualConvictedWelfareFraudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
