import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsNotReceviedDetailsComponent } from './benefits-not-received-details.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: BenefitsNotReceviedDetailsComponent;
  let fixture: ComponentFixture<BenefitsNotReceviedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitsNotReceviedDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsNotReceviedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
